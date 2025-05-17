const mongoose = require("mongoose");

const PitchSchema = new mongoose.Schema({
    startupId: {type: mongoose.Schema.Types.ObjectId, ref: "Startup", required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "approved"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Pitch", PitchSchema);