// // src/contexts/ChatContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { getMessages, sendMessage } from '../api/messages';

// const ChatContext = createContext();

// export const useChatContext = () => {
//   return useContext(ChatContext);
// };

// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [isCanvasOpen, setIsCanvasOpen] = useState(false);
//   const senderID = 1; // replace with actual sender ID
//   const receiverID = 2; // replace with actual receiver ID

//   // Fetch messages from the backend
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const messagesData = await getMessages(senderID, receiverID);
//         setMessages(messagesData);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, [senderID, receiverID]);

//   const addMessage = (message) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   const handleSendText = async (text) => {
//     const newMessage = { senderID, receiverID, message: text, type: 'text' };
//     try {
//       const savedMessage = await sendMessage(newMessage);
//       addMessage(savedMessage);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const handleSendDrawing = async (drawing) => {
//     const newMessage = { senderID, receiverID, message: drawing, type: 'drawing' };
//     try {
//       const savedMessage = await sendMessage(newMessage);
//       addMessage(savedMessage);
//     } catch (error) {
//       console.error('Error sending drawing:', error);
//     }
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         messages,
//         isCanvasOpen,
//         setIsCanvasOpen,
//         handleSendText,
//         handleSendDrawing,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };


// // src/contexts/ChatContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const ChatContext = createContext();

// export const useChatContext = () => {
//   return useContext(ChatContext);
// };

// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [isCanvasOpen, setIsCanvasOpen] = useState(false);  // Canvas open state
//   const senderID = 1; // Dummy sender ID
//   const receiverID = 2; // Dummy receiver ID

//   // Dummy messages data for now
//   useEffect(() => {
//     const dummyMessages = [
//       { id: 1, senderID: 1, receiverID: 2, message: 'Hello!', sentAt: new Date(), type: 'text' },
//       { id: 2, senderID: 2, receiverID: 1, message: 'Hi!', sentAt: new Date(), type: 'text' },
//       { id: 3, senderID: 1, receiverID: 2, message: 'How are you?', sentAt: new Date(), type: 'text' },
//       { id: 4, senderID: 2, receiverID: 1, message: 'I am good!', sentAt: new Date(), type: 'text' },
//       { id: 5, senderID: 1, receiverID: 2, message: 'Here is a drawing!', sentAt: new Date(), type: 'drawing' },
//     ];
//     setMessages(dummyMessages);
//   }, []);

//   // Add new message to the state
//   const addMessage = (message) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   // Handle sending text messages
//   const handleSendText = (text) => {
//     const newMessage = { senderID, receiverID, message: text, type: 'text' };
//     addMessage(newMessage);
//   };

//   // Handle sending drawing messages
//   const handleSendDrawing = (drawing) => {
//     const newMessage = { senderID, receiverID, message: drawing, type: 'drawing' };
//     addMessage(newMessage);
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         messages,
//         isCanvasOpen,
//         setIsCanvasOpen,
//         handleSendText,
//         handleSendDrawing,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };



// import React, { createContext, useContext, useState } from 'react';

// const ChatContext = createContext();

// export const useChatContext = () => {
//   return useContext(ChatContext);
// };

// export const ChatProvider = ({ children }) => {
//   const [connectedUsers, setConnectedUsers] = useState([
//     { id: 1, username: 'Alice', profilePic: '/profile1.jpg' },
//     { id: 2, username: 'Bob', profilePic: '/profile2.jpg' },
//   ]);

//   const [messages, setMessages] = useState([
//           { id: 1, senderID: 1, receiverID: 2, message: 'Hello!', sentAt: new Date(), type: 'text' },
//           { id: 2, senderID: 2, receiverID: 1, message: 'Hi!', sentAt: new Date(), type: 'text' },
//           { id: 3, senderID: 1, receiverID: 2, message: 'How are you?', sentAt: new Date(), type: 'text' },
//           { id: 4, senderID: 2, receiverID: 1, message: 'I am good!', sentAt: new Date(), type: 'text' },
//           { id: 5, senderID: 1, receiverID: 2, message: 'Here is a drawing!', sentAt: new Date(), type: 'drawing' },
//         ]);

//   const sendMessage = (userId, messageContent) => {
//     const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     const newMessage = { id: Date.now(), content: messageContent, sender: 'self', timestamp };
//     setMessages((prev) => ({
//       ...prev,
//       [userId]: [...(prev[userId] || []), newMessage],
//     }));
//   };

