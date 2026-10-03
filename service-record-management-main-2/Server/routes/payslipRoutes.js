const express = require("express");

const router = express.Router();

const {

    generatePayslip

} = require("../controllers/payslipController");

router.get("/:employeeId", generatePayslip);

module.exports = router;