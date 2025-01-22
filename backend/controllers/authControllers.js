const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.verifyJWT = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ isLoggedIn: false });
        }

        // Verify token with your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is expired
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ isLoggedIn: false });
        }

        res.status(200).json({
            isLoggedIn: true,
            userID: decoded.userID
        });

    } catch (err) {
        res.status(400).json({
            status: "failed",
            error: err
        });
    }
};


// Signup
exports.signup = async (req, res) => {
    let { email, name, password, confirmPassword } = req.body;
    email = email.toLowerCase();

    // Validate input
    if (!email || !name || !password || !confirmPassword) {
        return res.status(400).json({
            status: "failed",
            error: 'All fields are required'
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            status: "failed",
            error: 'Passwords do not match'
        });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.users.findUnique({ where: { userEmail: email } });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                error: 'User already exists'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await prisma.users.create({
            data: {
                userID: email,
                userName: name,
                userEmail: email,
                userPassword: hashedPassword,
            },
        });

        res.status(201).json({
            status: 'success',
            user: {
                email: user.userEmail,
                name: user.userName
            }
        });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({
            status: "failed",
            error: err
        });
    }
};


// Login 
exports.login = async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            status: "failed",
            error: 'Email and password are required'
        });
    }

    try {
        // Find the user by email
        const user = await prisma.users.findUnique({ where: { userEmail: email } });
        if (!user) {
            return res.status(400).json({
                status: "failed",
                error: 'No user found, please signup'
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.userPassword);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: "failed",
                error: 'Invalid email or password'
            });
        }

        // Create a JWT token 
        const token = jwt.sign(
            { userID: user.userID },  // Payload 
            process.env.JWT_SECRET,   // Secret key from .env
            { expiresIn: '30d' }      // Token expiration
        );

        // send the token in cookie
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };
        if (process.env.NODE_ENV === 'production') {
            cookieOptions.secure = true;
            cookieOptions.sameSite = 'None';
        } else {
            cookieOptions.sameSite = 'Strict';
        }

        res.cookie('jwt', token, cookieOptions);

        res.status(200).json({ 
            status: "success",
            message: "Login successful",
            data: {
                userID: user.userID
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ 
            status: "failed",
            message: 'Something went wrong' 
        });
    }
};


exports.protect = async (req, res, next) => {
    try {
        // 1) Getting token and checking if it's there
        let token;
        if(req.cookies.jwt){
            token = req.cookies.jwt;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: 'You are not logged in! Please log in.'
            });
        }

        // 2) Verifying the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ 
                status: 'failed', 
                message: 'not authorized' });
        }

        // Check if token is expired
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ 
                status: 'failed', 
                message: 'token expired, login again' 
            });
        }

        // 3) Check if user still exists
        // const currentUser = await Operators.findOne({ operatorID: decoded.operatorID });
        // if (!currentUser) {
        //     return res.status(401).json({
        //         message: 'The user no longer exists.'
        //     });
        // }

        // 4) Check if the user changed the password after the token was issued
        // if (currentUser.changedPasswordAfter(decoded.iat)) {
        //     return res.status(401).json({
        //         message: 'User recently changed password! Please log in again.'
        //     });
        // }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.userID = decoded.userID;
        next();
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
};


exports.logout = async (req, res) => {
    try {
        const cookieOptions = {
            expires: new Date(0),
            httpOnly: true,            };
        if (process.env.NODE_ENV === 'production'){
            cookieOptions.secure = true;
            cookieOptions.sameSite = 'None';
        } else {
            cookieOptions.sameSite = 'Strict';
        }
        
        res.cookie('jwt', '', cookieOptions);

        // Send a success response
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'failed',
            message: 'Failed to log out. Please try again.',
        });
    }
};
