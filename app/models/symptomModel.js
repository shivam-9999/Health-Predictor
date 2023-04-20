const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SymptomSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  fever: {
    type: Boolean,
    required: [true, "Please add a fever"],
  },
  cough: {
    type: Boolean,
    required: [true, "Please add a cough"],
  },
  breathing_difficulty: {
    type: Boolean,
    required: [true, "Please add a breathing difficulty"],
  },
  headache: {
    type: Boolean,
    required: [true, "Please add a headache"],
  },
  sore_throat: {
    type: Boolean,
    required: [true, "Please add a sore throat"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Symptom", SymptomSchema);
