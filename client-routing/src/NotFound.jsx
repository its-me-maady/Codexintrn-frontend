import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-16">
      <h2 className="text-3xl font-bold mb-4 text-red-700">404 - Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
