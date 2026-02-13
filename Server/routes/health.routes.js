import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

export default router;
