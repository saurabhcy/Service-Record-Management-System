const Employee = require("../models/Employee");

const getDashboardStats = async (req, res) => {

    try {

        const totalEmployees = await Employee.countDocuments();

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const newJoinings = await Employee.countDocuments({

            dateOfJoining: {

                $gte: new Date(currentYear, currentMonth, 1),

                $lte: new Date(currentYear, currentMonth + 1, 0)

            }

        });

        res.status(200).json({

            success: true,

            totalEmployees,

            newJoinings,

            pendingLeaves: 0,

            promotions: 0

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

    getDashboardStats

};