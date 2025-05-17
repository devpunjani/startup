const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
    getAllDiscussions,
    getUserDiscussions,
    createDiscussion,
    deleteDiscussion
} = require('../controllers/discussionController');

// Middleware to verify token
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Apply token verification to all routes
router.use(verifyToken);

// Get all discussions except user's own
router.get('/', getAllDiscussions);

// Get user's own discussions
router.get('/my-discussions', getUserDiscussions);

// Create a new discussion
router.post('/', createDiscussion);

// Delete a discussion
router.delete('/:id', deleteDiscussion);

module.exports = router; 