const Employee = require("../models/Employee");
const payMatrix = require("../config/payMatrix");
const calculateSalary = require("../utils/calculateSalary");

// Get Basic Pay

const getBasicPay = async (req, res) => {

    try {

        const level = Number(req.query.level);
        const cell = Number(req.query.cell);

        const basicPay = payMatrix[level]?.[cell];

        if (!basicPay) {

            return res.status(404).json({
                success: false,
                message: "Invalid Pay Level or Cell"
            });

        }

        res.json({

            success: true,
            basicPay

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Get Salary

const getSalary = async (req, res) => {

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

        const salary = calculateSalary(employee);

        res.json({

            success: true,
            employee,
            salary

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

    getBasicPay,
    getSalary

};