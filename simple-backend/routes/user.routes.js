const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/user.controller');

router.get('/me', getMe);

module.exports = router;
