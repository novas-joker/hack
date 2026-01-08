const express = require("express");
const prisma = require("../prismaclient");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * STUDENT submits anonymous complaint
 */
router.post(
  "/submit",
  authenticate,
  authorize(["STUDENT"]),
  async (req, res) => {
    const { category, description } = req.body;

    if (!category || !description) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const complaint = await prisma.complaint.create({
      data: {
        category,
        description,
        // stored internally, never exposed
        studentId: req.user.id,
      },
    });

    res.json({
      complaintId: complaint.id,
      message: "Complaint submitted anonymously",
    });
  }
);

/**
 * STAFF / HOD views complaints
 */
router.get(
  "/all",
  authenticate,
  authorize(["STAFF", "HOD"]),
  async (req, res) => {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        category: true,
        description: true,
        status: true,
        createdAt: true,
      },
    });

    res.json(complaints);
  }
);

/**
 * STAFF / HOD updates complaint status
 */
router.put(
  "/:id/status",
  authenticate,
  authorize(["STAFF", "HOD"]),
  async (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    if (!["OPEN", "IN_REVIEW", "RESOLVED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const complaint = await prisma.complaint.update({
      where: { id },
      data: { status },
    });

    res.json({
      message: "Complaint status updated",
      status: complaint.status,
    });
  }
);

module.exports = router;
