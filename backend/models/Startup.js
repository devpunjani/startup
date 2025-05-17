const mongoose = require("mongoose");

    const FounderSchema = new mongoose.Schema({
        name: String,
        role: String,
        equity_share: Number,
    }, { _id: false });

    const StartupSchema = new mongoose.Schema({
        name: String,
        description: String,
        industry: String,
        year:String,
        stage: String, 
        fundingStatus: String, 
        logo: {
            type: String
        },
        email: String,
        phone: String,
        website: String,
        founders: [FounderSchema],
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    });

module.exports = mongoose.model("Startup", StartupSchema);