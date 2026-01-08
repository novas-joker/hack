const express = require("express");
const prisma = require("../prismaclient");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * STAFF marks attendance
 */
router.post(
  "/mark",
  authenticate,
  authorize(["STAFF"]),
  async (req, res) => {
    const { studentId, subjectId, status } = req.body;

    if (!studentId || !subjectId || !status) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const attendance = await prisma.attendance.create({
      data: {
        studentId,
        subjectId,
        status,
        date: new Date(),
      },
    });

    res.json(attendance);
  }
);

/**
 * STUDENT views own attendance
 */
router.get(
  "/me",
  authenticate,
  authorize(["STUDENT"]),
  async (req, res) => {
    const records = await prisma.attendance.findMany({
      where: {
        studentId: req.user.id,
      },
      include: {
        subject: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json(records);
  }
);

module.exports = router;
