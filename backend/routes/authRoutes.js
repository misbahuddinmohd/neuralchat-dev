const express = require('express');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.get('/verifyJWT', authControllers.verifyJWT);
router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);
router.post('/logout', authControllers.logout);
module.exports = router;