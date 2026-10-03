
const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/database");
const employeeRoutes = require("./routes/employeeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const salaryRoutes = require("./routes/salaryRoutes");
const payslipRoutes = require("./routes/payslipRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

connectDB();
app.use(express.json());

app.use("/employee", employeeRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/salary", salaryRoutes);
app.use("/payslip", payslipRoutes);
app.use("/auth", authRoutes);
// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/hr-dashboard.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});