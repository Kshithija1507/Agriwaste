import React, { useState } from 'react';
import { Search, Lightbulb, Recycle } from 'lucide-react';

interface Suggestion {
  id: string;
  waste: string;
  products: string[];
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  impact: string;
}

const SuggestionTool: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const wasteSuggestions: Suggestion[] = [
    {
      id: '1',
      waste: 'banana stem',
      products: ['Paper', 'Handicrafts', 'Textiles', 'Rope'],
      description: 'Banana stems are rich in fiber and can be processed into various eco-friendly products.',
      difficulty: 'Medium',
      impact: 'High - Reduces 2.5kg CO2 per kg processed'
    },
    {
      id: '2',
      waste: 'rice husk',
      products: ['Biofuel', 'Building Materials', 'Compost', 'Packaging'],
      description: 'Rice husks are excellent for creating sustainable building materials and renewable energy.',
      difficulty: 'Easy',
      impact: 'High - Prevents 1.8kg CO2 emissions per kg'
    },
    {
      id: '3',
      waste: 'coconut coir',
      products: ['Mattresses', 'Potting Soil', 'Brushes', 'Erosion Control'],
      description: 'Coconut coir is naturally water-resistant and perfect for various household and industrial applications.',
      difficulty: 'Easy',
      impact: 'Medium - Saves 1.2kg CO2 per kg processed'
    },
    {
      id: '4',
      waste: 'wheat straw',
      products: ['Paper', 'Packaging', 'Biofuel', 'Animal Feed'],
      description: 'Wheat straw can replace wood pulp in paper production and serves as excellent animal feed.',
      difficulty: 'Medium',
      impact: 'High - Reduces 2.1kg CO2 per kg processed'
    },
    {
      id: '5',
      waste: 'corn stalks',
      products: ['Bioplastic', 'Fuel Pellets', 'Mulch', 'Crafts'],
      description: 'Corn stalks contain cellulose that can be converted into biodegradable plastics and fuel.',
      difficulty: 'Hard',
      impact: 'Very High - Prevents 3.2kg CO2 per kg'
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);

    try {
      // API call to backend
      const response = await fetch('http://localhost:5000/api/suggestions/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wasteType: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();

      if (data.suggestions) {
        setSuggestions(data.suggestions);
      } else {
        // Fallback or empty state if weird format
        setSuggestions([]);
      }

    } catch (error) {
      console.error("Error fetching suggestions:", error);
      // Fallback: Filter local wasteSuggestions if API fails (optional, but good UX)
      const filteredSuggestions = wasteSuggestions.filter(suggestion =>
        suggestion.waste.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggestion.products.some(product =>
          product.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSuggestions(filteredSuggestions);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Lightbulb className="h-6 w-6 mr-2 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Agri-Waste Suggestion Tool</h2>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Enter agri-waste type (e.g., banana stem, rice husk, coconut coir)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Default Suggestions */}
      {suggestions.length === 0 && !loading && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Popular Waste Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {wasteSuggestions.slice(0, 6).map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => {
                  setSearchTerm(suggestion.waste);
                  setSuggestions([suggestion]);
                }}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="font-medium text-gray-900 capitalize">{suggestion.waste}</div>
                <div className="text-sm text-gray-600">{suggestion.products.slice(0, 2).join(', ')}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Suggestions for "{searchTerm}"
          </h3>

          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-gray-900 capitalize">
                  {suggestion.waste}
                </h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(suggestion.difficulty)}`}>
                  {suggestion.difficulty}
                </span>
              </div>

              <p className="text-gray-600 mb-3">{suggestion.description}</p>

              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <Recycle className="h-4 w-4 mr-2 text-green-600" />
                  <span className="font-medium text-gray-700">Possible Products:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestion.products.map((product) => (
                    <span
                      key={product}
                      className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-blue-700 font-medium">Environmental Impact: </span>
                </div>
                <span className="text-sm text-blue-600">{suggestion.impact}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">Searching for suggestions...</span>
        </div>
      )}
    </div>
  );
};

export default SuggestionTool;