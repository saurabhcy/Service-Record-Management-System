const express = require("express");

const router = express.Router();

const {
    getBasicPay,
    getSalary
} = require("../controllers/salaryController");

router.get("/basic-pay", getBasicPay);

router.get("/:employeeId", getSalary);

module.exports = router;