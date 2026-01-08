const express = require("express");
const prisma = require("../prismaclient");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * STUDENT DASHBOARD
 */
router.get(
  "/student",
  authenticate,
  authorize(["STUDENT"]),
  async (req, res) => {
    const studentId = req.user.id;

    const attendance = await prisma.attendance.findMany({
      where: { studentId },
    });

    const marks = await prisma.marks.findMany({
      where: { studentId },
      include: { subject: true },
    });

    const totalClasses = attendance.length;
    const attended = attendance.filter(a =>
      ["PRESENT", "OD"].includes(a.status)
    ).length;

    const attendancePercent =
      totalClasses === 0 ? 0 : Math.round((attended / totalClasses) * 100);

    const avgInternal =
      marks.length === 0
        ? 0
        : Math.round(
            marks.reduce((s, m) => s + m.internalTotal, 0) / marks.length
          );

    res.json({
      attendancePercent,
      avgInternal,
      subjects: marks.map(m => ({
        subject: m.subject.name,
        internal: m.internalTotal,
      })),
    });
  }
);

/**
 * STAFF DASHBOARD – AT RISK STUDENTS
 */
router.get(
  "/staff",
  authenticate,
  authorize(["STAFF"]),
  async (req, res) => {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        marks: true,
        attendances: true,
      },
    });

    const atRisk = students
      .map(s => {
        const total = s.attendances.length;
        const present = s.attendances.filter(a =>
          ["PRESENT", "OD"].includes(a.status)
        ).length;

        const attendancePercent =
          total === 0 ? 0 : (present / total) * 100;

        const avgInternal =
          s.marks.length === 0
            ? 0
            : s.marks.reduce((sum, m) => sum + m.internalTotal, 0) /
              s.marks.length;

        if (attendancePercent < 75 || avgInternal < 40) {
          return {
            studentId: s.id,
            name: s.name,
            attendancePercent: Math.round(attendancePercent),
            avgInternal: Math.round(avgInternal),
          };
        }
        return null;
      })
      .filter(Boolean);

    res.json(atRisk);
  }
);

/**
 * HOD DASHBOARD – DEPARTMENT OVERVIEW
 */
router.get(
  "/hod",
  authenticate,
  authorize(["HOD"]),
  async (req, res) => {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: { marks: true },
    });

    const avgDepartmentInternal =
      students.length === 0
        ? 0
        : Math.round(
            students.reduce(
              (sum, s) =>
                sum +
                (s.marks.length === 0
                  ? 0
                  : s.marks.reduce((a, m) => a + m.internalTotal, 0) /
                    s.marks.length),
              0
            ) / students.length
          );

    const failingStudents = students.filter(
      s =>
        s.marks.length &&
        s.marks.reduce((a, m) => a + m.internalTotal, 0) /
          s.marks.length <
          40
    ).length;

    res.json({
      totalStudents: students.length,
      avgDepartmentInternal,
      failingStudents,
    });
  }
);

module.exports = router;
