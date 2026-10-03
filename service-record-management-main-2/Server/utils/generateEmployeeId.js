const Counter = require("../models/Counter");

const generateEmployeeId = async (billUnit) => {

    // Find the counter for this Bill Unit
    let counter = await Counter.findOne({ billUnit });

    // If Bill Unit is used for the first time
    if (!counter) {

        counter = await Counter.create({
            billUnit,
            sequence: 1
        });

    } else {

        // Increase sequence
        counter.sequence++;

        await counter.save();

    }

    // Convert sequence to 4 digits
    const sequence = String(counter.sequence).padStart(4, "0");

    // Get last 2 digits of current year
    const year = new Date().getFullYear().toString().slice(-2);

    // Employee ID Format
    // Example: 01 + 0001 + 26 = 01000126

    return `${billUnit}${sequence}${year}`;

};

module.exports = generateEmployeeId;