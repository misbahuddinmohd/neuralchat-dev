// const express = require('express');
// const messageRoutes = require('./routes/messageRoutes');
// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const morgan = require('morgan');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

// const app = express();

// // IMPORTANT MIDDLEWARE

// app.use(cors({
//     origin: ['http://localhost:3000'],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     credentials: true
// }));


// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());



// // ROUTES
// app.use('/api/v1/message', messageRoutes);
// app.use('/api/v1/user', userRoutes);
// app.use('/api/v1/auth', authRoutes);

// module.exports = app;



const express = require('express');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// IMPORTANT MIDDLEWARE
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);

module.exports = app;
