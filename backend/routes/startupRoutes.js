const express = require("express");
const router = express.Router();
const {
  createStartup,
  deleteStartup,
  editStartup,
  getStartupById,
  getStartups,
} = require("../controllers/startupController");
const upload = require("../middleware/upload"); // multer middleware

router.get("/:id", getStartupById);
router.get("/", getStartups);
router.post("/create", upload.single("logo"), createStartup);
router.put("/edit/:id", upload.single("logo"), editStartup);
router.delete("/delete/:id", deleteStartup);

module.exports = router;