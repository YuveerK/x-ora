const express = require("express");
const router = express.Router();
const pool = require("../db/db.config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure Multer for invoice file uploads
const invoiceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../invoices");
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

const uploadInvoice = multer({ storage: invoiceStorage });

/// Create a new invoice
router.post(
  "/add-invoice",
  uploadInvoice.single("invoice"), // Expecting file field with name "invoice"
  async (req, res) => {
    const {
      invoiceNumber,
      title,
      amount,
      description,
      invoicedDate,
      dueDate,
      invoiceCategory,
      fileName,
      paymentStatus,
    } = req.body;

    console.log(amount);
    const filePath = req.file ? req.file.filename : null; // Store only the filename
    try {
      const [result] = await pool
        .promise()
        .query(
          "INSERT INTO invoices ( invoiceNumber, title, amount, description, invoicedDate, dueDate, invoiceCategory, filePath, fileName, paymentStatus) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            invoiceNumber,
            title,
            amount,
            description,
            invoicedDate,
            dueDate,
            invoiceCategory,
            filePath, // Insert just the filename
            fileName,
            paymentStatus,
          ]
        );

      res.status(201).json({
        success: true,
        message: "Invoice created successfully",
        invoiceId: result.insertId,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Update an invoice and delete old file if necessary
router.put(
  "/update-invoice/:invoiceId",
  uploadInvoice.single("invoice"),
  async (req, res) => {
    const { invoiceId } = req.params;
    const {
      invoiceNumber,
      title,
      amount,
      description,
      invoicedDate,
      dueDate,
      invoiceCategory,
      fileName,
      paymentStatus,
    } = req.body;

    const newFile = req.file; // Use req.file for single file uploads

    try {
      let newFilePath = null;

      // Check if a new file was uploaded
      if (newFile) {
        // Get old file path from the database
        const [response] = await pool
          .promise()
          .query("SELECT filePath FROM invoices WHERE invoiceId = ?", [
            invoiceId,
          ]);

        const oldFilePath = response[0]?.filePath;

        // Delete the old file if it exists
        if (oldFilePath) {
          const fullOldFilePath = path.join(
            __dirname,
            "../invoices",
            oldFilePath
          );

          fs.access(fullOldFilePath, fs.constants.F_OK, (err) => {
            if (!err) {
              fs.unlink(fullOldFilePath, (deleteErr) => {
                if (deleteErr) {
                  console.error("Error deleting old file:", deleteErr);
                } else {
                  console.log("Old file deleted successfully.");
                }
              });
            } else {
              console.log("Old file not found, skipping deletion.");
            }
          });
        }

        // Set the new filePath for the updated invoice
        newFilePath = newFile.filename;
      }

      // Update the invoice fields, including filePath if a new file was uploaded
      await pool.promise().query(
        `UPDATE invoices 
           SET invoiceNumber = ?, 
               title = ?, 
               amount = ?, 
               description = ?, 
               invoicedDate = ?,
               dueDate = ?, 
               invoiceCategory = ?, 
               filePath = COALESCE(?, filePath), 
               fileName = ?, 
               paymentStatus = ? 
           WHERE invoiceId = ?`,
        [
          invoiceNumber,
          title,
          amount,
          description,
          invoicedDate,
          dueDate,
          invoiceCategory,
          newFilePath, // newFilePath is updated only if a new file was uploaded, otherwise the old path is kept
          fileName,
          paymentStatus,
          invoiceId,
        ]
      );

      // Respond with success and file info
      res.status(200).json({
        message: "Invoice updated successfully.",
        file: newFile,
      });
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(500).json({
        message: "Error updating invoice.",
        error,
      });
    }
  }
);

// Get all invoices for a maintenance request
router.get("/get-all-invoices", async (req, res) => {
  try {
    const [results] = await pool.promise().query("SELECT * FROM invoices ");

    res.status(200).json({ success: true, invoices: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
