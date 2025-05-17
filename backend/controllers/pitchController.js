const Pitch = require("../models/Pitch");

const submitPitch = async (req, res) => {
    try {
        const { startupId, title, description, amount } = req.body;

        if (!startupId || !title || !description || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const pitch = new Pitch({ startupId, title, description, amount,status: "pending"  });
        await pitch.save();

        res.status(201).json({ message: "Pitch submitted successfully", pitch });
    } catch (err) {
        console.error("Error submitting pitch:", err);
        res.status(500).json({ error: err.message });
    }
};
// pitchController.js




// pitchController.js
const getPitchByStartupId = async (req, res) => {
    try {
      const pitches = await Pitch.find({ startupId: req.params.startupId });
  
      if (!pitches || pitches.length === 0) {
        return res.status(404).json({ message: "No pitches found for this startup" });
      }
  
      res.status(200).json(pitches);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

/* exports.getPitches = async (req, res) => {
    try {
        const pitches = await Pitch.find().populate("entrepreneurId", "name email");
        res.json(pitches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; */

// pitchController.js

// controllers/pitchController.js

//const Pitch = require('../models/Pitch');

// GET: All pitches (only Pending & Approved)
const getPitches = async (req, res) => {
  try {
    const pitches = await Pitch.find({
      status: { $in: ['pending', 'approved'] }
    });
    res.status(200).json(pitches);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pitches' });
  }
};

// POST: Approve pitch (only if status is Pending)
const updatePitchStatus = async (req, res) => {
  const { id, action } = req.params;

  try {
    const pitch = await Pitch.findById(id);
    if (!pitch) {
      return res.status(404).json({ message: 'Pitch not found' });
    }

    if (pitch.status === 'approved') {
      return res.status(400).json({ message: 'Pitch already approved' });
    }

    if (action === 'approve') {
      pitch.status = 'approved';
      await pitch.save();
      return res.status(200).json({ message: 'Pitch approved successfully' });
    }

    res.status(400).json({ message: 'Invalid action' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getPitches,
  updatePitchStatus,
  getPitchByStartupId,
  submitPitch
};


