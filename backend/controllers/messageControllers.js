// backend/controllers/messageControllers.js
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
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: 'failed',
            error: err.message
        });
    }
};

// exports.getMessages = async (req, res) => {
//     const secUserID = req.params.id;
//     const primUserID = req.userID;
//     const cursor = req.query.cursor;


//     try {
//         // const messages = await prisma.messages.findMany({
//         //     where: {
//         //         OR: [
//         //             { senderID: primUserID, receiverID: secUserID },
//         //             { senderID: secUserID, receiverID: primUserID }
//         //         ]
//         //     },
//         //     orderBy: {
//         //         sentAt: 'asc' // Order by time sent, ascending
//         //     }
//         // });

//         // const messages = await prisma.messages.findMany({
//         //     where: {
//         //         OR: [
//         //             { senderID: primUserID, receiverID: secUserID },
//         //             { senderID: secUserID, receiverID: primUserID },
//         //         ],
//         //         sentAt: {
//         //             gte: startDate,
//         //             lte: endDate,
//         //         },
//         //     },
//         //     orderBy: {
//         //         sentAt: 'asc',
//         //     },
//         // });
//         let endDate;
//         if (cursor != "null") {
//             // // Parse the input date string to a Date object
//             // lastDate = new Date(cursor);

//             // const lastDate = await prisma.$queryRaw`
//             // SELECT "sentAt" FROM "Messages"
//             // WHERE (
//             // ("senderID" = ${primUserID} AND "receiverID" = ${secUserID})
//             // OR ("senderID" = ${secUserID} AND "receiverID" = ${primUserID})
//             // ) AND "sentAt" < ${lastDate}
//             // ORDER BY "sentAt" DESC
//             // LIMIT 1`;

//             // endDate = lastDate[0].sentAt;
//             // console.log("auto lastdate ", lastDate);

//             endDate = new Date(cursor);
//         } else {
//             const lastDate = await prisma.$queryRaw`
//             SELECT "sentAt" FROM "Messages"
//             WHERE (
//             ("senderID" = ${primUserID} AND "receiverID" = ${secUserID})
//             OR ("senderID" = ${secUserID} AND "receiverID" = ${primUserID})
//             )
//             ORDER BY "sentAt" DESC
//             LIMIT 1`;

//             endDate = lastDate[0].sentAt;
//             console.log("auto lastdate ", lastDate);
//         }

//         // Parse the input date string to a Date object
//         // const endDate = new Date(cursor);

//         // Calculate the start of the day for 2 days ago
//         const startDate = new Date(endDate); // Clone the date
//         startDate.setDate(startDate.getDate() - 2); // Move back 2 days
//         startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 (local time)

//         // Log the values
//         console.log("Cursor (Now):", cursor);
//         console.log("End Date:", endDate);
//         console.log("Start Date:", startDate);


//         const messages = await prisma.$queryRaw`
//         SELECT * FROM "Messages"
//         WHERE (
//           ("senderID" = ${primUserID} AND "receiverID" = ${secUserID})
//           OR ("senderID" = ${secUserID} AND "receiverID" = ${primUserID})
//         ) 
//         AND "sentAt" >= ${startDate} AND "sentAt" <= ${endDate}
//         ORDER BY "sentAt" ASC`;

//         res.status(200).json({
//             status: 'success',
//             data: messages
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'failed',
//             error: err.message
//         });

//     }
// };


// exports.getMessages = async (req, res) => {
//     const secUserID = req.params.id;
//     const primUserID = req.userID;
//     const cursor = req.query.cursor; // Cursor passed as a query parameter

//     try {
//         let endDate = cursor && cursor !== "null" ? new Date(cursor) : new Date();
//         let messages = [];
//         const maxRetries = 5; // Limit how far back we search to avoid infinite loops
//         let retries = 0;

//         while (messages.length === 0 && retries < maxRetries) {
//             // Calculate the start date for the current range
//             const startDate = new Date(endDate);
//             startDate.setDate(startDate.getDate() - 2); // Move back 2 days
//             startDate.setHours(0, 0, 0, 0); // Start of the day

