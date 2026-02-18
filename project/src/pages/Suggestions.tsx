import React from 'react';
import SuggestionTool from '../components/dashboard/SuggestionTool';

const Suggestions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Waste Suggestions</h1>
          <p className="text-gray-600 mt-2">
            Discover innovative ways to transform your agricultural waste into valuable products
          </p>
        </div>
        
        <SuggestionTool />
      </div>
    </div>
  );
};

export default Suggestions;