const express = require("express");

const router = express.Router();

const {
    createEmployee,
    getAllEmployees,
    searchEmployee,
    getEmployeeById,
    updateEmployee,
    getEmployeeHistory,
    generateNewEmployeeId
} = require("../controllers/employeeController");

// Create Employee
router.post("/create", createEmployee);

router.post("/generate-id", generateNewEmployeeId);

// Get All Employees
router.get("/", getAllEmployees);

// Search Employees
router.get("/search", searchEmployee);

// Get Employee History
router.get("/history/:employeeId", getEmployeeHistory);

// Get Single Employee
router.get("/:employeeId", getEmployeeById);

// Update Employee
router.put("/:employeeId", updateEmployee);



module.exports = router;