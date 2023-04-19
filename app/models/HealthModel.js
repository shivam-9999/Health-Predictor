const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HealthSchema = new Schema({
  pulseRate: {
    type: Number,
    required: [true, "Please add a pulse rate"],
  },
  bloodPressure: {
    type: Number,
    required: [true, "Please add a blood pressure"],
  },
  weight: {
    type: Number,
    required: [true, "Please add a weight"],
  },
  temperature: {
    type: Number,
    required: [true, "Please add a temperature"],
  },
  respiratoryRate: {
    type: Number,
    required: [true, "Please add a respiratory rate"],
  },
});

module.exports = mongoose.model("Health", HealthSchema);