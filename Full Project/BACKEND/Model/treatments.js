const mongoose = require('mongoose');

// You need to get the Schema object from mongoose
//const Schema = mongoose.Schema;

// Now you can use Schema to create a new schema
const treatmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    benefit: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

// Create a model using the schema
const Treatments = mongoose.model('Treatment', treatmentsSchema);

module.exports = Treatments;
