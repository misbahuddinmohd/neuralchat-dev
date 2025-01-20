// src/components/Connections/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for users..."
        className="flex-1 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
