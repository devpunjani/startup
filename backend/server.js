const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));  
app.use("/api/startups", require("./routes/startupRoutes"));  
app.use("/api/pitches", require("./routes/pitchRoutes"));  
app.use("/api/discussions", require("./routes/discussionRoutes"));

// Default Route for Testing
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));