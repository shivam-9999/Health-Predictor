const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HealthPatientSchema = new Schema({
  heart_rate: {
    type: Number,
    required: [true, "Please add a pulse rate"],
  },
  systolic_pressure: {
    type: Number,
    required: [true, "Please add a blood pressure"],
  },
  diastolic_pressure: {
    type: Number,
    required: [true, "Please add a blood pressure"],
  },
  body_temperature: {
    type: Number,
    required: [true, "Please add a temperature"],
  },
  respiratory_rate: {
    type: Number,
    required: [true, "Please add a respiratory rate"],
  },
  weight: {
    type: Number,
    required: [true, "Please add a weight"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
});

module.exports = mongoose.model("HealthPatient", HealthPatientSchema);
