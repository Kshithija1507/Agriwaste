import React from 'react';
import DIYTutorials from '../components/dashboard/DIYTutorials';

const Tutorials: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">DIY Tutorials</h1>
          <p className="text-gray-600 mt-2">
            Learn step-by-step how to create amazing products from agricultural waste
          </p>
        </div>
        
        <DIYTutorials />
      </div>
    </div>
  );
};

export default Tutorials;