//   return (
//     <ChatContext.Provider value={{ connectedUsers, messages, sendMessage }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };




// import React, { createContext, useState, useContext, useEffect } from 'react';

// const ChatContext = createContext();

// // Custom hook to use ChatContext
// export const useChatContext = () => {
//   return useContext(ChatContext);
// };

// // ChatProvider Component
// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       senderID: 1,
//       receiverID: 2,
//       message: 'Hello! How are you?',
//       type: 'text',
//       timestamp: '2025-01-12T10:00:00Z',
//     },
//     {
//       id: 2,
//       senderID: 2,
//       receiverID: 1,
//       message: 'I am good, thanks! How about you?',
//       type: 'text',
//       timestamp: '2025-01-12T10:01:00Z',
//     },
//     {
//       id: 3,
//       senderID: 1,
//       receiverID: 2,
//       message: 'https://dummyimage.com/300', // Example drawing URL
//       type: 'drawing',
//       timestamp: '2025-01-12T10:02:00Z',
//     },
//   ]);

//   const [connectedUsers, setConnectedUsers] = useState([
//     { id: 2, username: 'John Doe', profilePic: 'https://via.placeholder.com/40' },
//     { id: 3, username: 'Jane Smith', profilePic: 'https://via.placeholder.com/40' },
//     { id: 4, username: 'Tom Hanks', profilePic: 'https://via.placeholder.com/40' },
//   ]);

//   const [recentChats, setRecentChats] = useState([]);

//   // Dummy recent chats data (you can replace this with actual data later)
//   const dummyRecentChats = [
//     { id: 2, username: 'John Doe', profilePic: 'https://via.placeholder.com/40' },
//     { id: 3, username: 'Jane Smith', profilePic: 'https://via.placeholder.com/40' },
//   ];

//   useEffect(() => {
//     // For now, we'll use dummy data for recent chats
//     setRecentChats(dummyRecentChats);
//   }, []);

//   const [isCanvasOpen, setIsCanvasOpen] = useState(false);

//   // Simulated sender and receiver IDs
//   const senderID = 1;
//   const receiverID = 2;

//   const handleSendText = (text) => {
//     if (!text.trim()) return;

//     const newMessage = {
//       id: messages.length + 1,
//       senderID,
//       receiverID,
//       message: text,
//       type: 'text',
//       timestamp: new Date().toISOString(),
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   const handleSendDrawing = (drawing) => {
//     if (!drawing) return;

//     const newMessage = {
//       id: messages.length + 1,
//       senderID,
//       receiverID,
//       message: drawing, // Drawing data (e.g., base64 or URL)
//       type: 'drawing',
//       timestamp: new Date().toISOString(),
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         messages,
//         connectedUsers,
//         isCanvasOpen,
//         setIsCanvasOpen,
//         handleSendText,
//         handleSendDrawing,
//         recentChats
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };





// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { getMessages } from '../api/messages';

// const ChatContext = createContext();

// // Custom hook to use ChatContext
// export const useChatContext = () => {
//   return useContext(ChatContext);
// };

// // ChatProvider Component
// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [recentChats, setRecentChats] = useState([]);
//   const [isCanvasOpen, setIsCanvasOpen] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [ secID, setSecID ] = useState('');

// // Establish WebSocket connection when secID changes (when user opens a chat)
//   useEffect(() => {
//     if (!secID) return; // Don't establish WebSocket if no secID is set

//     const ws = new WebSocket(`ws://localhost:7000?userID=${localStorage.getItem("userID")}&receiverID=${secID}`);

//     ws.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     ws.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     // Cleanup WebSocket connection when secID changes or component unmounts
//     return () => {
//       ws.close();
//     };
//   }, [secID]); // Re-run when secID changes

//   // Fetch messages between two users
//   const handleReceiveMessages = async (secUserID) => {
//     try {
//       const receivedMessages = await getMessages(secUserID);
//       setMessages(receivedMessages.data);
//     } catch (error) {
//       console.error('Failed to receive messages:', error);
//     }
//   };

//   // Send a text message
//   const handleSendText = (text, secUserID) => {
//     if (!text.trim() || !socket) return;

