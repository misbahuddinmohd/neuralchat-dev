const express = require('express');
const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.get('/getUsers', authControllers.protect, userControllers.getUsers);


module.exports = router;