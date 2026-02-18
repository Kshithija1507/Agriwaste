import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Recycle, 
  Users, 
  Lightbulb, 
  Play, 
  TrendingUp, 
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  Globe,
  Heart,
  Target
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Waste Marketplace',
      description: 'Buy, sell, or barter agricultural waste with community members',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Lightbulb,
      title: 'Smart Suggestions',
      description: 'Get AI-powered suggestions for transforming your waste into valuable products',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Play,
      title: 'DIY Tutorials',
      description: 'Learn step-by-step how to create amazing products from agricultural waste',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Impact Tracker',
      description: 'Monitor your environmental impact and track sustainability achievements',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Share ideas, rate experiences, and connect with fellow eco-warriors',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Sign Up',
      description: 'Create your free account to join our sustainable community'
    },
    {
      number: '2',
      title: 'Explore Waste Options',
      description: 'Browse the marketplace to buy, sell, or trade agricultural waste'
    },
    {
      number: '3',
      title: 'Get Suggestions',
      description: 'Input your waste type and discover innovative reuse possibilities'
    },
    {
      number: '4',
      title: 'Learn & Create',
      description: 'Follow tutorials to transform waste into valuable products'
    },
    {
      number: '5',
      title: 'Track Impact',
      description: 'Monitor your environmental contribution and celebrate achievements'
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Environmental Impact',
      description: 'Reduce landfill waste and lower carbon emissions through innovative reuse'
    },
    {
      icon: Heart,
      title: 'Community Building',
      description: 'Connect with like-minded individuals passionate about sustainability'
    },
    {
      icon: Target,
      title: 'Economic Value',
      description: 'Turn waste into profit while supporting circular economy principles'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-full">
                <Leaf className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Agri Waste Optimizer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Transform agricultural waste into valuable products while building a sustainable future for our planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What is Agri Waste Optimizer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌿 What is Agri Waste Optimizer?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform that connects farmers, entrepreneurs, and eco-enthusiasts to transform agricultural waste into valuable, sustainable products through community collaboration and innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Use It */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💡 How to Use It?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to start your sustainable journey and make a positive environmental impact
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-green-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full font-bold text-lg mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why It's Useful */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌎 Why It's Useful?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the movement towards sustainable farming and eco-friendly practices that benefit both the environment and your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">2.5M+</div>
                <div className="text-gray-600">Tons of Waste Diverted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">15K+</div>
                <div className="text-gray-600">Active Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">DIY Tutorials Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
                <div className="text-gray-600">Waste Reduction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📋 Platform Instructions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed guide on how to make the most of each section in our platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Marketplace Instructions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <ShoppingCart className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Waste Marketplace</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Browse available waste materials by category
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Post your own waste for sale or barter
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Connect with local farmers and businesses
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Use filters to find exactly what you need
                </li>
              </ul>
            </div>

            {/* Suggestions Instructions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Smart Suggestions</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Enter your waste type in the search box
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Get personalized product recommendations
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  View difficulty levels and environmental impact
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Save suggestions for future reference
                </li>
              </ul>
            </div>

            {/* Tutorials Instructions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Play className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">DIY Tutorials</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Watch video tutorials for visual learning
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Follow step-by-step text guides
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Check materials list before starting
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Rate tutorials and share your results
                </li>
              </ul>
            </div>

            {/* Community Instructions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-pink-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Community Hub</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Share your own waste reuse ideas
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Rate and review platform features
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Like and comment on others' suggestions
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Build connections with eco-enthusiasts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers and eco-enthusiasts who are already transforming waste into wealth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/tutorials"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Explore Tutorials
              <Play className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;