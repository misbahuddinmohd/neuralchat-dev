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
  const { messages, setMessages, handleReceiveMessages, updateReadMessagesCount } = useChatContext();
  const { userID } = useParams();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [loadingImages, setLoadingImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const lastSentMessageRef = useRef(null);

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

  const isContainerScrollable = (container) => {
    return container.scrollHeight > container.clientHeight;
  };

  const loadMoreMessages = async () => {
    if (isLoading || !hasMoreMessages) return;

    setIsLoading(true);
    const container = messagesContainerRef.current;
    
    if (!container) {
      setIsLoading(false);
      return;
    }

    // Capture current scroll state before loading messages
    const initialScrollHeight = container.scrollHeight;
    const initialScrollTop = container.scrollTop;

    try {
      const result = await handleReceiveMessages(userID, true);

      if (result?.meta && !result.meta.hasMore) {
        setHasMoreMessages(false);
        console.log("Reached the oldest message. No more messages to load.");
      }

      // Preserve scroll position after loading older messages
      requestAnimationFrame(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - initialScrollHeight + initialScrollTop;
        }
      });
    } catch (error) {
      console.error("Error loading more messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update read messages count whenever messages change
  useEffect(() => {
    updateReadMessagesCount(userID);
  }, [messages, userID]);

  // Initial messages load and scroll setup
  useEffect(() => {
    const fetchInitialMessages = async () => {
      // Clear existing messages
      setMessages([]);
      
      // Fetch initial messages
      await handleReceiveMessages(userID);
      
      const container = messagesContainerRef.current;
      if (container) {
        // Always scroll to bottom on initial load
        container.scrollTop = container.scrollHeight;

        // Load more messages if container is not fully populated
        if (!isContainerScrollable(container) && hasMoreMessages) {
          loadMoreMessages();
        }
      }
    };
    
    fetchInitialMessages();
  }, [userID]);

  // Scroll event listener for loading older messages
  useEffect(() => {
    const container = messagesContainerRef.current;

    const handleScroll = () => {
      if (container && container.scrollTop === 0) {
        loadMoreMessages();
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);


  // Modify the useEffect for auto-scrolling
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      // Check if the last message was just sent
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.id !== lastSentMessageRef.current) {
        // Always scroll to bottom for new messages
        container.scrollTop = container.scrollHeight;
        
        // Update the ref to track the last sent message
        lastSentMessageRef.current = lastMessage.id;
      }
    }
  }, [messages]);

  // Group messages by date for display
  const groupedMessages = messages?.reduce((groups, message) => {
    const date = formatMessageDate(message.sentAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div 
      ref={messagesContainerRef} 
      className="flex-1 overflow-y-auto p-2 md:p-4"
    >
      {isLoading && (
        <div className="text-center py-2 text-gray-500">
          Loading more messages...
        </div>
      )}

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