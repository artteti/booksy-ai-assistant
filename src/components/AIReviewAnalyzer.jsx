import React, { useState } from "react";

const AIReviewAnalyzer = () => {
  const [review, setReview] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeWithAI = async () => {
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
            inputs: `Analyze this customer review: "${review}"`,
          }),
        },
      );

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      setAnalysis(data[0].generated_text);
    } catch (err) {
      // Fallback mechanism: providing a graceful degradation if AI service is unreachable
      console.warn("AI service unavailable, activating fallback logic...");
      setAnalysis(
        `[AI Fallback]: Thank you for your feedback! We appreciate your input and our team is already working on improving your experience.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Booksy AI Assistant</h2>
      <textarea
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter customer review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        onClick={analyzeWithAI}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Analyze Review"}
      </button>

      {analysis && (
        <div className="mt-4 p-4 bg-gray-50 border rounded text-sm text-gray-700">
          <strong>Result:</strong> {analysis}
        </div>
      )}
    </div>
  );
};

export default AIReviewAnalyzer;
