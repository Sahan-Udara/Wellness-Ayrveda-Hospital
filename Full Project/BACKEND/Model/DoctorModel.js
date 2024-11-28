const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Use uppercase 'S' for Schema



const doctorSchema = new Schema({
    name: {
        type: String, // data type
        required: true, // validation
    },
    gmail: {
        type: String, // data type
        required: true, // validation
    },
    phone: {
        type: Number, // data type
        required: true, // validation
    },
    Gender: {
      type: String, // data type
      required: true, // validation
    },
    age: {
      type: Number, // data type
      required: true, // validation
    },
    Specialiation: {
      type: String, // data type
      required: true, // validation
    },
    Qualification: {
      type: String, // data type
      required: true, // validation
    },
    Experience: {
      type: String, // data type
      required: true, // validation
    },
    About: {
      type: String, // data type
      required: true, // validation
  }
  

});

module.exports = mongoose.model(
    "DoctorModel", // collection name
    doctorSchema // schema name
);