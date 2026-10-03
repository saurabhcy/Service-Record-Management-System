const Employee = require("../models/Employee");
const generateEmployeeId = require("../utils/generateEmployeeId");
const EmployeeHistory = require("../models/EmployeeHistory");
const payMatrix = require("../config/payMatrix");

// Create New Employee

const createEmployee = async (req, res) => {

    try {

        const data = req.body;

        // Get Basic Pay from Pay Matrix

        const basicPay = payMatrix[data.payLevel]?.[data.payCell];

        if (!basicPay) {

            return res.status(400).json({

                success: false,

                message: "Invalid Pay Level or Pay Cell"

            });

        }

        // Generate Employee ID

        // Generate Employee ID

let employeeId = data.employeeId;

if (!employeeId) {

    employeeId = await generateEmployeeId(data.billUnit);

}

        // Calculate Retirement Date

        const dob = new Date(data.dob);

        const retirementDate = new Date(dob);

        retirementDate.setFullYear(retirementDate.getFullYear() + 60);

        retirementDate.setMonth(retirementDate.getMonth() + 1);

        retirementDate.setDate(0);

        // Create Employee

        const employee = new Employee({

            ...data,

            employeeId,

            basicPay,

            retirementDate

        });

        await employee.save();

        res.status(201).json({

            success: true,

            message: "Employee Added Successfully",

            employee

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Generate Employee ID

const generateNewEmployeeId = async (req, res) => {

    try {

        const { billUnit } = req.body;

        if (!billUnit) {

            return res.status(400).json({

                success: false,
                message: "Bill Unit is required"

            });

        }

        const employeeId = await generateEmployeeId(billUnit);

        res.json({

            success: true,
            employeeId

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Get All Employees

const getAllEmployees = async (req, res) => {

    try {

        const employees = await Employee.find();

        res.status(200).json({

            success: true,

            count: employees.length,

            employees

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Search Employee

const searchEmployee = async (req, res) => {

    try {

        const { type, value } = req.query;

        let query = {};

        if (type === "name") {

            query.employeeName = { $regex: value, $options: "i" };

        }

        else if (type === "employeeId") {

            query.employeeId = value;

        }

        else if (type === "billUnit") {

            query.billUnit = value;

        }

        const employees = await Employee.find(query);

        res.status(200).json({

            success: true,

            count: employees.length,

            employees

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Get Single Employee

const getEmployeeById = async (req, res) => {

    try {

        const employee = await Employee.findOne({

            employeeId: req.params.employeeId

        });

        if (!employee) {

            return res.status(404).json({

                success: false,

                message: "Employee Not Found"

            });

        }

        res.status(200).json({

            success: true,

            employee

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const updateEmployee = async (req, res) => {

    try {

        const employee = await Employee.findOne({
            employeeId: req.params.employeeId
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });
        }

        // Store History

        if (
            req.body.designation &&
            req.body.designation !== employee.designation
        ) {

            await EmployeeHistory.create({

                employeeId: employee.employeeId,

                fieldChanged: "Designation",

                oldValue: employee.designation,

                newValue: req.body.designation,

                reason: "Promotion"

            });

        }

        if (
            req.body.billUnit &&
            req.body.billUnit !== employee.billUnit
        ) {

            await EmployeeHistory.create({

                employeeId: employee.employeeId,

                fieldChanged: "Bill Unit",

                oldValue: employee.billUnit,

                newValue: req.body.billUnit,

                reason: "Transfer"

            });

        }

        if (
            req.body.status &&
            req.body.status !== employee.status
        ) {

            await EmployeeHistory.create({

                employeeId: employee.employeeId,

                fieldChanged: "Status",

                oldValue: employee.status,

                newValue: req.body.status,

                reason: "Status Updated"

            });

        }

      Object.assign(employee, req.body);

// Recalculate Basic Pay if Pay Level or Cell changes

if (req.body.payLevel || req.body.payCell) {

    employee.basicPay =
        payMatrix[employee.payLevel][employee.payCell];

}

        await employee.save();

        res.status(200).json({

            success: true,

            message: "Employee Updated Successfully",

            employee

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Get Employee History

const getEmployeeHistory = async (req, res) => {

    try {

        const history = await EmployeeHistory.find({

            employeeId: req.params.employeeId

        }).sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: history.length,

            history

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createEmployee,
    generateNewEmployeeId,
    getAllEmployees,
    searchEmployee,
    getEmployeeById,
    updateEmployee,
    getEmployeeHistory

};