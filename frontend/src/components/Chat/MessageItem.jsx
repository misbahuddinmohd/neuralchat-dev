// // src/components/Chat/MessageItem.jsx
// import React from 'react';

// const MessageItem = ({ message }) => {
//   return (
//     <div
//       className={`flex ${message.senderID === 1 ? 'justify-end' : 'justify-start'}`}
//     >
//       <div
//         className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
//           message.senderID === 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'
//         }`}
//       >
//         {message.type === 'text' ? (
//           <p className="font-mono">{message.message}</p>
//         ) : (
//           <img
//             src={message.message}
//             alt="User drawing"
//             className="rounded"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageItem;



// src/components/Chat/MessageItem.jsx
import React from 'react';
import { formatMessageTime } from '../../utils/dateUtils';
import { useEffect } from 'react';

const MessageItem = ({ message, onImageLoadStart, onImageLoadEnd }) => {
  const localSenderID = localStorage.getItem("userID");
  
  const handleImageLoad = () => {
    onImageLoadEnd();
  };

  useEffect(() => {
    if (message.messageType === "image") {
      onImageLoadStart();
    }
  }, [message.messageType, onImageLoadStart]);

  return (
    <div
      className={`flex ${message.senderID === localSenderID ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-xs lg:max-w-md rounded-lg p-3 ${
          message.senderID === localSenderID ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'
        }`}
      >
        <div className="flex flex-col">
          {message.messageType === "text" ? (
            <div className="flex flex-row items-end space-x-2">
              <p className="font-mono break-words min-w-[32px]">{message.message}</p>
              <span className="text-xs opacity-75 whitespace-nowrap self-end ml-2">
                {formatMessageTime(message.sentAt)}
              </span>
            </div>
          ) : (
            <div className="space-y-1">
              <img
                src={message.message}
                alt={message.altText || 'User drawing'}
                className="rounded max-w-full max-h-60 object-contain"
                onLoad={handleImageLoad}
                onError={(e) => {
                  e.target.src = '/fallback-image.png';
                  onImageLoadEnd();
                }}
              />
              <span className="text-xs opacity-75 block text-right">
                {formatMessageTime(message.sentAt)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;