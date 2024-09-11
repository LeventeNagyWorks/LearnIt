const mongoose = require('mongoose');

const MUser = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", MUser);