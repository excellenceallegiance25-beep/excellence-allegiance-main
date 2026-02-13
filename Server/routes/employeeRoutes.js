const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Protected employee routes
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to Employee Dashboard",
    user: req.user,
  });
});

router.get("/admin-only", protect, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin!",
    user: req.user,
  });
});

module.exports = router;
