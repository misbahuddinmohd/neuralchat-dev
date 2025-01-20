// import React from 'react';
// import ChatHeader from '../components/Chat/ChatHeader';
// import ChatMessages from '../components/Chat/ChatMessages';
// import ChatInput from '../components/Chat/ChatInput';
// import DrawingCanvas from '../components/Canvas/DrawingCanvas';

// const ChatPage = () => {
//   return (
//     <div className="flex flex-col h-screen bg-gray-900 max-w-screen-sm mx-auto">
//       <ChatHeader />
//       <ChatMessages />
//       <ChatInput />
//       <DrawingCanvas />
//     </div>
//   );
// };

// export default ChatPage;


// src/pages/ChatPage.jsx
import React from 'react';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessages from '../components/Chat/ChatMessages';
import ChatInput from '../components/Chat/ChatInput';
import DrawingCanvas from '../components/Canvas/DrawingCanvas';

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 mx-auto">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
      <DrawingCanvas />
    </div>
  );
};

export default ChatPage;
