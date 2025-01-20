const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


exports.getUsers = async (req, res) => {
    const primUserID = req.userID;
    try {
        const users = await prisma.users.findMany({
            select: {
                userID: true,
                userName: true,
            },
            where: {
                userID: {
                    not: primUserID // Exclude the specified userID
                }
            },
            orderBy: {
                userID: 'asc' // Order by ascending
            }
        }); 
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            error: err.message
        });

    }
};