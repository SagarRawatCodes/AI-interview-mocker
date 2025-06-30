import React from 'react';

const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">How It Works</h1>
      <ol className="space-y-8">
        <li>
          <h2 className="text-2xl font-semibold">1. Sign Up / Log In</h2>
          <p className="text-gray-700 mt-2">
            Create an account or log in to access the AI Interview Mocker platform.
          </p>
        </li>
        <li>
          <h2 className="text-2xl font-semibold">2. Create a New Interview</h2>
          <p className="text-gray-700 mt-2">
            Provide details such as the job position, required tech stack, years of experience, and the company name.
          </p>
        </li>
        <li>
          <h2 className="text-2xl font-semibold">3. Answer AI-Generated Questions</h2>
          <p className="text-gray-700 mt-2">
            The AI will generate 5 interview questions based on your input. Enable your camera and record your answers.
          </p>
        </li>
        <li>
          <h2 className="text-2xl font-semibold">4. Submit Your Responses</h2>
          <p className="text-gray-700 mt-2">
            After answering all questions, submit your responses for evaluation.
          </p>
        </li>
        <li>
          <h2 className="text-2xl font-semibold">5. Receive Feedback</h2>
          <p className="text-gray-700 mt-2">
            Get detailed feedback comparing your answers to the ideal responses, along with an overall rating out of 10.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default HowItWorks;
