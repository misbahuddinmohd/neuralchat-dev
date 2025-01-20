// import React, { useState } from "react";
// import Header from "./components/Header";
// import ChatWindow from "./components/ChatWindow";
// import InputArea from "./components/InputArea";
// import CanvasModal from "./components/CanvasModal";

// const App = () => {
//   const [messages, setMessages] = useState([]);
//   const [isCanvasOpen, setCanvasOpen] = useState(false);

//   const sendMessage = (content, type = "text") => {
//     setMessages([...messages, { id: Date.now(), content, type }]);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 text-white">
//       <Header />
//       <ChatWindow messages={messages} />
//       <InputArea
//         onSendMessage={sendMessage}
//         onOpenCanvas={() => setCanvasOpen(true)}
//       />
//       {isCanvasOpen && (
//         <CanvasModal
//           onClose={() => setCanvasOpen(false)}
//           onSend={(drawing) => sendMessage(drawing, "image")}
//         />
//       )}
//     </div>
//   );
// };

// export default App;







// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ChatApp from './pages/ChatApp';

// const App = () => {
//   return (
//     <Router>
//         <Routes>
//           <Route path="/" element={<ChatApp />} />
//         </Routes>
//     </Router>
//   );
// };

// export default App;





// src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ChatProvider } from './contexts/ChatContext';
// import ChatHeader from './components/Chat/ChatHeader';
// import ChatMessages from './components/Chat/ChatMessages';
// import ChatInput from './components/Chat/ChatInput';
// import DrawingCanvas from './components/Canvas/DrawingCanvas';

// const App = () => (
//   <Router>
//     <ChatProvider>
//       <div className="flex flex-col h-screen bg-gray-900">
//         <ChatHeader />
//         <ChatMessages />
//         <ChatInput />
//         <DrawingCanvas />
//       </div>
//     </ChatProvider>
//   </Router>
// );

// export default App;






// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnectionsPage from './pages/ConnectionsPage';
import ChatPage from './pages/ChatPage';
import { ChatProvider } from './contexts/ChatContext';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SIgnupPage';
import { AlertProvider } from './contexts/AlertContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { LoadingProvider } from './contexts/LoadingContext';

const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <UserProvider>
          <ChatProvider>
            <LoadingProvider>
              <Router>
                <Routes>
                  <Route path="/" element={
                    <ProtectedRoute>
                      <ConnectionsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/chat/:userID" element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Routes>
              </Router>
            </LoadingProvider>
          </ChatProvider>
        </UserProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;

