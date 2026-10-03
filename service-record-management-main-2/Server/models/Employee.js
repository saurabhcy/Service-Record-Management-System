const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    // Employee Information
    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    employeeName: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    dob: {
        type: Date,
        required: true
    },

    dateOfJoining: {
        type: Date,
        required: true
    },

    employeeType: {
        type: String,
        enum: ["PF", "NPS"],
        required: true
    },

    // Personal Details
    panNumber: {
        type: String,
        required: true,
        unique: true
    },

    aadhaarNumber: {
        type: String,
        required: true,
        unique: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    // Service Details
    designation: {
        type: String,
        required: true
    },

    designationCode: {
        type: String,
        required: true
    },

    billUnit: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Active",
            "Transferred",
            "Retired",
            "Suspended",
            "Resigned"
        ],
        default: "Active"
    },

    retirementDate: {
        type: Date
    },

    // Pay Matrix Details

payLevel: {
    type: Number,
    required: true
},

payCell: {
    type: Number,
    required: true
},

basicPay: {
    type: Number,
    required: true
},

    // Bank Details
    bankName: {
        type: String
    },

    accountNumber: {
        type: String
    },

    ifscCode: {
        type: String
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Employee", employeeSchema);