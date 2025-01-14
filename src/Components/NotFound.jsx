// NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">Page Not Found</p>
        <p className="text-sm text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
