const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TipSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  content: {
    type: String,
    required: [true, "Please add a content"],
  },
});

module.exports = mongoose.model("Tip", TipSchema);
