const HR = require("../models/HR");

const login = async (req, res) => {

    try {

        const { username, password, role } = req.body;

        // Employee login (later)

        if (role === "Employee") {

            return res.status(200).json({

                success: false,

                message: "Employee Portal Coming Soon"

            });

        }

        // HR Login

        const hr = await HR.findOne({ username });

        if (!hr) {

            return res.status(401).json({

                success: false,

                message: "Invalid Username"

            });

        }

        if (hr.password !== password) {

            return res.status(401).json({

                success: false,

                message: "Invalid Password"

            });

        }

        res.status(200).json({

            success: true,

            message: "Login Successful",

            hr: {

                name: hr.name,

                username: hr.username,

                role: hr.role

            }

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

    login

};