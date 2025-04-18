const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.get('/getAll', leaderboardController.getAllUser);
router.get('/getUserById/:id', leaderboardController.getUserById);
module.exports = router;