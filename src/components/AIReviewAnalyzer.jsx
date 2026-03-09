import React, { useState } from "react";

const AIReviewAnalyzer = () => {
  const [review, setReview] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);

  // Expanded fallback logic with more professional vocabulary
  const getLocalFallback = (text) => {
    const lower = text.toLowerCase();

    const positiveWords = [
      "good",
      "great",
      "excellent",
      "love",
      "perfect",
      "happy",
      "amazing",
      "wonderful",
      "satisfied",
      "best",
      "professional",
      "highly recommend",
      "friendly",
      "fantastic",
      "lovely",
    ];

    const negativeWords = [
      "bad",
      "terrible",
      "worst",
      "slow",
      "rude",
      "hate",
      "poor",
      "disappointed",
      "unprofessional",
      "expensive",
      "wait",
      "mess",
      "awful",
      "unhappy",
      "waste",
    ];

    if (positiveWords.some((word) => lower.includes(word))) {
      return {
        sentiment: "positive",
        advice:
          "The client is very happy! Send a personalized thank-you note or offer a loyalty reward to ensure they return.",
      };
    }
    if (negativeWords.some((word) => lower.includes(word))) {
      return {
        sentiment: "negative",
        advice:
          "The client is dissatisfied. Apologize sincerely, investigate the issue, and offer a complimentary service to regain their trust.",
      };
    }
    return {
      sentiment: "neutral",
      advice:
        "The feedback is neutral. Reach out to ask if there is anything specific you can do to enhance their experience next time.",
    };
  };

  const analyzeWithAI = async () => {
    if (!review.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `Analyze this beauty salon customer review: "${review}".
            1. Determine sentiment: Positive, Negative, or Neutral.
            2. Advice: Provide one specific, professional action for the salon owner.
            Reply ONLY in this format:
            Sentiment: [Positive/Negative/Neutral]
            Advice: [Actionable advice]`,
          }),
        },
      );

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      const rawText = data[0].generated_text;

      const sentimentMatch = rawText.match(
        /Sentiment:\s*(Positive|Negative|Neutral)/i,
      );
      const adviceMatch =
        rawText.split(/Advice:/i)[1] || "Thank you for your valuable feedback!";

      setSentiment(
        sentimentMatch ? sentimentMatch[1].toLowerCase() : "neutral",
      );
      setAnalysis(adviceMatch.trim());
    } catch (err) {
      console.warn("AI service unreachable, using local fallback...");
      const fallback = getLocalFallback(review);
      setSentiment(fallback.sentiment);
      setAnalysis(fallback.advice);
    } finally {
      setLoading(false);
    }
  };

  const getBoxStyle = () => {
    switch (sentiment) {
      case "positive":
        return "bg-green-50 border-green-200 text-green-800";
      case "negative":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        Booksy AI Assistant
      </h2>
      <textarea
        className="w-full border border-gray-200 p-3 rounded-lg mb-4 h-24 focus:ring-2 focus:ring-black outline-none transition-all"
        placeholder="Enter customer review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        onClick={analyzeWithAI}
        disabled={loading}
        className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 font-semibold"
      >
        {loading ? "Analyzing..." : "Analyze Review"}
      </button>

      {analysis && (
        <div className={`mt-4 p-4 border rounded-lg ${getBoxStyle()}`}>
          <p className="text-xs uppercase font-bold mb-1 opacity-70 tracking-wider">
            {sentiment}
          </p>
          <p className="text-sm font-medium leading-relaxed">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default AIReviewAnalyzer;
