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

    async getUnreadCountForUser(receiverID, senderID) {
        return await prisma.messages.count({
            where: {
                senderID: senderID,
                receiverID: receiverID,
                isRead: false
            }
        });
    }

    async getAllUnreadCounts(userID) {
        // Get unread message counts grouped by sender
        const unreadCounts = await prisma.messages.groupBy({
            by: ['senderID'],
            where: {
                receiverID: userID,
                isRead: false,
            },
            _count: {
                id: true
            }
        });

        return unreadCounts.reduce((acc, curr) => {
            acc[curr.senderID] = curr._count.id;
            return acc;
        }, {});
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('New client connected');

            // Handle user authentication
            socket.on('authenticate', (userID) => {
                this.userSockets.set(userID, socket.id);
                console.log(`User ${userID} authenticated`);
            });

            socket.on('send_message', async (messageData) => {
                try {
                    const newMessage = await prisma.messages.create({
                        data: {
                            ...messageData,
                            isRead: false
                        }
                    });

                    const receiverSocketId = this.userSockets.get(messageData.receiverID);
                    
                    // Send message to both parties
                    socket.emit('message_sent', newMessage);
                    if (receiverSocketId) {
                        this.io.to(receiverSocketId).emit('receive_message', newMessage);
                        
                        // Update unread count for receiver
                        const unreadCount = await this.getUnreadCountForUser(
                            messageData.receiverID,
                            messageData.senderID
                        );
                        this.io.to(receiverSocketId).emit('unread_count_update', {
                            senderID: messageData.senderID,
                            count: unreadCount
                        });
                    }
                } catch (error) {
                    console.error('Error handling message:', error);
                    socket.emit('message_error', { error: error.message });
                }
            });

            socket.on('mark_messages_read', async ({ senderID, receiverID }) => {
                try {
                    // Mark messages as read
                    await prisma.messages.updateMany({
                        where: {
                            senderID: senderID,
                            receiverID: receiverID,
                            isRead: false
                        },
                        data: {
                            isRead: true
                        }
                    });

                    // Update unread counts for the receiver
                    const unreadCounts = await this.getAllUnreadCounts(receiverID);
                    const receiverSocketId = this.userSockets.get(receiverID);
                    if (receiverSocketId) {
                        this.io.to(receiverSocketId).emit('unread_counts', unreadCounts);
                    }
                } catch (error) {
                    console.error('Error marking messages as read:', error);
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