import React, { useState, useEffect } from 'react';
import { Home, RefreshCw, Search, Coffee, Gamepad2, Music, Volume2, VolumeX } from 'lucide-react';

const NotFound = () => {
  const [currentJoke, setCurrentJoke] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showRocket, setShowRocket] = useState(false);

  const jokes = [
    "404: Page not found... but my sense of humor is still here! 😄",
    "This page is playing hide and seek... and winning! 🙈",
    "Error 404: Page went to get milk and never came back 🥛",
    "404: This page is in another castle 🏰",
    "Page not found! It's probably stuck in an infinite loop somewhere 🔄",
    "404: Even Google doesn't know where this page went 🤷‍♂️",
    "This page has left the building... Elvis style! 🕺",
    "404: Page is taking a coffee break ☕"
  ];

  const excuses = [
    "The hamsters powering our servers got tired 🐹",
    "A ninja stole this page in the night 🥷",
    "The page went on vacation to Bermuda 🏖️",
    "It's not a bug, it's a feature! ...Just kidding, it's totally a bug 🐛",
    "The intern accidentally deleted it (sorry intern!) 😅",
    "This page was abducted by aliens 👽",
    "It's hiding behind the couch with your lost socks 🧦"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoke((prev) => (prev + 1) % jokes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
    
    if (soundEnabled) {
      // Play a whoosh sound effect (simulated)
      console.log("🎵 Whoooosh!");
    }
  };

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 4) {
      setShowEasterEgg(true);
      setShowRocket(true);
      setTimeout(() => setShowRocket(false), 3000);
      setClickCount(0);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Emojis */}
        <div className="animate-bounce absolute top-20 left-10 text-4xl">🚀</div>
        <div className="animate-pulse absolute top-40 right-20 text-3xl">⭐</div>
        <div className="animate-bounce absolute bottom-40 left-20 text-2xl delay-1000">🎈</div>
        <div className="animate-pulse absolute bottom-20 right-40 text-3xl delay-500">💫</div>
        <div className="animate-bounce absolute top-60 left-1/3 text-2xl delay-700">🎯</div>
        <div className="animate-pulse absolute top-80 right-1/4 text-4xl delay-300">🎪</div>
        
        {/* Rocket Easter Egg */}
        {showRocket && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce text-6xl transition-all duration-3000">
            🚀✨
          </div>
        )}
      </div>

      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
      >
        {soundEnabled ? (
          <Volume2 size={20} className="text-white" />
        ) : (
          <VolumeX size={20} className="text-white" />
        )}
      </button>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main 404 Display */}
          <div className="mb-8 relative">
            <div 
              className={`text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4 cursor-pointer select-none ${isSpinning ? 'animate-spin' : 'hover:scale-110'} transition-transform duration-500`}
              onClick={handleLogoClick}
            >
              404
            </div>
            
            {/* Glitch Effect Overlay */}
            <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500 opacity-20 animate-pulse">
              404
            </div>
            
            <div className="text-2xl md:text-3xl font-bold text-white mb-2">
              Oops! Page Not Found
            </div>
            
            {/* Rotating Jokes */}
            <div className="h-16 flex items-center justify-center">
              <p className="text-lg md:text-xl text-gray-300 animate-fade-in-out">
                {jokes[currentJoke]}
              </p>
            </div>
          </div>

          {/* Fun Illustration */}
          <div className="mb-8">
            <div className="text-6xl md:text-8xl mb-4 animate-bounce">
              🤷‍♂️
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Possible Explanations:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {excuses.map((excuse, index) => (
                  <div key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-2xl">•</span>
                    <span>{excuse}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center">
              <Home size={24} />
              Take Me Home
            </button>
            
           
           
          </div>

          {/* Fun Mini Games Section */}
          

          {/* Easter Egg Message */}
          

          {/* Footer Message */}
        
        </div>
      </div>

      {/* CSS Animation for fade effect */}
      <style jsx>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.7; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;