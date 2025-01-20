// import React, { useState } from 'react';
// import { Send, Pencil } from 'lucide-react';

// const ChatInput = ({ onSendText, onOpenCanvas }) => {
//   const [inputMessage, setInputMessage] = useState('');

//   const sendMessage = () => {
//     if (inputMessage.trim()) {
//       onSendText(inputMessage);
//       setInputMessage('');
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-800 border-t border-gray-700">
//       <div className="flex space-x-2">
//         <button
//           onClick={onOpenCanvas}
//           className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
//         >
//           <Pencil className="w-5 h-5 text-gray-200" />
//         </button>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           placeholder="Type a message..."
//           className="flex-1 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
//         />
//         <button
//           onClick={sendMessage}
//           className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Send className="w-5 h-5 text-white" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatInput;





// src/components/Chat/ChatInput.jsx
import React, { useState } from 'react';
import { Send, Pencil } from 'lucide-react';
import { useChatContext } from '../../contexts/ChatContext';
import { useParams } from 'react-router-dom';

const ChatInput = () => {
  const [inputMessage, setInputMessage] = useState('');
  const { handleSendText, setIsCanvasOpen, handleSendMessage } = useChatContext();
  const { userID } = useParams();

  const sendMessage = () => {
    if (inputMessage.trim()) {
      handleSendText(inputMessage, userID);
      setInputMessage('');
    }
  };


  return (
    <div className="sticky bottom-0 z-10 p-2 bg-gray-800 border-t border-gray-700">
      <div className="flex space-x-1 md:space-x-2">
        <button
          onClick={() => setIsCanvasOpen(true)}
          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <Pencil className="w-4 h-4 md:w-5 md:h-5 text-gray-200" />
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm md:text-base"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
