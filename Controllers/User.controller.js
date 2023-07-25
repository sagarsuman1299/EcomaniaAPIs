const bcrypt = require("bcrypt");
_ = require("lodash");
const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User.model");

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      let userDuplication = await User.findOne({ email: req.body.email });
      if (userDuplication) {
        return res.status(400).send("User already registered.");
      }

      const user = new User(req.body);

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const result = await user.save();
      res.send(_.pick(result, ["_id", "name", "email"]));
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        return next(createError(422, error.message));
      }
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      let userDuplication = await User.findOne({ email: req.body.email });
      if (!userDuplication) {
        return res.status(400).send("User does not exists.");
      }
      //
      const validPassword = await bcrypt.compare(
        req.body.password,
        userDuplication.password
      );
      if (!validPassword) {
        return res.status(400).send("Invalid Email or Password");
      }
      res.send(userDuplication.id);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        return next(createError(422, error.message));
      }
      next(error);
    }
  },
  findUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        throw createError(404, "User donot exists");
      }
      res.send(_.pick(user, ["name", "email"]));
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid User id"));
      }
      next(error);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const options = { new: true };

      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);

      const result = await User.findByIdAndUpdate(id, update, options);
      if (!result) {
        throw createError(404, "User does not exist");
      }
      res.send("success");
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid User id"));
      } else {
        next(error);
      }
    }
  },
};
