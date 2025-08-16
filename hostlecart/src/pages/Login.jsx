import React, { useState, useEffect } from 'react';
import { Loader2, Shield, Mail, Key } from 'lucide-react';
import { ID } from "appwrite";
import { account } from "../services/Appwriteconfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  const [step, setStep] = useState(1); // 1 = send email, 2 = verify token
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [currentQuote, setCurrentQuote] = useState(0);

  const desiQuotes = [
    "Hostel life mein shopping ka naya tareeka! 🏠",
    "Dosto ke saath trade karo, masti karo! 👥",
    "Kanpur se duniya tak ka marketplace! 🚀",
    "Ek trade mein naye dost banao! ✨",
    "Students ka apna business platform! 🎯"
  ];

  // Rotate quotes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % desiQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sendOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Bhai, sahi email address daalo!");
      setLoading(false);
      return;
    }

    try {
      const response = await account.createEmailToken(ID.unique(), email);
      setUserId(response.userId);
      setStep(2);
      setMessage("Arre wah! OTP aa raha hai, inbox check karo bhai 🚀");
    } catch (err) {
      setError("OTP bhejne mein problem hai yaar! Dubara try karo.");
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    
    if (!secret) {
      setError("OTP toh daalo pehle!");
      setLoading(false);
      return;
    }

    try {
      await account.createSession(userId, secret);
      setMessage("Sahi pakde ho! Login successful, thodi der ruk jao...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setError("Galat OTP hai bhai! Dubara try karo.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-pulse opacity-20">🏠</div>
        <div className="absolute top-40 right-16 text-4xl animate-bounce opacity-20">🎯</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-spin opacity-20">⭐</div>
        <div className="absolute bottom-20 right-32 text-4xl animate-pulse opacity-20">🚀</div>
        <div className="absolute top-60 left-1/3 text-3xl animate-bounce opacity-20">✨</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to HostleCart!
          </h1>
          <div className="h-6 flex items-center justify-center">
            <p className="text-gray-600 animate-fade-in-out">
              {desiQuotes[currentQuote]}
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              {step === 1 ? (
                <Mail className="w-6 h-6" />
              ) : (
                <Key className="w-6 h-6" />
              )}
              <h2 className="text-2xl font-bold">
                {step === 1 ? "Sign In with Email" : "Verify OTP"}
              </h2>
            </div>
            <p className="text-center text-indigo-100">
              {step === 1 
                ? "Kanpur se seedha duniya tak! 🚀" 
                : "Email check karo aur OTP daalo, bhai!"
              }
            </p>
          </div>

          <div className="p-8">
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Success message */}
            {message && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <span className="text-green-700 text-sm">{message}</span>
              </div>
            )}

            {/* Step 1: Email Input */}
            {step === 1 && (
              <>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  Apna email daalo, OTP udta aa jayega! ✉️
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  onClick={sendOtp}
                  disabled={loading || !email}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span>Bhej rahe hain...</span>
                    </>
                  ) : (
                    <span className="text-lg">Send OTP</span>
                  )}
                </button>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  OTP enter karo jo email mein aaya hai! 🔑
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP from email"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-green-500 transition-colors"
                  maxLength={6}
                />
                <button
                  onClick={verifyOtp}
                  disabled={loading || !secret}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span>Verify ho raha hai...</span>
                    </>
                  ) : (
                    <span className="text-lg">Verify & Login</span>
                  )}
                </button>
                
                {/* Back to email step */}
                <button
                  onClick={() => {
                    setStep(1);
                    setSecret("");
                    setError("");
                    setMessage("");
                  }}
                  className="w-full mt-3 text-indigo-600 hover:text-indigo-800 font-medium py-2 transition-colors"
                >
                  ← Wapas email step pe jao
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Aage badhke aap hamare{" "}
            <a href="#" className="text-indigo-600 underline hover:text-indigo-800">
              Terms of Service
            </a>{" "}
            aur{" "}
            <a href="#" className="text-indigo-600 underline hover:text-indigo-800">
              Privacy Policy
            </a>{" "}
            ko maan rahe ho
          </p>
        </div>
      </div>

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

export default Login;