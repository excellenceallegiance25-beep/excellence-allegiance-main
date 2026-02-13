const User = require("../models/User");

// @desc    Get all employees (Admin only)
// @route   GET /api/admin/employees
// @access  Private/Admin
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");

    res.json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all managers (Admin only)
// @route   GET /api/admin/managers
// @access  Private/Admin
exports.getAllManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" }).select("-password");

    res.json({
      success: true,
      count: managers.length,
      data: managers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get manager's team (Manager only)
// @route   GET /api/manager/team
// @access  Private/Manager
exports.getManagerTeam = async (req, res) => {
  try {
    const manager = req.user;

    // Assuming employees in same department report to manager
    const team = await User.find({
      department: manager.department,
      role: "employee",
    }).select("-password");

    res.json({
      success: true,
      manager: {
        name: manager.name,
        department: manager.department,
      },
      count: team.length,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get employee details (Employee only)
// @route   GET /api/employee/profile
// @access  Private/Employee
exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, department, position } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        department,
        position,
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
