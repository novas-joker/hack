const express = require("express");
const prisma = require("../prismaclient");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * STAFF enters CAT marks
 */
router.post(
  "/update",
  authenticate,
  authorize(["STAFF"]),
  async (req, res) => {
    const { studentId, subjectId, cat1, cat2 } = req.body;

    if (!studentId || !subjectId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Calculate attendance percentage
    const total = await prisma.attendance.count({
      where: { studentId, subjectId },
    });

    const present = await prisma.attendance.count({
      where: {
        studentId,
        subjectId,
        status: { in: ["PRESENT", "OD"] },
      },
    });

    const attendancePercent = total === 0 ? 0 : (present / total) * 100;
    const attendanceScore = Math.round((attendancePercent / 100) * 20);

    const internalTotal =
      attendanceScore +
      (cat1 ? Math.round((cat1 / 100) * 40) : 0) +
      (cat2 ? Math.round((cat2 / 100) * 40) : 0);

    const marks = await prisma.marks.upsert({
      where: {
        studentId_subjectId: { studentId, subjectId },
      },
      update: {
        cat1,
        cat2,
        attendanceScore,
        internalTotal,
      },
      create: {
        studentId,
        subjectId,
        cat1,
        cat2,
        attendanceScore,
        internalTotal,
      },
    });

    res.json(marks);
  }
);

/**
 * STUDENT views own marks
 */
router.get(
  "/me",
  authenticate,
  authorize(["STUDENT"]),
  async (req, res) => {
    const marks = await prisma.marks.findMany({
      where: { studentId: req.user.id },
      include: { subject: true },
    });

    res.json(marks);
  }
);

module.exports = router;
