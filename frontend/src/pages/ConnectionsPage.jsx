// // src/pages/ConnectionsPage.jsx
// import React, { useState } from 'react';
// import { useChatContext } from '../contexts/ChatContext';
// import { useUser } from '../contexts/UserContext';
// import { useNavigate } from 'react-router-dom';

// const ConnectionsPage = () => {
//   const { connectedUsers, handleJoinChat } = useChatContext();
//   const { allUsers } = useUser();
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   // Filter connected users based on search term
//   const filteredUsers = (allUsers || []).filter((user) =>
//     user.userName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // const handleUserClick = (userID) => {
//   //   navigate(`/chat/${userID}`);
//   // };

//   const handleUserClick = (userID) => {
//     const currentUserID = localStorage.getItem('userID'); // Your logged-in user's ID
//     // handleJoinChat(currentUserID, userID); // Join WebSocket room
//     navigate(`/chat/${userID}`);
//   };


//   return (
//     <div className="flex flex-col h-screen bg-gray-900">
//       <div className="p-4 bg-gray-800 border-b border-gray-700">
//         <h2 className="text-xl text-gray-100 font-mono">Connections</h2>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4 bg-gray-800 border-b border-gray-700">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search users..."
//           className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono w-full"
//         />
//       </div>

//       {/* User List */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user) => (
//             <div
//             onClick={() => handleUserClick(user.userID)}
//               key={user.userID}
//               className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               <img
//                 src={user.profilePic || 'https://via.placeholder.com/40'}
//                 alt={user.userName}
//                 className="w-10 h-10 rounded-full mr-4"
//               />
//               <span className="text-gray-100 font-mono">{user.userName}</span>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-100">No users found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConnectionsPage;



// src/pages/ConnectionsPage.jsx
import React, { useState } from 'react';
import { useChatContext } from '../contexts/ChatContext';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Settings, LogOut } from 'lucide-react';
import { logout } from '../api/auth';
import { useAlert } from '../contexts/AlertContext';

const ConnectionsPage = () => {
  const { unreadCounts } = useChatContext();
  const { allUsers } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showAlert } = useAlert(); 
  const navigate = useNavigate();

  // Filter users based on search term
  const filteredUsers = (allUsers || [])
    .filter((user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (unreadCounts[b.userID] || 0) - (unreadCounts[a.userID] || 0)); // Sort by unread message count

  const handleUserClick = (userID) => {
    navigate(`/chat/${userID}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      showAlert("Logout successful", "success");
    } catch (error) {
      showAlert("Error Logging out, try later", "error");
    }

    localStorage.removeItem('userID');
    navigate('/login');
  };

  const handleSettings = () => {
    // Navigate to settings page
    // navigate('/settings');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl text-gray-100 font-mono">Connections</h2>
        
        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <MoreVertical className="w-6 h-6 text-gray-100" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
              {/* <button
                onClick={handleSettings}
                className="flex items-center w-full px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </button> */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono w-full"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              onClick={() => handleUserClick(user.userID)}
              key={user.userID}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <img
                    src={user.profilePic || '/user.png'}
                    alt={user.userName}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <span className="text-gray-100 font-mono">{user.userName}</span>
                    <span className="block text-gray-400 text-sm font-mono">{`ID: ${user.userID}`}</span>
                  </div>
                </div>
              </div>

              {/* Unread Messages Badge */}
              {unreadCounts[user.userID] > 0 && (
                <div className="bg-blue-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                  {unreadCounts[user.userID]}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-100">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;
