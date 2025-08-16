import React, { useState } from 'react';
import { MessageCircle, Send, ThumbsUp } from 'lucide-react';

const FORM_ENDPOINT = "https://formspree.io/f/xqaljrqe"; // Replace with your Formspree link

function FeedbackPopup() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const submitFeedback = async () => {
    if (!feedback.trim()) return;
    try {
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: feedback }),
      });
      setFeedbackSent(true);
      setFeedback("");
      setShowFeedback(false);
      setTimeout(() => setFeedbackSent(false), 3000);
    } catch (err) {
      console.error("Failed to send feedback", err);
    }
  };

  return (
    <div className="fixed bottom-6 left-1 z-50">
      {/* Feedback popup */}
      {showFeedback && (
        <div className="mb-4 ml-2 bg-white p-4 rounded-2xl shadow-xl border max-w-xs transform transition-all">
          <p>Suggest Improvements</p>
          <br />
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Apni rai likho bhai..."
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            rows={3}
          />
          <div className="flex gap-2">
            <button 
              onClick={submitFeedback}
              className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:from-green-500 hover:to-green-600 transition flex items-center gap-1"
            >
              <Send size={12} /> Send
            </button>
            <button 
              onClick={() => setShowFeedback(false)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button 
        onClick={() => setShowFeedback(!showFeedback)}
        className={`w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 rounded-full shadow-xl flex items-center justify-center transition transform hover:scale-110 ${feedbackSent ? 'animate-bounce' : ''}`}
      >
        {feedbackSent ? (
          <ThumbsUp size={24} className="text-white animate-pulse" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>
    </div>
  );
}

export default FeedbackPopup;
