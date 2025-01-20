// src/components/Connections/UserCard.jsx
import React from 'react';

const UserCard = ({ user, onClick, showConnectButton, onConnect }) => {
  return (
    <div
      className="flex items-center justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img
          src={user.profilePic}
          alt={`${user.username}'s profile`}
          className="w-10 h-10 rounded-full"
        />
        <p className="text-gray-100 font-mono">{user.username}</p>
      </div>
      {showConnectButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onConnect(user.id);
          }}
          className="px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-700 text-white"
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default UserCard;
