import React, { useState } from 'react';
import { login } from '../../api/auth';
import { useAlert } from '../../contexts/AlertContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { showAlert } = useAlert(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email: userID, password };
      const response = await login(userData);
      console.log('Login response:', response);

      if(response.status === "success"){
        showAlert('Login successful!', 'success'); // Show success alert
        console.log('Logged in successfully:', response);
        localStorage.setItem("userID", response.data.userID);
        navigate('/');
        window.location.reload();
      }
      
    } catch (error) {
      showAlert('Login failed. Please check your credentials and try again.', 'error'); // Show error alert
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-mono text-gray-100 mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="userID" className="block text-gray-400 font-mono mb-2">
              User ID (Email)
            </label>
            <input
              type="email"
              id="userID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 font-mono mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 text-gray-400 hover:text-gray-200 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-gray-100 py-2 rounded-lg hover:bg-blue-700 transition-colors font-mono"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
