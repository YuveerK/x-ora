const express = require("express");
const router = express.Router();
const pool = require("../db/db.config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure Multer for quotation file uploads
const quotationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../quotations");
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

const uploadQuotation = multer({ storage: quotationStorage });

// Create a new quotation
router.post(
  "/maintenance-requests/:id/quotations",
  uploadQuotation.single("quotation"), // Expecting file field with name "quotation"
  async (req, res) => {
    const { id } = req.params;
    const { vendorId, amount, description } = req.body;
    const fileName = req.file ? req.file.filename : null;
    const filePath = req.file ? req.file.path : null;

    try {
      const [result] = await pool
        .promise()
        .query(
          "INSERT INTO quotations (maintenanceRequestId, vendorId, amount, description, filePath, fileName, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
          [id, vendorId, amount, description, filePath, fileName]
        );

      res.status(201).json({
        success: true,
        message: "Quotation created successfully",
        quotationId: result.insertId,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Get all quotations for a maintenance request
router.get("/maintenance-requests/:id/quotations", async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool
      .promise()
      .query("SELECT * FROM quotations WHERE maintenanceRequestId = ?", [id]);

    res.status(200).json({ success: true, quotations: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update a quotation (including replacing the file)
router.put(
  "/quotations/:quotationId",
  uploadQuotation.single("quotation"),
  async (req, res) => {
    const { quotationId } = req.params;
    const { vendorId, amount, description, existingFileName } = req.body;

    const newFileName = req.file ? req.file.filename : null;
    const newFilePath = req.file ? req.file.path : null;

    try {
      // If there's a new file, delete the old file
      if (existingFileName) {
        const oldFilePath = path.join(
          __dirname,
          `../uploads/quotations/${existingFileName}`
        );
        fs.unlink(oldFilePath, (err) => {
          if (err && err.code !== "ENOENT") {
            return res
              .status(500)
              .json({ success: false, message: "Error deleting old file" });
          }
        });
      }

      const fileNameToUpdate = newFileName || existingFileName;
      const filePathToUpdate = newFilePath || null;

      const [results] = await pool
        .promise()
        .query(
          "UPDATE quotations SET vendorId = ?, amount = ?, description = ?, filePath = ?, fileName = ?, updatedAt = CURRENT_TIMESTAMP WHERE quotationId = ?",
          [
            vendorId,
            amount,
            description,
            filePathToUpdate,
            fileNameToUpdate,
            quotationId,
          ]
        );

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Quotation not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Quotation updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Delete a quotation
router.delete("/quotations/:quotationId", async (req, res) => {
  const { quotationId } = req.params;

  try {
    const [results] = await pool
      .promise()
      .query("DELETE FROM quotations WHERE quotationId = ?", [quotationId]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Quotation not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Quotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
