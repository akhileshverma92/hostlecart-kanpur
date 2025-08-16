import React, { useState, useEffect } from "react";
import { Mail, Calendar, CheckCircle, LogOut, RefreshCw } from "lucide-react";
import { account } from "../services/Appwriteconfig"; // <-- import from your Appwrite client

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAvatarSpinning, setIsAvatarSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [hasChosenAvatar, setHasChosenAvatar] = useState(false);

  const funQuotes = [
    "Mess ki biryani se zyada spicy profile! 🌶️",
    "Assignment pending, maggie ready 🍜",
    "Jugaad is my middle name 😎",
    "Hostel ka Elon Musk — bas budget thoda tight hai 💸",
    "Masti bhi, dosti bhi, aur thoda sa dhandha bhi 😁",
    "Notes becho, Maggie lo — HostelCart Zindabad! 📚",
    "Room 101 se business chal raha hai 🧠",
    "Bunk maar ke trading kar raha hu 😂"
  ];

  // 10 Random Avatar Options
  const avatarOptions = [
    {
      emoji: "🦁",
      name: "Lion King",
      bg: "from-yellow-400 to-orange-500"
    },
    {
      emoji: "🐼",
      name: "Panda Master",
      bg: "from-gray-300 to-gray-600"
    },
    {
      emoji: "🦊",
      name: "Clever Fox",
      bg: "from-orange-400 to-red-500"
    },
    {
      emoji: "🐸",
      name: "Frog Prince",
      bg: "from-green-400 to-green-600"
    },
    {
      emoji: "🦄",
      name: "Unicorn Magic",
      bg: "from-pink-400 to-purple-600"
    },
    {
      emoji: "🐯",
      name: "Tiger Boss",
      bg: "from-orange-500 to-yellow-600"
    },
    {
      emoji: "🦝",
      name: "Raccoon Ninja",
      bg: "from-gray-400 to-gray-700"
    },
    {
      emoji: "🐨",
      name: "Koala Chill",
      bg: "from-blue-300 to-blue-500"
    },
    {
      emoji: "🦉",
      name: "Wise Owl",
      bg: "from-indigo-400 to-purple-500"
    },
    {
      emoji: "🐺",
      name: "Wolf Leader",
      bg: "from-slate-400 to-slate-600"
    }
  ];

  useEffect(() => {
    // Rotate quotes every 4s
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % funQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch logged-in user
    account.get()
      .then(res => {
        setUser(res);
        // Check if user has already chosen an avatar (stored in localStorage)
        const storedAvatar = localStorage.getItem(`avatar_${res.$id}`);
        if (storedAvatar !== null) {
          setCurrentAvatarIndex(parseInt(storedAvatar));
          setHasChosenAvatar(true);
        } else {
          // Generate random avatar based on user ID for first time
          const userHash = res.$id.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
          }, 0);
          setCurrentAvatarIndex(Math.abs(userHash) % avatarOptions.length);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = () => {
    account.createOAuth2Session("google", "http://localhost:5173", "https://hostlecartkanpur.vercel.app");
    // Replace redirect URLs with your production site URLs
  };

  const handleLogout = async () => {
    await account.deleteSession("current");
    window.location.reload();
  };

  const handleAvatarClick = () => {
    setIsAvatarSpinning(true);
    setClickCount(prev => prev + 1);

    if (clickCount >= 4) {
      setShowConfetti(true);
      setShowEasterEgg(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowEasterEgg(false);
      }, 3000);
      setClickCount(0);
    }

    setTimeout(() => setIsAvatarSpinning(false), 1000);
  };

  const selectAvatar = (index) => {
    if (!hasChosenAvatar && user) {
      setCurrentAvatarIndex(index);
      setHasChosenAvatar(true);
      // Save the choice permanently
      localStorage.setItem(`avatar_${user.$id}`, index.toString());
      
      // Add a little celebration
      setIsAvatarSpinning(true);
      setTimeout(() => setIsAvatarSpinning(false), 1000);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Ruko zara... profile garma garam ban raha hai 😋</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
              👤
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Login to see your profile</h1>
            <p className="text-gray-600 mb-6">HostleCart mein apna kingdom banao! 👑</p>
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all font-semibold"
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentAvatar = avatarOptions[currentAvatarIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl animate-pulse opacity-20">👑</div>
        <div className="absolute top-40 right-16 text-3xl animate-bounce opacity-20">⭐</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-spin opacity-20">🎯</div>
        <div className="absolute bottom-20 right-32 text-3xl animate-pulse opacity-20">🚀</div>
        <div className="absolute top-60 left-1/3 text-2xl animate-bounce opacity-20">✨</div>
      </div>

      <header className="px-4 py-6 relative z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Your Profile <span className="text-2xl ml-2">👤</span>
            </h1>
            <p className="text-gray-600 mt-1">Manage your HostelCart presence</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-100 hover:bg-red-200 p-3 rounded-xl border border-red-200 transition-all hover:shadow-md"
          >
            <LogOut size={20} className="text-red-600" />
          </button>
        </div>
      </header>

      <div className="px-4 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar Section */}
              <div className="text-center">
                <div className="relative">
                  <div
                    className={`w-32 h-32 bg-gradient-to-r ${currentAvatar.bg} rounded-full flex items-center justify-center text-6xl cursor-pointer ${isAvatarSpinning ? 'animate-spin' : 'hover:scale-105'} transition-transform shadow-xl border-4 border-white`}
                    onClick={handleAvatarClick}
                  >
                    {currentAvatar.emoji}
                  </div>
                  
                  {/* Change Avatar Button */}
                  <button
                   
                    className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all hover:shadow-xl"
                    title="Change Avatar"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-600">{currentAvatar.name}</p>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
                  <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                  <span className="text-2xl">👋</span>
                  <CheckCircle size={24} className="text-green-500" />
                </div>

                <p className="text-lg text-gray-600 animate-fade-in-out italic mb-6">{funQuotes[currentQuote]}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                    <Mail size={20} className="text-blue-500" />
                    <div className="text-left">
                      <div className="font-medium">{user.email}</div>
                      <div className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle size={12} /> Verified hai boss!
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-3">
                    <Calendar size={20} className="text-green-500" />
                    <div className="text-left">
                      <div className="font-medium">Joined</div>
                      <div className="text-sm text-gray-600">{formatDate(user.registration)}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">#{user.$id.slice(-6).toUpperCase()}</div>
                    <div className="text-sm text-gray-600">Unique Trader ID</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Gallery - Only show if user hasn't chosen yet */}
          {!hasChosenAvatar && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                Choose Your Avatar Forever! 🎭
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                ⚠️ Dhyan se choose karo! Ek baar select karne ke baad change nahi ho sakta!
              </p>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {avatarOptions.map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => selectAvatar(index)}
                    className={`w-16 h-16 bg-gradient-to-r ${avatar.bg} rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 hover:shadow-lg ${
                      index === currentAvatarIndex 
                        ? 'ring-4 ring-indigo-500 shadow-lg scale-110' 
                        : ''
                    }`}
                    title={avatar.name}
                  >
                    {avatar.emoji}
                  </button>
                ))}
              </div>
              <p className="text-xs text-red-500 text-center mt-3">
                💡 Tip: Click on any avatar to make it yours permanently!
              </p>
            </div>
          )}

          {/* Show message after avatar is chosen */}
          {hasChosenAvatar && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-6 shadow-xl border border-green-200 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Avatar Locked In! 
                </h3>
                <p className="text-gray-600">
                  Tumhara <span className="font-semibold text-indigo-600">{currentAvatar.name}</span> avatar permanent set ho gaya hai!
                  <br />
                  <span className="text-sm text-gray-500">Ab yahi tumhari identity hai HostleCart mein! 🚀</span>
                </p>
              </div>
            </div>
          )}

          {showEasterEgg && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-6 rounded-2xl text-lg text-center font-bold shadow-xl animate-bounce">
              🎉 Awesome! You found the secret! You're officially the coolest trader in the hostel! 🎉
            </div>
          )}
        </div>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${Math.random() * 20 + 10}px`
                }}
              >
                🎉
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.7; transform: translateY(5px); }
          50% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Profile;