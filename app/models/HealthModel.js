const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HealthSchema = new Schema({
  pulseRate: {
    type: String,
    required: [true, "Please add a pulse rate"],
  },
  bloodPressure: {
    type: String,
    required: [true, "Please add a blood pressure"],
  },
  weight: {
    type: String,
    required: [true, "Please add a weight"],
  },
  temperature: {
    type: String,
    required: [true, "Please add a temperature"],
  },
  respiratoryRate: {
    type: String,
    required: [true, "Please add a respiratory rate"],
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
