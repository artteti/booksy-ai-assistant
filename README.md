# Booksy AI Assistant

A streamlined, AI-native toolkit designed for business owners to analyze customer feedback instantly. This project demonstrates a robust approach to integrating Large Language Models (LLMs) into real-world applications with a focus on system resilience and developer experience.

## Key Features

- **Intelligent Analysis:** Powered by Llama-3.2 (via Hugging Face API) to extract sentiment and actionable insights from customer reviews.
- **Resilient Design:** Implemented a **graceful fallback mechanism** that ensures the application remains functional even if the AI service encounters connectivity issues.
- **Secure Environment:** Designed with clear separation of concerns, protecting sensitive API credentials through environment variables.
- **AI-Native Mindset:** Focused on "builder mentality" by reimagining how business feedback can be handled in a fast-paced environment.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **AI Model:** Llama-3.2-3B-Instruct (Hugging Face)
- **Architecture:** Client-side orchestration with API fallback logic

## ⚙️ Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Hugging Face API token.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/artteti/booksy-ai-assistant.git](https://github.com/artteti/booksy-ai-assistant.git)
    cd booksy-ai-assistant
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory and add your token:

    ```text
    VITE_HF_TOKEN=your_hugging_face_token_here
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

## Architectural Approach

The project utilizes an "AI-first" approach. Recognizing that external APIs can be unstable, the application wraps external calls in a `try-catch` block. If the AI service fails to respond, the system automatically triggers a fallback response, ensuring an uninterrupted user experience—a critical design choice for scaling business tools.

## Learnings

- Building resilient AI workflows with graceful degradation.
- Managing asynchronous API states in React.
- Implementing secure configuration management in frontend applications.

---

_Developed for the Early Careers Programme at Booksy._
