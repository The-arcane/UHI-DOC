import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import { Menu, Settings } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import About from './components/About';
import DoctorDashboard from './components/DoctorDashboard';
import SignIn from './components/SignIn';
import AdminDashboard from './components/admin/AdminDashboard';
import VideoCall from './components/VideoCall';
import CartIcon from './components/shared/CartIcon';
import EmergencyButton from './components/shared/EmergencyButton';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return user ? children : <Navigate to="/signin" />;
  };

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    return user?.role === 'admin' ? children : <Navigate to="/" />;
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <ToastContainer position="top-right" autoClose={3000} />
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              UHI Doctor Portal
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu />
            </button>
            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <ul className="md:flex space-y-2 md:space-y-0 md:space-x-6">
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    About
                  </Link>
                </li>
                {user && (
                  <>
                    <li>
                      <Link
                        to="/doctor-dashboard"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Doctor Dashboard
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://uhi-docbot.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Automatic Transcription
                      </a>
                    </li>
                  </>
                )}
                {user ? (
                  <li className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>{user.name}</span>
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/signin"
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/doctor-dashboard"
              element={
                <PrivateRoute>
                  <DoctorDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/videocall/:id"
              element={
                <PrivateRoute>
                  <VideoCall />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 UHI Doctor Portal. All rights reserved.</p>
          </div>
        </footer>

        {user && (
          <>
            <CartIcon />
            <EmergencyButton />
          </>
        )}
      </div>
    </CartProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;
