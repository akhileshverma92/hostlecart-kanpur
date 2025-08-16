import React, { useState, useEffect } from 'react';
import { Client, Databases, Storage, Query } from 'appwrite';
import { 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  DollarSign, 
  Package, 
  Heart,
  Eye,
  MessageCircle,
  Star,
  Calendar,
  Shield,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  AlertCircle,
  List,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Initialize Appwrite
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

// Constants
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BUCKET_ID = "6856b1b200278223aed4";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const productsPerPage = 12;

  const categories = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 
    'Automotive', 'Toys', 'Health & Beauty', 'Furniture', 'Other'
  ];

  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  // Fetch approved products only from Appwrite
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Only fetch approved products for public listing
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [
            Query.equal('status', 'approved'),
            Query.orderDesc('$createdAt'),
            Query.limit(100) // Adjust as needed
          ]
        );
        
        setProducts(response.documents);
        setFilteredProducts(response.documents);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please check your configuration.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and gfdsgfsearch products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Condition filter
    if (selectedCondition) {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.productName.localeCompare(b.productName);
        case 'newest':
        default:
          return new Date(b.createdAt || b.$createdAt) - new Date(a.createdAt || a.$createdAt);
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, selectedCondition, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleWhatsAppClick = (product) => {
    const message = `Hi👋! I'm interested in your product: ${product.productName} - ₹${product.price}, that listed on HostleCart Kanpur application. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/91${product.contactNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Package size={48} className="text-gray-400" />
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(product.$id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            size={18}
            className={favorites.has(product.$id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            product.condition === 'New' ? 'bg-green-100 text-green-800' :
            product.condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
            product.condition === 'Good' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {product.condition}
          </span>
        </div>

        {/* Negotiable Badge */}
        {product.negotiable && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
              Negotiable
            </span>
          </div>
        )}

        {/* Verified Badge for Approved Products */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-green-100 text-green-800 p-1 rounded-full" title="Verified Product">
            <CheckCircle size={16} />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.productName}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap ml-2">
            {product.category}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-2xl font-bold text-indigo-600">
            <span>₹{product.price?.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{product.sellerName}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-2" />
            <span className="truncate">{product.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-2" />
            <span>Listed {formatDate(product.createdAt || product.$createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProduct(product)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            View Details
          </button>
          <button
            onClick={() => handleWhatsAppClick(product)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );

  // Product Detail Modal
  const ProductModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">{product.productName}</h2>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckCircle size={12} />
              Verified
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              {product.images && product.images.length > 0 ? (
                <div className="space-y-4">
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop';
                    }}
                  />
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-2">
                      {product.images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.productName} ${index + 2}`}
                          className="w-full h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop';
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Package size={64} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-indigo-600 flex items-center">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </div>
                  {product.negotiable && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      Negotiable
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Condition</span>
                    <p className="font-medium">{product.condition}</p>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span>{product.sellerName}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone size={16} className="mr-2 text-gray-500" />
                    <span>{product.contactNumber}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span>{product.address}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>Listed {formatDate(product.createdAt || product.$createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => handleWhatsAppClick(product)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Contact via WhatsApp
                </button>
                <button
                  onClick={() => window.location.href = `tel:${product.contactNumber}`}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Call Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
          
          {/* Environment Variables Note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm">Required Environment Variables:</h3>
            <div className="text-xs text-blue-800 space-y-1">
              <p>• VITE_APPWRITE_ENDPOINT</p>
              <p>• VITE_APPWRITE_PROJECT_ID</p>
              <p>• VITE_APPWRITE_DATABASE_ID</p>
              <p>• VITE_APPWRITE_COLLECTION_ID</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HostleCart Marketplace</h1>
              <p className="text-gray-600 mt-1">Discover verified products from our community</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <Shield size={16} />
                All Verified Products
              </div>
              <span className="text-sm text-gray-500">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, sellers, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Conditions</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4 flex gap-4 items-center">
            <span className="text-sm font-medium text-gray-700">Price Range:</span>
            <input
              type="number"
              placeholder="Min ₹"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max ₹"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.$id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later for new products</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ListProducts;