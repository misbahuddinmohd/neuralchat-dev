// backend/websockets/socketManager.js
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class SocketManager {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                // origin: process.env.CLIENT_URL,
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        
        this.userSockets = new Map(); // Map userID to socket.id
        this.initialize();
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('New client connected');

            // Handle user authentication
            socket.on('authenticate', (userID) => {
                this.userSockets.set(userID, socket.id);
                console.log(`User ${userID} authenticated`);
            });

            // Handle new messages
            socket.on('send_message', async (messageData) => {
                try {
                    // Save message to database
                    const newMessage = await prisma.messages.create({
                        data: messageData
                    });

                    // Get receiver's socket ID
                    const receiverSocketId = this.userSockets.get(messageData.receiverID);
                    
                    // Emit to sender
                    socket.emit('message_sent', newMessage);

                    // Emit to receiver if online
                    if (receiverSocketId) {
                        this.io.to(receiverSocketId).emit('receive_message', newMessage);
                    }
                } catch (error) {
                    console.error('Error handling message:', error);
                    socket.emit('message_error', { error: error.message });
                }
            });

            // Handle drawing messages
            socket.on('send_drawing', async (drawingData) => {
                try {
                    const newDrawing = await prisma.messages.create({
                        data: {
                            ...drawingData,
                            messageType: 'drawing'
                        }
                    });

                    const receiverSocketId = this.userSockets.get(drawingData.receiverID);
                    
                    socket.emit('drawing_sent', newDrawing);
                    
                    if (receiverSocketId) {
                        this.io.to(receiverSocketId).emit('receive_drawing', newDrawing);
                    }
                } catch (error) {
                    console.error('Error handling drawing:', error);
                    socket.emit('drawing_error', { error: error.message });
                }
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                // Remove user from userSockets map
                for (const [userID, socketId] of this.userSockets.entries()) {
                    if (socketId === socket.id) {
                        this.userSockets.delete(userID);
                        break;
                    }
                }
                console.log('Client disconnected');
            });
        });
    }
}

module.exports = SocketManager;