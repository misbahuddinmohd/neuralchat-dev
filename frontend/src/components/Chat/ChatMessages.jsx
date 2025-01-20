// import React, { useRef, useEffect } from 'react';

// const ChatMessages = ({ messages }) => {
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
//       {messages.map((message, index) => (
//         <div
//           key={index}
//           className={`flex ${
//             message.sender === 'user' ? 'justify-end' : 'justify-start'
//           }`}
//         >
//           <div
//             className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
//               message.sender === 'user'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-700 text-gray-100'
//             }`}
//           >
//             {message.type === 'text' ? (
//               <p className="font-mono">{message.content}</p>
//             ) : (
//               <img
//                 src={message.content}
//                 alt="User drawing"
//                 className="rounded"
//               />
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatMessages;




// src/components/Chat/ChatMessages.jsx
import React, { useEffect, useRef, useState } from 'react';
import MessageItem from './MessageItem';
import { useParams } from 'react-router-dom';
import { useChatContext } from '../../contexts/ChatContext';
import { getMessages } from '../../api/messages';

const ChatMessages = () => {
  const { messages, handleReceiveMessages } = useChatContext();
  const { userID } = useParams();
  const messagesEndRef = useRef(null);
  const [loadingImages, setLoadingImages] = useState(new Set());

  // Track loading images
  const handleImageLoadStart = (messageId) => {
    setLoadingImages(prev => new Set([...prev, messageId]));
  };

  const handleImageLoadEnd = (messageId) => {
    setLoadingImages(prev => {
      const newSet = new Set([...prev]);
      newSet.delete(messageId);
      return newSet;
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const userMessages = await handleReceiveMessages(userID);
    };
    fetchMessages();
  }, [userID]);

  // Enhanced scroll effect that considers image loading
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // If there are no loading images, scroll immediately
    if (loadingImages.size === 0) {
      scrollToBottom();
    }
  }, [messages, loadingImages]);

  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3 md:space-y-4">
      {messages?.map((message) => (
        <MessageItem 
          key={message.id} 
          message={message}
          onImageLoadStart={() => handleImageLoadStart(message.id)}
          onImageLoadEnd={() => handleImageLoadEnd(message.id)}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;