const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true, //TODO need to fix causing depricated warning
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
