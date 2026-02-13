const Request = require("../models/Request");
const User = require("../models/User");

// Get requests pending with manager
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      pendingWith: req.user._id,
      status: "Pending",
    })
      .populate("user", "username employeeId department position")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, comment } = req.body;

    const request = await Request.findOne({
      requestId,
      pendingWith: req.user._id,
    });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    request.status = status;

    // Add comment if provided
    if (comment) {
      request.comments.push({
        user: req.user._id,
        comment,
      });
    }

    // If approved and it's a leave request, update leave balance
    if (
      status === "Approved" &&
      (request.requestType === "Leave" ||
        request.requestType === "Leave and Travel")
    ) {
      const diffTime = Math.abs(request.endDate - request.startDate);
      const leaveDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      await User.findByIdAndUpdate(request.user, {
        $inc: { availedLeaves: leaveDays },
      });
    }

    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get team members
exports.getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await User.find({
      manager: req.user._id,
      isActive: true,
    }).select("-password");

    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get team leave calendar
exports.getTeamLeaveCalendar = async (req, res) => {
  try {
    const teamMembers = await User.find({
      manager: req.user._id,
    }).select("_id username");

    const memberIds = teamMembers.map((member) => member._id);

    const leaveRequests = await Request.find({
      user: { $in: memberIds },
      requestType: { $in: ["Leave", "Leave and Travel"] },
      status: "Approved",
    }).populate("user", "username");

    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