//     const newMessage = {
//       senderID: localStorage.getItem("userID"), // Replace with dynamic userID
//       receiverID: secUserID,
//       message: text,
//       messageType: 'text',
//     };

//     socket.send(JSON.stringify(newMessage));
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   // Send a drawing
//   const handleSendDrawing = (drawing, secUserID) => {
//     if (!drawing || !socket) return;

//     const newMessage = {
//       senderID: localStorage.getItem("userID"), // Replace with dynamic userID
//       receiverID: secUserID,
//       message: drawing, // Drawing data (e.g., base64 or URL)
//       messageType: 'drawing',
//     };

//     socket.send(JSON.stringify(newMessage));
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         messages,
//         setMessages,
//         isCanvasOpen,
//         setIsCanvasOpen,
//         handleSendText,
//         handleSendDrawing,
//         handleReceiveMessages,
//         setSecID
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };




// // src/contexts/ChatContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { getMessages, sendMessage } from '../api/messages';

// const ChatContext = createContext();

// // Custom hook to use ChatContext
// export const useChatContext = () => {
//   return useContext(ChatContext);
// };

// // ChatProvider Component
// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [recentChats, setRecentChats] = useState([]);
//   const [isCanvasOpen, setIsCanvasOpen] = useState(false);

//   // Fetch messages between two users
//   const handleReceiveMessages = async (secUserID) => {
//     try {
//       const receivedMessages = await getMessages(secUserID);
//       setMessages(receivedMessages.data);
//     } catch (error) {
//       console.error('Failed to receive messeges:', error);
//     }
//   };

//   // Send a text message
//   const handleSendText = async (text, secUserID) => {
//     if (!text.trim()) return;

//     const newMessage = {
//       receiverID: secUserID,
//       message: text,
//       messageType: 'text'
//     };

//     try {
//       const response = await sendMessage(newMessage);
//       setMessages((prevMessages) => [...prevMessages, response.data]);
//     } catch (error) {
//       console.error('Failed to send text message:', error);
//     }
//   };

//   // Send a drawing
//   const handleSendDrawing = async (drawing, secUserID) => {
//     if (!drawing) return;

//     const newMessage = {
//       receiverID: secUserID,
//       message: drawing, // Drawing data (e.g., base64 or URL)
//       messageType: 'drawing'
//     };

//     try {
//       const response = await sendMessage(newMessage);
//       setMessages((prevMessages) => [...prevMessages, response.data]);
//     } catch (error) {
//       console.error('Failed to send drawing:', error);
//     }
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         messages,
//         setMessages,
//         isCanvasOpen,
//         setIsCanvasOpen,
//         handleSendText,
//         handleSendDrawing,
//         handleReceiveMessages,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };




// src/contexts/ChatContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getMessages } from '../api/messages';

const SOCKET_URL = process.env.BASEURL || 'http://localhost:7000';
const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Authenticate socket with user ID
    const userID = localStorage.getItem('userID');
    if (userID) {
      newSocket.emit('authenticate', userID);
    }

    // Socket event listeners
    newSocket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('message_sent', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('receive_drawing', (drawing) => {
      setMessages(prev => [...prev, drawing]);
    });

    newSocket.on('drawing_sent', (drawing) => {
      setMessages(prev => [...prev, drawing]);
    });

    return () => newSocket.close();
  }, []);

  // Fetch message history
  const handleReceiveMessages = async (secUserID) => {
    try {
      const receivedMessages = await getMessages(secUserID);
      setMessages(receivedMessages.data);
    } catch (error) {
      console.error('Failed to receive messages:', error);
    }
  };

  // Send text message
  const handleSendText = async (text, receiverID) => {
    if (!text.trim() || !socket) return;

    const messageData = {
      senderID: localStorage.getItem('userID'),
      receiverID,
      message: text,
      messageType: 'text'
    };

    // Emit the message through socket
    socket.emit('send_message', messageData);
  };

  // Send drawing
  const handleSendDrawing = async (drawing, receiverID) => {
    if (!drawing || !socket) return;

    const drawingData = {
      senderID: localStorage.getItem('userID'),
      receiverID,
      message: drawing,
      messageType: 'drawing'
    };

    // Emit the drawing through socket
    socket.emit('send_drawing', drawingData);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        isCanvasOpen,
        setIsCanvasOpen,
        handleSendText,
        handleSendDrawing,
        handleReceiveMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};