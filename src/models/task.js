const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  resume: String,
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
