import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import WasteOptions from './pages/WasteOptions';
import Suggestions from './pages/Suggestions';
import Tutorials from './pages/Tutorials';
import Profile from './pages/Profile';
import CommunityRatings from './components/dashboard/CommunityRatings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/waste-options"
              element={
                <ProtectedRoute>
                  <WasteOptions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suggestions"
              element={
                <ProtectedRoute>
                  <Suggestions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tutorials"
              element={
                <ProtectedRoute>
                  <Tutorials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/community" element={<CommunityRatings />} />
            
            {/* Default redirect to About page */}
            <Route path="/" element={<Navigate to="/about" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;