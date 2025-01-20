// src/contexts/AlertContext.js

// src/contexts/AlertContext.js

import React, { createContext, useContext, useState, useRef } from 'react';

// Create the context and custom hook
const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
  const timeoutRef = useRef(null);

  const validTypes = ['error', 'success', 'info', 'warning'];

  const showAlert = (message, type = 'error', duration = 3000) => {
    // Validate the alert type
    if (!validTypes.includes(type)) {
      console.error(`Invalid alert type: ${type}. Defaulting to 'error'.`);
      type = 'error';
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set alert state
    setAlert({ visible: true, message, type });

    // Set a new timeout with the specified or default duration
    timeoutRef.current = setTimeout(() => {
      setAlert({ visible: false, message: '', type: '' });
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      
      {/* Global Alert */}
      {alert.visible && (
        <div
          role="alert"
          aria-live="assertive"
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 md:p-6 max-w-xs sm:max-w-sm w-full sm:w-auto rounded shadow-lg text-white ${
            alert.type === 'error'
              ? 'bg-red-500'
              : alert.type === 'success'
              ? 'bg-green-600'
              : alert.type === 'info'
              ? 'bg-blue-600'
              : 'bg-yellow-500'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{alert.message}</span>
            <button
              className="ml-4 text-white hover:text-gray-200"
              onClick={() => showAlert('', '', 0)} // Clear the alert
              aria-label="Close alert"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
