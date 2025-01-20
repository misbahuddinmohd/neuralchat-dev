import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const handleSuccess = (response) => {
    console.log('Google Login Success:', response);
    // Send the token to your backend for validation and user creation
  };

  const handleError = () => {
    console.error('Google Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-mono text-gray-100 mb-6 text-center">Login</h1>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              text="signin_with"
              shape="pill"
            />
          </div>
          <p className="text-gray-400 text-sm text-center mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
