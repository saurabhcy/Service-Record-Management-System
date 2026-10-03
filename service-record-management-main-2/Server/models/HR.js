const mongoose = require("mongoose");

const hrSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "HR"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("HR", hrSchema);