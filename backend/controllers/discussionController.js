const Discussion = require('../models/Discussion');

// Get all discussions except user's own
exports.getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find({ user: { $ne: req.user.id } })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's own discussions
exports.getUserDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find({ user: req.user.id })
            .sort({ createdAt: -1 });
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new discussion
exports.createDiscussion = async (req, res) => {
    try {
        const { title, content } = req.body;
        const discussion = new Discussion({
            title,
            content,
            user: req.user.id
        });
        const savedDiscussion = await discussion.save();
        res.status(201).json(savedDiscussion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a discussion (only if user is the owner)
exports.deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        if (discussion.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this discussion' });
        }

        await Discussion.findByIdAndDelete(req.params.id);
        res.json({ message: 'Discussion deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: error.message });
    }
}; 