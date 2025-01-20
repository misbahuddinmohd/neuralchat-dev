const express = require('express');
const messageControllers = require('../controllers/messageControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.post('/postMessage', authControllers.protect, messageControllers.postMessage);
router.get('/getMessages/:id', authControllers.protect, messageControllers.getMessages);


module.exports = router;