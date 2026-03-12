import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RegionList from './pages/RegionList';
import PlaceList from './pages/PlaceList';
import PlaceDetail from './pages/PlaceDetail';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth Guard Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Global Layout
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-forest-mist selection:bg-forest-green/10 selection:text-forest-green">
    <Header />
    <main className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Main Routes wrapper */}
          <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
          <Route path="/states" element={<ProtectedRoute><Layout><RegionList /></Layout></ProtectedRoute>} />
          <Route path="/uts" element={<ProtectedRoute><Layout><RegionList /></Layout></ProtectedRoute>} />
          <Route path="/region/:regionId" element={<ProtectedRoute><Layout><PlaceList /></Layout></ProtectedRoute>} />
          <Route path="/place/:placeId" element={<ProtectedRoute><Layout><PlaceDetail /></Layout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
