import React, { useState } from 'react';
import { MessageCircle, Send, ThumbsUp, Mail, User, Star, Heart } from 'lucide-react';

const FORM_ENDPOINT = "https://formspree.io/f/xqaljrqe"; // Replace with your Formspree link

const Footer = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Kanpuriya phrases for different interactions
  const kanpuriyaPhrases = [
    "Bhai, feedback de do na! 🙏",
    "Are yaar, kaisa laga humara work? 🤔", 
    "Bolo bhai, kya kami hai? 💭",
    "Aapki opinion chahiye bhaiya! ⭐",
    "Improvement ke liye batao yaar! 🚀"
  ];

  const successMessages = [
    "Wah bhai! Thanks feedback ke liye! 🎉",
    "Dhanyawad yaar! Aapki baat sun li! 👂",
    "Bahut badhiya! Hum improve karenge! 💪",
    "Ji haan bhai! Aapka suggestion mil gaya! ✨"
  ];

  const getRandomPhrase = (phrases) => {
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) {
      alert("Bhai, kuch to likho! 😅");
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      alert("Bhaiya, email phir se check krna! 📧");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = {
        name: name || "Anonymous bhai",
        email: email,
        message: feedback,
        rating: rating,
        timestamp: new Date().toLocaleString('hi-IN', {timeZone: 'Asia/Kolkata'}),
        source: "Kanpur Wale Website Feedback"
      };

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setFeedbackSent(true);
      setFeedback("");
      setEmail("");
      setName("");
      setRating(0);
      setShowFeedback(false);
      
      // Show success message for longer duration
      setTimeout(() => setFeedbackSent(false), 5000);
    } catch (err) {
      console.error("Failed to send feedback", err);
      alert("Are yaar, kuch gadbad hai! Phir try karo. 😔");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starNumber) => {
    setRating(starNumber);
  };

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="flex flex-col items-center space-y-4">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold">
                Hostel<span className="text-yellow-300">Cart</span> Kanpur
              </h3>
              <span className="text-2xl animate-bounce">🛒</span>
            </div>

            {/* Contact Email */}
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300">
              <Mail size={20} className="text-yellow-300" />
              <a 
                href="mailto:hostelcartkanpur@cc.cc" 
                className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
              >
               hostelcartkanpur@cc.cc
              </a>
            </div>

            {/* Divider */}
            <div className="w-24 h-0.5 bg-white/30 rounded-full"></div>

            {/* Copyright */}
            <div className="text-sm text-white/80 flex items-center space-x-3">
              <span>© 2025 HostelCart Kanpur. Made with 💌 <span>for hostelers Mitro</span></span>
             
            </div>

            {/* Fun tagline */}
            <p className="text-xs text-white/70 italic">
              "Jugaad se shuru, dosti tak pahuche!" 🤝
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Feedback Button */}
      <div className="fixed bottom-6 left-4 z-50">
        {/* Success Message */}
        {feedbackSent && (
          <div className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-2xl shadow-2xl border-2 border-white max-w-sm animate-bounce">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-red-200 animate-pulse" size={20} />
              <span className="font-bold text-lg">{getRandomPhrase(successMessages)}</span>
            </div>
            <p className="text-sm text-green-100">
              Hum jaldi hi aapse contact karenge! 📞✨
            </p>
          </div>
        )}

        {/* Feedback popup with enhanced design */}
        {showFeedback && (
          <div className="mb-4 ml-2 bg-white p-6 rounded-3xl shadow-2xl border-2 border-orange-200 max-w-sm transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {getRandomPhrase(kanpuriyaPhrases)}
              </h3>
              <p className="text-sm text-gray-600">Aapki opinion humare liye precious hai! 💎</p>
            </div>

            {/* Star Rating */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Kaisa laga? Rating do:</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className="transition-transform duration-200 hover:scale-110"
                  >
                    <Star
                      size={24}
                      className={`${
                        star <= rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      } transition-colors duration-200`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name Field */}
            <div className="mb-3">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="mr-2 text-blue-500" />
                Aapka naam (Optional):
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ram Kumar"
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="mr-2 text-red-500" />
                Email Address *:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ram@example.com"
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Contact karne ke liye chahiye! 📧</p>
            </div>

            {/* Feedback Textarea */}
            <div className="mb-4">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MessageCircle size={16} className="mr-2 text-green-500" />
                Apni opinion likho *:
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Bhai, website kaisi lagi? Koi improvement chahiye? Sab batao yahan... 🤗"
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 resize-none"
                rows={4}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={submitFeedback}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Bhej rahe...
                  </>
                ) : (
                  <>
                    <Send size={16} /> 
                    Bhej do! 🚀
                  </>
                )}
              </button>
              <button 
                onClick={() => setShowFeedback(false)}
                className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200"
              >
                Band karo
              </button>
            </div>

            {/* Footer note */}
            <p className="text-xs text-center text-gray-500 mt-3 leading-relaxed">
              Aapka feedback humare liye bahut important hai bhai! 🙏<br/>
            </p>
          </div>
        )}

        {/* Enhanced Floating button */}
        <div className="relative group">
          <button 
            onClick={() => setShowFeedback(!showFeedback)}
            className={`relative w-16 h-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              feedbackSent ? 'animate-bounce' : ''
            }`}
          >
            {/* Pulse effect */}
        
            
            {/* Icon */}
            <div className="relative z-10">
              {feedbackSent ? (
                <ThumbsUp size={28} className="text-white animate-pulse" />
              ) : (
                <MessageCircle size={28} className="text-white group-hover:rotate-12 transition-transform duration-300" />
              )}
            </div>

            {/* Notification dot */}
            {!feedbackSent && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold animate-pulse">!</span>
              </div>
            )}
          </button>

          {/* Hover tooltip */}
          <div className="absolute bottom-20 left-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Opinion do bhai! 💬
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
