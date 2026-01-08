require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const attendanceRoutes = require("./routes/attendance");
const odRoutes = require("./routes/od");
const app = express();
const marksRoutes = require("./routes/marks");
const dashboardRoutes = require("./routes/dashboard");
const complaintRoutes = require("./routes/complaint");


app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/od", odRoutes);
app.use("/marks", marksRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/complaint", complaintRoutes);
app.get("/", (req, res) => {
  res.send("AMS backend alive");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
