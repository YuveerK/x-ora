const pool = require("../db/db.config");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const [user] = await pool
      .promise()
      .query("SELECT * FROM Users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userRecord = user[0];

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, userRecord.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If the password matches, return a success response
    res.status(200).json({ message: "Login successful", user: userRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post("/create-user", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    role,
    profile_picture,
  } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await pool
      .promise()
      .query("SELECT * FROM Users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert the new user
    const [result] = await pool
      .promise()
      .query(
        "INSERT INTO Users (first_name, last_name, email, password_hash, phone_number, role, profile_picture) VALUES (?, ?, ?, ?, ?, ?,?)",
        [first_name, last_name, email, password_hash, phone_number, role, ""]
      );

    res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/users", (req, res) => {
  pool.query("SELECT * FROM Users", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
});

// Get a single user by ID
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Users WHERE user_id = ?",
    [id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(results[0]);
    }
  );
});

// Update a user by ID
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number, role, profile_picture } =
    req.body;
  pool.query(
    "UPDATE Users SET first_name = ?, last_name = ?, email = ?, phone_number = ?, role = ?, profile_picture = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?",
    [first_name, last_name, email, phone_number, role, profile_picture, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  );
});

// Delete a user by ID
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Users WHERE user_id = ?", [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
});

// Forgot Password route (to set a new password)
router.post("/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if the user exists by email
    const [user] = await pool
      .promise()
      .query("SELECT * FROM Users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(400).json({ message: "No user with this email found" });
    }

    // Hash the new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    await pool
      .promise()
      .query(
        "UPDATE Users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?",
        [passwordHash, email]
      );

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
