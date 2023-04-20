const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HealthSchema = new Schema({
  heart_rate: {
    type: String,
    required: [true, "Please add a pulse rate"],
  },
  systolic_pressure: {
    type: String,
    required: [true, "Please add a blood pressure"],
  },
  diastolic_pressure: {
    type: String,
    required: [true, "Please add a blood pressure"],
  },
  
  body_temperature: {
    type: String,
    required: [true, "Please add a temperature"],
  },
  respiratory_rate: {
    type: String,
    required: [true, "Please add a respiratory rate"],
  },
  weight: {
    type: String,
    required: [true, "Please add a weight"],
  },
  commonSymptoms: [
    {
      type: String,
      enum: [
        "Fever",
        "Cough",
        "Shortness of breath",
        "Fatigue",
        "Body aches",
        "Loss of taste or smell",
        "Sore throat",
        "Headache",
        "Runny or stuffy nose",
        "Nausea or vomiting",
        "Diarrhea",
      ],
    },
  ],
  emergencyAlert: {
    type: String,
  },
});

module.exports = mongoose.model("Health", HealthSchema);