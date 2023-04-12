// Load the module dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var StudentSchema = new Schema({
  studentNo: {
    type: String,
    required: true,
    unique: [true, "Student number must be unique"],
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  program: {
    type: String,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

// Set the 'fullname' virtual property
StudentSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model("Student", StudentSchema);
