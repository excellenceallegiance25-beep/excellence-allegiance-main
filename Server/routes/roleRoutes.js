const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getAllManagers,
  getManagerTeam,
  getEmployeeProfile,
  updateProfile,
} = require("../controllers/roleController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Admin routes
router.get("/admin/employees", protect, authorize("admin"), getAllEmployees);
router.get("/admin/managers", protect, authorize("admin"), getAllManagers);

// Manager routes
router.get("/manager/team", protect, authorize("manager"), getManagerTeam);

// Employee routes
router.get(
  "/employee/profile",
  protect,
  authorize("employee"),
  getEmployeeProfile
);

// Common route for all roles
router.put("/user/profile", protect, updateProfile);

module.exports = router;
