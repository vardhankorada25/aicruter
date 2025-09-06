import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { MdAccessTime } from 'react-icons/md';

const InterviewComplete = () => {
  // Enhanced CSS-based abstract illustration
  const AbstractIllustration = () => (
    <div className="flex items-center justify-center relative w-full h-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-blue-100 animate-pulse"></div>
      <div className="absolute top-12 right-0 w-24 h-24 rounded-full bg-green-100 animate-pulse"></div>
      <div className="absolute w-40 h-2 bg-gray-300 rounded-full"></div>
      <div className="absolute top-1/2 -mt-1 w-24 h-2 bg-gray-400 rounded-full animate-pulse-fast"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-blue-500 animate-pulse-fast-delay"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-green-500 animate-pulse-fast-delay-2"></div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">
        <div className="flex flex-col items-center mb-8">
          <FaCheckCircle className="text-green-500 text-7xl mb-4 transform scale-105" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-wide">
            Interview Complete!
          </h1>
          <p className="text-gray-600 max-w-sm">
            Thank you for participating in the AI-driven interview with **AIcruiter**.
          </p>
        </div>

        {/* Enhanced visual element */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <AbstractIllustration />
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white rounded-full p-4 shadow-lg transform hover:scale-105 transition-transform">
            <FiSend className="text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          What's Next?
        </h2>
        <p className="text-gray-600 mb-4 px-4">
          The recruiter will review your interview responses and contact you soon regarding the next steps.
        </p>

        <div className="flex items-center justify-center text-gray-500 text-sm">
          <MdAccessTime className="mr-2 text-lg" />
          <span className="font-medium">Response within **2-3 business days**</span>
        </div>
      </div>
    </div>
  );
};

export default InterviewComplete;