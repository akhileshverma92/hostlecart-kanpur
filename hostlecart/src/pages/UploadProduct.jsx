import React, { useState, useEffect } from 'react';
import { Client, Databases, Storage, Account, ID } from 'appwrite';
import { Upload, Package, DollarSign, Phone, MapPin, User, Tag, CheckSquare, Image, Clock } from 'lucide-react';

// Initialize Appwrite
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);

// Constants
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BUCKET_ID = "6856b1b200278223aed4";

const UploadProduct = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    condition: '',
    contactNumber: '',
    sellerName: '',
    address: '',
    price: '',
    negotiable: false,
    images: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const categories = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 
    'Automotive', 'Toys', 'Health & Beauty', 'Furniture', 'Other'
  ];
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  // Fetch logged-in user from Appwrite
  useEffect(() => {
    account.get()
      .then(user => {
        setCurrentUser(user);
        setFormData(prev => ({
          ...prev,
          sellerName: user.name || user.email
        }));
      })
      .catch(() => setCurrentUser(null))
      .finally(() => setIsUserLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadingImages(true);
    const newImageUrls = [];
    const newPreviewUrls = [];

    try {
      for (const file of files) {
        const previewUrl = URL.createObjectURL(file);
        newPreviewUrls.push(previewUrl);

        const response = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          file
        );

        const fileUrl = storage.getFileView(BUCKET_ID, response.$id);
        newImageUrls.push(fileUrl.toString());
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImageUrls]
      }));

      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
      
    } catch (error) {
      console.error('Error uploading images:', error);
      setSubmitMessage('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const required = ['productName', 'category', 'condition', 'contactNumber', 'sellerName', 'address', 'price'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      setSubmitMessage(`Please fill in required fields: ${missing.join(', ')}`);
      return false;
    }

    if (isNaN(formData.contactNumber) || formData.contactNumber.length < 10) {
      setSubmitMessage('Please enter a valid contact number (at least 10 digits)');
      return false;
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setSubmitMessage('Please enter a valid price');
      return false;
    }

    if (!currentUser) {
      setSubmitMessage('You must be logged in to upload products');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          productName: formData.productName,
          category: formData.category,
          condition: formData.condition,
          contactNumber: formData.contactNumber,
          sellerName: formData.sellerName,
          address: formData.address,
          price: parseFloat(formData.price),
          negotiable: formData.negotiable,
          images: formData.images,
          createdAt: new Date().toISOString(),
          userId: currentUser.$id,
          userEmail: currentUser.email,
          status: 'pending'
        }
      );

      setSubmitMessage('Product uploaded successfully! It will be visible after admin approval.');
      
      setFormData({
        productName: '',
        category: '',
        condition: '',
        contactNumber: '',
        sellerName: currentUser.name || currentUser.email,
        address: '',
        price: '',
        negotiable: false,
        images: []
      });
      setPreviewUrls([]);
      
    } catch (error) {
      console.error('Error uploading product:', error);
      setSubmitMessage('Error uploading product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while checking user session
  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If not logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please log in to upload products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Product</h1>
            <p className="text-gray-600">Add your product to the marketplace</p>
            <p className="text-sm text-indigo-600 mt-2">
              Welcome, {currentUser.name || currentUser.email}
            </p>
          </div>

          {/* Approval Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Admin Approval Required</h3>
                <p className="text-xs text-blue-600 mt-1">
                  Your product will be reviewed by our team before it appears on the marketplace. This helps us maintain quality and prevent fraudulent listings.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 mr-2" />
                Product Name *
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category and Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Package className="w-4 h-4 mr-2" />
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select condition</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seller Name and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Seller Name *
                </label>
                <input
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Your contact number"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Your full address"
                required
              />
            </div>

            {/* Price and Negotiable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={formData.negotiable}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Price negotiable</span>
                </label>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Image className="w-4 h-4 mr-2" />
                Product Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImages}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
              />
              
              {uploadingImages && (
                <div className="mt-2 flex items-center text-sm text-indigo-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
                  Uploading images...
                </div>
              )}
              
              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div className={`p-4 rounded-lg text-center font-medium ${
                submitMessage.includes('success') 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || uploadingImages}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading Product...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
