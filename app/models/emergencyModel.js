const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmergencySchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  concern: {
    type: String,
    required: [true, "Please add a concern"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Emergency", EmergencySchema);
