const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");
const auth = require("../middleware/auth");

// All routes require authentication and manager role
router.use(auth(["manager", "admin"])); // Admin can also access manager routes

router.get("/requests/pending", managerController.getPendingRequests);
router.put(
  "/requests/:requestId/status",
  managerController.updateRequestStatus
);
router.get("/team-members", managerController.getTeamMembers);
router.get("/team-leave-calendar", managerController.getTeamLeaveCalendar);

module.exports = router;
