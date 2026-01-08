const express = require("express");
const prisma = require("../prismaclient");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * STUDENT applies for OD
 */
router.post(
  "/apply",
  authenticate,
  authorize(["STUDENT"]),
  async (req, res) => {
    const { fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const od = await prisma.oDRequest.create({
      data: {
        studentId: req.user.id,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        reason,
      },
    });

    res.json(od);
  }
);

/**
 * STAFF views pending OD requests
 */
router.get(
  "/pending",
  authenticate,
  authorize(["STAFF"]),
  async (req, res) => {
    const ods = await prisma.oDRequest.findMany({
      where: { status: "PENDING" },
      include: {
        student: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(ods);
  }
);

/**
 * STAFF approves OD (OVERRIDES ATTENDANCE)
 */
router.put(
  "/:id/approve",
  authenticate,
  authorize(["STAFF"]),
  async (req, res) => {
    const id = parseInt(req.params.id);

    const od = await prisma.oDRequest.findUnique({ where: { id } });
    if (!od || od.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: "Invalid or already processed OD" });
    }

    // Mark OD as approved
    await prisma.oDRequest.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    const from = new Date(od.fromDate);
    const to = new Date(od.toDate);

    // OVERRIDE attendance for each day
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      await prisma.attendance.upsert({
        where: {
          studentId_subjectId_date: {
            studentId: od.studentId,
            subjectId: 1, // demo subject (acceptable for hackathon)
            date: new Date(d),
          },
        },
        update: {
          status: "OD",
        },
        create: {
          studentId: od.studentId,
          subjectId: 1,
          status: "OD",
          date: new Date(d),
        },
      });
    }

    res.json({ message: "OD approved and attendance overridden" });
  }
);

/**
 * STAFF rejects OD
 */
router.put(
  "/:id/reject",
  authenticate,
  authorize(["STAFF"]),
  async (req, res) => {
    const id = parseInt(req.params.id);

    const od = await prisma.oDRequest.findUnique({ where: { id } });
    if (!od || od.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: "Invalid or already processed OD" });
    }

    await prisma.oDRequest.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    res.json({ message: "OD rejected" });
  }
);

module.exports = router;
