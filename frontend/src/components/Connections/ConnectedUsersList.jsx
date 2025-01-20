// src/components/Connections/ConnectedUsersList.jsx
import React from 'react';
import UserCard from './UserCard';
import { useChatContext } from '../../contexts/ChatContext';

const ConnectedUsersList = () => {
  const { connectedUsers, handleOpenChat } = useChatContext();

  return (
    <div className="flex flex-col space-y-4">
      {connectedUsers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => handleOpenChat(user.id)}
        />
      ))}
    </div>
  );
};

export default ConnectedUsersList;
