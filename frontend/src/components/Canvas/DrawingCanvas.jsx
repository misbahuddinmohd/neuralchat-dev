// import React, { useRef, useState, useEffect } from 'react';
// import { Eraser } from 'lucide-react';

// const DrawingCanvas = ({ onClose, onSend }) => {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = 300;
//     canvas.height = 300;

//     const context = canvas.getContext('2d');
//     context.lineCap = 'round';
//     context.strokeStyle = 'white';
//     context.lineWidth = 2;
//     contextRef.current = context;
//   }, []);

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   const stopDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const clearCanvas = () => {
//     contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   };

//   const sendDrawing = () => {
//     const drawing = canvasRef.current.toDataURL();
//     console.log(drawing);
//     onSend(drawing);
//     clearCanvas();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-gray-800 p-4 rounded-lg">
//         <canvas
//           ref={canvasRef}
//           onMouseDown={startDrawing}
//           onMouseMove={draw}
//           onMouseUp={stopDrawing}
//           onMouseLeave={stopDrawing}
//           className="bg-gray-900 rounded-lg cursor-crosshair"
//         />
//         <div className="flex justify-between mt-4">
//           <button
//             onClick={clearCanvas}
//             className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
//           >
//             <Eraser className="w-5 h-5 text-gray-200" />
//           </button>
//           <div>
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-200 mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={sendDrawing}
//               className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrawingCanvas;



// // src/components/Canvas/DrawingCanvas.jsx
// import React, { useRef, useState, useEffect } from 'react';
// import { Eraser } from 'lucide-react';
// import { useChatContext } from '../../contexts/ChatContext';

// const DrawingCanvas = () => {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const { setIsCanvasOpen, handleSendDrawing, isCanvasOpen } = useChatContext();

//   useEffect(() => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       canvas.width = 300;
//       canvas.height = 300;

//       const context = canvas.getContext('2d');
//       context.lineCap = 'round';
//       context.strokeStyle = 'white';
//       context.lineWidth = 2;
//       contextRef.current = context;
//     }
//   }, [isCanvasOpen]); // Re-run this effect only when the canvas is opened

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   const stopDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const clearCanvas = () => {
//     contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   };

//   const sendDrawing = () => {
//     const drawing = canvasRef.current.toDataURL();
//     handleSendDrawing(drawing);
//     clearCanvas();
//     setIsCanvasOpen(false);  // Close the canvas after sending the drawing
//   };

//   return (
//     <>
//       {isCanvasOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <canvas
//               ref={canvasRef}
//               onMouseDown={startDrawing}
//               onMouseMove={draw}
//               onMouseUp={stopDrawing}
//               onMouseLeave={stopDrawing}
//               className="bg-gray-900 rounded-lg cursor-crosshair"
//             />
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={clearCanvas}
//                 className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
//               >
//                 <Eraser className="w-5 h-5 text-gray-200" />
//               </button>
//               <div>
//                 <button
//                   onClick={() => setIsCanvasOpen(false)} // Close the canvas when clicked
//                   className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-200 mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={sendDrawing}
//                   className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DrawingCanvas;



// import React, { useRef, useState, useEffect } from 'react';
// import { Eraser } from 'lucide-react';
// import { useChatContext } from '../../contexts/ChatContext';

// const DrawingCanvas = () => {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const { setIsCanvasOpen, handleSendDrawing, isCanvasOpen } = useChatContext();

//   // Resize canvas based on window size
//   const setCanvasSize = () => {
//     const canvas = canvasRef.current;
//     const width = window.innerWidth * 0.8; // 80% of the screen width
//     const height = window.innerHeight * 0.6; // 60% of the screen height
//     canvas.width = width;
//     canvas.height = height;

//     const context = canvas.getContext('2d');
//     context.lineCap = 'round';
//     context.strokeStyle = 'white';
//     context.lineWidth = 2;
//     contextRef.current = context;
//   };

//   useEffect(() => {
//     if (canvasRef.current) {
//       setCanvasSize(); // Set canvas size when the component mounts
//       window.addEventListener('resize', setCanvasSize); // Re-adjust size on window resize
//     }
//     return () => {
//       window.removeEventListener('resize', setCanvasSize); // Clean up event listener
//     };
//   }, [isCanvasOpen]);

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   const stopDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const clearCanvas = () => {
//     contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   };

//   const sendDrawing = () => {
//     const drawing = canvasRef.current.toDataURL();
//     handleSendDrawing(drawing);
//     clearCanvas();
//     setIsCanvasOpen(false); // Close the canvas after sending the drawing
//   };

//   // Mobile touch support
//   const startDrawingTouch = (e) => {
//     const { clientX, clientY } = e.touches[0];
//     const offsetX = clientX - canvasRef.current.offsetLeft;
//     const offsetY = clientY - canvasRef.current.offsetTop;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const drawTouch = (e) => {
//     if (!isDrawing) return;
//     const { clientX, clientY } = e.touches[0];
//     const offsetX = clientX - canvasRef.current.offsetLeft;
//     const offsetY = clientY - canvasRef.current.offsetTop;
//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   const stopDrawingTouch = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   return (
//     <>
//       {isCanvasOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <canvas
//               ref={canvasRef}
//               onMouseDown={startDrawing}
//               onMouseMove={draw}
//               onMouseUp={stopDrawing}
//               onMouseLeave={stopDrawing}
//               onTouchStart={startDrawingTouch}
//               onTouchMove={drawTouch}
//               onTouchEnd={stopDrawingTouch}
//               className="bg-gray-900 rounded-lg cursor-crosshair"
//             />
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={clearCanvas}
//                 className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
//               >
//                 <Eraser className="w-5 h-5 text-gray-200" />
//               </button>
//               <div>
//                 <button
//                   onClick={() => setIsCanvasOpen(false)} // Close the canvas when clicked
//                   className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-200 mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={sendDrawing}
//                   className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DrawingCanvas;



import React, { useRef, useState, useEffect } from 'react';
import { Eraser } from 'lucide-react';
import { useChatContext } from '../../contexts/ChatContext';
import { useParams } from 'react-router-dom';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { setIsCanvasOpen, handleSendDrawing, isCanvasOpen } = useChatContext();
  const { userID } = useParams();

  // Resize canvas based on window size and handle high DPI
  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    const width = Math.min(window.innerWidth * 0.8, 600); // Max width of 600px for mobile
    const height = Math.min(window.innerHeight * 0.6, 400); // Max height of 400px for mobile
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;

    const context = canvas.getContext('2d');
    context.scale(scale, scale);
    context.lineCap = 'round';
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    contextRef.current = context;
  };

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);
    }
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isCanvasOpen]);

  useEffect(() => {
    if (isCanvasOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling when canvas is open
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = ''; // Clean up on unmount
    };
  }, [isCanvasOpen]);

  const getTouchPosition = (touch) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { offsetX, offsetY } = e.touches
      ? getTouchPosition(e.touches[0])
      : e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { offsetX, offsetY } = e.touches
      ? getTouchPosition(e.touches[0])
      : e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const sendDrawing = () => {
    const drawing = canvasRef.current.toDataURL();
    handleSendDrawing(drawing, userID);
    clearCanvas();
    setIsCanvasOpen(false); // Close the canvas after sending the drawing
  };

  return (
    <>
      {isCanvasOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onTouchMove={(e) => e.preventDefault()} // Prevent page scrolling on touch
        >
          <div className="bg-gray-800 p-4 rounded-lg">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={(e) => {
                e.preventDefault(); // Prevent touch scrolling
                startDrawing(e);
              }}
              onTouchMove={(e) => {
                e.preventDefault(); // Prevent touch scrolling
                draw(e);
              }}
              onTouchEnd={stopDrawing}
              className="bg-gray-900 rounded-lg cursor-crosshair touch-none"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={clearCanvas}
                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Eraser className="w-5 h-5 text-gray-200" />
              </button>
              <div>
                <button
                  onClick={() => setIsCanvasOpen(false)} // Close the canvas when clicked
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-200 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={sendDrawing}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawingCanvas;
        
