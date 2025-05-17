const express = require("express");
const router = express.Router();

const {
  submitPitch,
  getPitchByStartupId,
  getPitches,
  updatePitchStatus
} = require("../controllers/pitchController");

// Optional: If using JWT auth
// const verifyToken = require("../middleware/verifyToken");

// Public Routes
router.post("/submit", submitPitch);
router.get("/:startupId", getPitchByStartupId);

// Protected Routes (add verifyToken if using authentication)
router.get("/", getPitches); // Or: [verifyToken, getPitches]
router.post("/:id/:action", updatePitchStatus); // Or: [verifyToken, updatePitchStatus]

module.exports = router;
