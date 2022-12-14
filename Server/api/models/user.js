mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
