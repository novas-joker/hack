const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../prismaclient");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "6h" }
  );

  res.json({
    token,
    role: user.role,
    name: user.name,
  });
});

module.exports = router;
