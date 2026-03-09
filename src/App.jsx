import React from "react";
import AIReviewAnalyzer from "./components/AIReviewAnalyzer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header (Навігаційна панель) */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-pink-600 tracking-tight">
          Booksy<span className="text-gray-800">Assistant</span>
        </h1>
        <div className="text-sm font-medium text-gray-500">
          AI-Native Software Engineer
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-6">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Review Intelligence Hub</h2>
          <p className="text-gray-600">
            Empowering beauty entrepreneurs with AI-driven insights.
          </p>
        </header>

        <AIReviewAnalyzer />

        {/* Додаткова секція для портфоліо */}
        <section className="mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-2">How it works</h3>
          <p className="text-gray-600 text-sm">
            This tool uses an agentic workflow to categorize feedback and
            suggest operational improvements in real-time. Built for efficiency,
            scale, and clarity.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
