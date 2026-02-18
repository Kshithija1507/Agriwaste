import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, MessageCircle, Lightbulb, LogOut, Mail, Calendar, Award } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock data - in a real app, this would come from API/state management
  const profileStats = {
    suggestionsSubmitted: 8,
    reviewsSubmitted: 12,
    joinDate: 'March 2024',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your account and view your sustainability contributions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mr-6">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {user?.email}
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {profileStats.joinDate}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Username</span>
                    <span className="font-medium text-gray-900">{user?.username}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Email Address</span>
                    <span className="font-medium text-gray-900">{user?.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Account Type</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Community Member
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-600" />
                Activity Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Suggestions Submitted</p>
                      <p className="text-2xl font-bold text-blue-900">{profileStats.suggestionsSubmitted}</p>
                    </div>
                    <Lightbulb className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Reviews Submitted</p>
                      <p className="text-2xl font-bold text-purple-900">{profileStats.reviewsSubmitted}</p>
                    </div>
                    <MessageCircle className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Score */}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/community')}
                  className="w-full flex items-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  Submit Review
                </button>
                <button
                  onClick={() => navigate('/suggestions')}
                  className="w-full flex items-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Lightbulb className="h-5 w-5 mr-3" />
                  Find Suggestions
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;