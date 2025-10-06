import React from "react";

const TestingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-5">
      <div className="bg-white rounded-2xl p-12 shadow-2xl text-center max-w-md">
        <div className="text-6xl mb-6">📅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Book an Appointment
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Click the button below to schedule your appointment with Document
          Management Tasmania.
        </p>
        <a
          href="https://outlook.office.com/book/DocumentManagementTasmaniaContactUs@dmtas.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default TestingPage;
