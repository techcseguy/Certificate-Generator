import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Generating certificate designs...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
    </div>
  );
};

export default LoadingSpinner;
