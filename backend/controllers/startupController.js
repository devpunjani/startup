const Startup = require("../models/Startup");
const fs = require("fs");
const path = require("path");

exports.createStartup = async (req, res) => {
  try {
    const {
      entrepreneurId,
      name,
      description,
      industry,
      year,
      stage,
      fundingStatus,
      email,
      phone,
      website,
    } = req.body;

    const founders = JSON.parse(req.body.founders || "[]");

    if (!entrepreneurId || !name || !description || !industry) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const logo = req.file ? req.file.filename : null;

    const startup = new Startup({
      name,
      description,
      industry,
      year,
      stage,
      fundingStatus,
      email,
      phone,
      website,
      logo,
      founders,
      owner: entrepreneurId,
    });

    await startup.save();
    res.status(201).json({ message: "Startup created successfully", startup });

  } catch (err) {
    console.error("Error creating startup:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStartup = async (req, res) => {
  console.log("Received DELETE request for startup with ID:", req.params.id);  // Debugging log

  try {
    const startupId = req.params.id;
    const startup = await Startup.findById(startupId);
    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    // Delete logo if exists
    if (startup.logo) {
      const logoPath = path.join(__dirname, "../uploads", startup.logo);
      fs.unlink(logoPath, (err) => {
        if (err) {
          console.warn("Failed to delete logo image:", err.message);
        }
      });
    }

    await Startup.findByIdAndDelete(startupId);
    res.json({ message: "Startup deleted successfully" });
  } catch (err) {
    console.error("Error deleting startup:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.editStartup = async (req, res) => {
  try {
    const { id } = req.params;
    const { entrepreneurId, name, description, industry, year, stage, fundingStatus, email, phone, website, founders } = req.body;
    const logo = req.file ? req.file.filename : null; // Check if a new logo is uploaded

    // Parse the founders field if provided
    let parsedFounders = founders ? JSON.parse(founders) : [];

    // Find the startup by its ID
    const startup = await Startup.findById(id);
    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    // Check if the logged-in user is the owner of the startup
    if (startup.owner.toString() !== entrepreneurId) {
      return res.status(403).json({ message: "You are not authorized to edit this startup" });
    }

    // Optionally delete the old logo if a new one is uploaded
    if (logo && startup.logo) {
      const oldLogoPath = path.join(__dirname, "../uploads", startup.logo);
      fs.unlinkSync(oldLogoPath); // Delete the old logo
    }

    // Update the startup with new data
    startup.name = name || startup.name;
    startup.description = description || startup.description;
    startup.industry = industry || startup.industry;
    startup.year = year || startup.year;
    startup.stage = stage || startup.stage;
    startup.fundingStatus = fundingStatus || startup.fundingStatus;
    startup.email = email || startup.email;
    startup.phone = phone || startup.phone;
    startup.website = website || startup.website;
    startup.founders = parsedFounders.length ? parsedFounders : startup.founders;
    startup.logo = logo || startup.logo;

    // Save the updated startup
    await startup.save();

    res.status(200).json({ message: "Startup updated successfully", startup });

  } catch (err) {
    console.error("Error updating startup:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);  // Find the startup by ID

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });  // Return 404 if not found
    }

    res.status(200).json(startup);  // Send the startup data if found
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


/* exports.getStartups = async (req, res) => {
  try {
    const startups = await Startup.find().populate("owner", "name email");
    res.json(startups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */

exports.getStartups = async (req, res) => {
  try {
    const { userId } = req.query;

    const filter = userId ? { owner: userId } : {};

    const startups = await Startup.find(filter).populate("owner", "name email");

    res.json(startups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

