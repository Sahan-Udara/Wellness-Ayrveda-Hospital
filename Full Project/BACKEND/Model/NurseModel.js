
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nurseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    appnumber: {
        type: Number,
        required: true,
    },
    rnumber: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    diseases: {
        type: String,
        required: true,
    },
    description: { // Updated field name
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("NurseModel", nurseSchema);

