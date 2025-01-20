const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

exports.postMessage = async (req, res) => {
    const messageData = req.body;
    messageData.senderID = req.userID;
    console.log(messageData);
    try {
        const newMessage = await prisma.messages.create({
            data: messageData
        });

        // const newMessage = await prisma.messages.create({
            // data: {
            //     senderID: 1,
            //     receiverID: 2,
            //     message: "hello world"
            // }
        // });
        
        res.status(200).json({
            status: 'success',
            data: newMessage
        });
    } catch(err) {
        console.error(err);
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};

exports.getMessages = async (req, res) => {
    const secUserID = req.params.id;
    const primUserID = req.userID;
    try {
        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    { senderID: primUserID, receiverID: secUserID },
                    { senderID: secUserID, receiverID: primUserID }
                ]
            },
            orderBy: {
                sentAt: 'asc' // Order by time sent, ascending
            }
        });
        res.status(200).json({
            status: 'success',
            data: messages
        });
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });

    }
};