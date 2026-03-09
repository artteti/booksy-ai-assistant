import React, { useState } from "react";

const AIReviewAnalyzer = () => {
  const [review, setReview] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeReview = async () => {
    setLoading(true);

    setTimeout(() => {
      const lowerReview = review.toLowerCase();
      let action = "No urgent action needed";
      let sentiment = "Neutral";

      if (lowerReview.includes("wait") || lowerReview.includes("slow")) {
        sentiment = "Negative (Time management)";
        action = "Create 15% discount coupon for next visit";
      } else if (
        lowerReview.includes("broken") ||
        lowerReview.includes("app")
      ) {
        sentiment = "Technical Issue";
        action = "Alert Technical Support Team";
      } else if (
        lowerReview.includes("love") ||
        lowerReview.includes("great")
      ) {
        sentiment = "Positive";
        action = "Request permission to share on Instagram";
      }

      setAnalysis({
        sentiment,
        suggestedReply: `Based on the ${sentiment} tone, I recommend this action.`,
        actionItem: action,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">Booksy AI Assistant</h2>
      <textarea
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
        placeholder="Paste a customer review here..."
        rows="4"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        onClick={analyzeReview}
        disabled={!review || loading}
        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
      >
        {loading ? "AI is thinking..." : "Analyze with AI Agent"}
      </button>

      {analysis && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-pink-500">
          <p>
            <strong>Sentiment:</strong> {analysis.sentiment}
          </p>
          <p className="mt-2">
            <strong>Drafted Reply:</strong> {analysis.suggestedReply}
          </p>
          <p className="mt-2 text-sm text-blue-600 font-mono">
            <strong>Agent Action:</strong> {analysis.actionItem}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIReviewAnalyzer;
