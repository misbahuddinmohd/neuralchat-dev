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
import { formatMessageDate } from '../../utils/dateUtils';

const ChatMessages = () => {
  const { messages, handleReceiveMessages, updateReadMessagesCount } = useChatContext();
  const { userID } = useParams();
  const messagesEndRef = useRef(null);
  const [loadingImages, setLoadingImages] = useState(new Set());

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
      updateReadMessagesCount(userID);
    }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const userMessages = await handleReceiveMessages(userID);
    };
    fetchMessages();
  }, [userID]);

  useEffect(() => {
    if (loadingImages.size === 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loadingImages]);

  // Group messages by date
  const groupedMessages = messages?.reduce((groups, message) => {
    const date = formatMessageDate(message.sentAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-4">
      <div className="space-y-4 relative">
        {groupedMessages && Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="relative pt-6 first:pt-2">
            <div className="sticky top-2 z-10 flex justify-center">
              <div className="bg-gray-800/90 backdrop-blur-sm text-gray-300 px-4 py-1 rounded-full text-sm shadow-md">
                {date}
              </div>
            </div>
            <div className="space-y-3 mt-2">
              {dateMessages.map((message) => (
                <MessageItem 
                  key={message.id} 
                  message={message}
                  onImageLoadStart={() => handleImageLoadStart(message.id)}
                  onImageLoadEnd={() => handleImageLoadEnd(message.id)}
                />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;