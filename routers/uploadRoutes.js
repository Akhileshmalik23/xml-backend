const express = require("express");
const multer = require("multer");
const { processXML } = require("../controllers/uploadController");
const CreditReport = require("../models/CreditReport");

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); 
  }

  next();
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload XML file and process
router.post("/upload", upload.single("file"), processXML);

// Fetch all reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await CreditReport.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Fetch a single report by ID
router.get("/reports/:id", async (req, res) => {
  try {
    const report = await CreditReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the report" });
  }
});

module.exports = router;
