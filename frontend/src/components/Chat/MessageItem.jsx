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

const MessageItem = ({ message, onImageLoadStart, onImageLoadEnd }) => {
  const localSenderID = localStorage.getItem("userID");

  const handleImageLoad = () => {
    onImageLoadEnd();
  };

  // Call onImageLoadStart when the component mounts if it's an image message
  React.useEffect(() => {
    if (message.messageType === "image") {
      onImageLoadStart();
    }
  }, [message.messageType, onImageLoadStart]);

  return (
    <div
      className={`flex ${message.senderID === localSenderID ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
          message.senderID === localSenderID ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'
        }`}
      >
        {message.messageType === "text" ? (
          <p className="font-mono break-words">{message.message}</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default MessageItem;