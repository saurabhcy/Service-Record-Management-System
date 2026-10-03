const mongoose = require("mongoose");

const employeeHistorySchema = new mongoose.Schema({

    employeeId: {
        type: String,
        required: true
    },

    fieldChanged: {
        type: String,
        required: true
    },

    oldValue: {
        type: String
    },

    newValue: {
        type: String
    },

    reason: {
        type: String,
        default: "Updated"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("EmployeeHistory", employeeHistorySchema);