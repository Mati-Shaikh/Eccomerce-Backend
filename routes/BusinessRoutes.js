// routes/businessRoutes.js
const express = require('express');
const router = express.Router();
const businessController = require('../Controllers/BusinessController');

// Register a business
router.post('/register', businessController.register);

module.exports = router;
