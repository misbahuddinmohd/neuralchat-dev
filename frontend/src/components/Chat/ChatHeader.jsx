// src/components/Chat/ChatHeader.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
  const { allUsers } = useUser(); // Fetch connected users from context
  const { userID } = useParams(); // Get userID from the URL
  const navigate = useNavigate();

  // Find the current user details from connectedUsers
  const user = allUsers?.find((user) => user.userID === userID);

  return (
    <div className="sticky top-0 z-30 p-4 bg-gray-800 border-b border-gray-700 flex items-center space-x-4">
      {user ? (
        <>
        <button
        className='text-gray-100'
        onClick={() => {
          navigate('/');
        }}
        >
           <ArrowLeft size={28} />
        </button>
          <img
            src={user.profilePic || '/user.png'}
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-lg md:text-xl font-mono text-gray-100">{user.userName}</h1>
        </>
      ) : (
        <h1 className="text-lg md:text-xl font-mono text-gray-100">Loading...</h1>
      )}
    </div>
  );
};

export default ChatHeader;
