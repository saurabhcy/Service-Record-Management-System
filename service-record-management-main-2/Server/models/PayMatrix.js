const mongoose = require("mongoose");

const payMatrixSchema = new mongoose.Schema({

    payLevel: {
        type: Number,
        required: true
    },

    cell: {
        type: Number,
        required: true
    },

    basicPay: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model("PayMatrix", payMatrixSchema);