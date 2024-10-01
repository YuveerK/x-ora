const express = require("express");
const router = express.Router();
const pool = require("../db/db.config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new maintenance request
router.post(
  "/maintenance-requests",
  upload.array("files"),
  async (req, res) => {
    const {
      userId,
      unitNumber,
      requestDate,
      priority,
      status,
      description,
      assignedVendorId,
    } = req.body;
    const files = req.files.map((file) => file.filename);

    try {
      const [result] = await pool
        .promise()
        .query(
          "INSERT INTO maintenance_requests (userId, unitNumber, requestDate, priority, status, description, files, assignedVendorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
          [
            userId,
            unitNumber,
            requestDate,
            priority,
            status,
            description,
            JSON.stringify(files),
            assignedVendorId,
          ]
        );

      res.status(201).json({
        success: true,
        message: "Maintenance request created successfully",
        maintenanceRequestId: result.insertId,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Get all maintenance requests
router.get("/maintenance-requests", async (req, res) => {
  try {
    const [results] = await pool.promise().query(`
        select u.profile_picture, u.role, u.first_name, u.last_name, mr.*
from maintenance_requests as mr
inner join users as u on u.user_id = mr.userId
        `);
    res.status(200).json({ success: true, maintenanceRequests: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single maintenance request by ID
router.get("/maintenance-requests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool
      .promise()
      .query(
        "SELECT * FROM maintenance_requests WHERE maintenanceRequestId = ?",
        [id]
      );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Maintenance request not found" });
    }

    res.status(200).json({ success: true, maintenanceRequest: results[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update a maintenance request by ID
router.put(
  "/maintenance-requests/:id",
  upload.array("files"),
  async (req, res) => {
    const { id } = req.params;
    const {
      userId,
      unitNumber,
      requestDate,
      priority,
      status,
      description,
      existingFiles, // This should be an array of filenames or a JSON string
      assignedVendorId,
    } = req.body;

    const newFiles = req.files.map((file) => file.filename);

    let parsedExistingFiles = [];

    // Check if existingFiles is already an array, if not, try to parse it
    if (typeof existingFiles === "string") {
      try {
        parsedExistingFiles = JSON.parse(existingFiles);
        if (!Array.isArray(parsedExistingFiles)) {
          parsedExistingFiles = [existingFiles]; // If it's not an array, treat it as a single filename
        }
      } catch (e) {
        parsedExistingFiles = [existingFiles]; // Fallback if parsing fails
      }
    } else if (Array.isArray(existingFiles)) {
      parsedExistingFiles = existingFiles;
    }

    // Merge new files with existing files
    const mergedImages = [...parsedExistingFiles, ...newFiles];

    // Proceed with your database update here using `mergedImages`

    try {
      const [results] = await pool
        .promise()
        .query(
          "UPDATE maintenance_requests SET userId = ?, unitNumber = ?, requestDate = ?, priority = ?, status = ?, description = ?, files = ?, assignedVendorId = ?, updatedAt = CURRENT_TIMESTAMP WHERE maintenanceRequestId = ?",
          [
            userId,
            unitNumber,
            requestDate,
            priority,
            status,
            description,
            JSON.stringify(mergedImages),
            assignedVendorId,
            id,
          ]
        );

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Maintenance request not found" });
      }

      res.status(200).json({
        success: true,
        message: "Maintenance request updated successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Delete maintenance image and update the database
router.delete(
  "/delete-maintenance-images/:filename/:maintenanceRequestId",
  async (req, res) => {
    const { filename, maintenanceRequestId } = req.params;

    try {
      // Get files from db
      const [results] = await pool
        .promise()
        .query(
          "SELECT files FROM maintenance_requests WHERE maintenanceRequestId = ?",
          [maintenanceRequestId]
        );

      let files = results[0].files;

      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        if (element === filename) {
          files.splice(i, 1);
          break;
        }
      }

      // Remove files from directory

      const file = fs.readFileSync(`./uploads/${filename}`, "utf-8");
      if (file) {
        fs.unlinkSync(`./uploads/${filename}`);
        const query =
          "UPDATE maintenance_requests SET files = ? WHERE maintenanceRequestId = ?";
        await pool
          .promise()
          .query(query, [JSON.stringify(files), maintenanceRequestId]);
        res
          .status(200)
          .json({ success: true, message: "File deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "File not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error deleting file" });
    }
  }
);

// Delete a maintenance request by ID
router.delete("/maintenance-requests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool
      .promise()
      .query(
        "DELETE FROM maintenance_requests WHERE maintenanceRequestId = ?",
        [id]
      );

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Maintenance request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Maintenance request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