//             console.log(`Attempt ${retries + 1}: Searching from ${startDate} to ${endDate}`);

//             // Fetch messages in the current range
//             messages = await prisma.messages.findMany({
//                 where: {
//                     OR: [
//                         { senderID: primUserID, receiverID: secUserID },
//                         { senderID: secUserID, receiverID: primUserID },
//                     ],
//                     sentAt: {
//                         gte: startDate,
//                         lte: endDate,
//                     },
//                 },
//                 orderBy: { sentAt: "asc" },
//             });

//             // If no messages found, move the range further back
//             if (messages.length === 0) {
//                 endDate = startDate; // Move the endDate to the startDate
//                 retries += 1;
//             }
//         }

//         // Detect if we have reached the end of all messages
//         if (messages.length === 0) {
//             // Check if there are any messages at all
//             const oldestMessage = await prisma.messages.findFirst({
//                 where: {
//                     OR: [
//                         { senderID: primUserID, receiverID: secUserID },
//                         { senderID: secUserID, receiverID: primUserID },
//                     ],
//                 },
//                 orderBy: { sentAt: "asc" }, // Get the oldest message
//                 select: { sentAt: true },
//             });

//             // If no oldest message exists or endDate is <= oldestMessage, we are done
//             if (!oldestMessage || endDate <= oldestMessage.sentAt) {
//                 return res.status(200).json({
//                     status: "success",
//                     data: [], // No more messages to return
//                 });
//             }
//         }

//         res.status(200).json({
//             status: "success",
//             data: messages,
//             cursor: messages.length > 0 ? messages[messages.length - 1].sentAt : null, // Return the new cursor
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({
//             status: "failed",
//             error: err.message,
//         });
//     }
// };



exports.getMessages = async (req, res) => {
    const secUserID = req.params.id;
    const primUserID = req.userID;
    const cursor = req.query.cursor || null;
    const lastMsgID = req.query.lastMsgID || null;
    const limit = 5;

    try {
        let endDate, lastID;
        let messages = [];

        if (cursor && cursor !== "null") {
            endDate = new Date(cursor);
            lastID = parseInt(lastMsgID);

            messages = await prisma.$queryRaw`
            SELECT * FROM "Messages"
            WHERE (
                ("senderID" = ${primUserID} AND "receiverID" = ${secUserID})
                OR ("senderID" = ${secUserID} AND "receiverID" = ${primUserID})
            )
            AND ("sentAt" < ${endDate} AND "id" < ${lastID})
            ORDER BY "sentAt" DESC, "id" DESC
            LIMIT ${limit}`;
        } else {
            const lastMsgInfo = await prisma.$queryRaw`
                SELECT "id", "sentAt" FROM "Messages"
                WHERE (
                    ("senderID" = ${primUserID} AND "receiverID" = ${secUserID})
                    OR ("senderID" = ${secUserID} AND "receiverID" = ${primUserID})
                )
                ORDER BY "sentAt" DESC, "id" DESC
                LIMIT 1`;

            endDate = lastMsgInfo[0]?.sentAt || new Date();
            lastID = parseInt(lastMsgInfo[0]?.id);

            messages = await prisma.$queryRaw`
            SELECT * FROM "Messages"
            WHERE (
                ("senderID" = ${primUserID} AND "receiverID" = ${secUserID})
                OR ("senderID" = ${secUserID} AND "receiverID" = ${primUserID})
            )
            AND ("sentAt" <= ${endDate} AND "id" <= ${lastID})
            ORDER BY "sentAt" DESC, "id" DESC
            LIMIT ${limit}`;
        }
        console.log("last ID: ",lastID);
        console.log("end date: ",endDate);

        

        const hasMore = messages.length === limit;

        res.status(200).json({
            status: 'success',
            data: messages.reverse(),
            meta: {
                cursor: hasMore ? messages[messages.length - 1].sentAt : null,
                lastMsgID: hasMore ? messages[messages.length - 1].id : null,
                hasMore,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'failed',
            error: err.message,
        });
    }
};

