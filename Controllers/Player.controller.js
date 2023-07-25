const createError = require("http-errors");
const mongoose = require("mongoose");
const Player = require("../Models/Player.model");

module.exports = {
  getAllPlayers: async (req, res, next) => {
    try {
      const results = await Player.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  postAPlayer: async (req, res, next) => {
    try {
      const { playerEmail } = req.body;
      
         // Check if playerEmail contains "@"
    if (!playerEmail.includes("@")) {
      return res.status(400).send("Invalid playerEmail");
    }

      // Delete previous data with the same playerEmail
      await Player.deleteMany({ playerEmail });
  
      const player = new Player(req.body);
      const result = await player.save(); 
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        return next(createError(422, error.message));
      }
      next(error);
    }
  },
  

  findPlayerById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const player = await Player.findById(id);
      if (!player) {
        throw createError(404, "Player does not exists");
      }
      res.send(player);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Product id"));
      }
      next(error);
    }
  },

  updatePlayerById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const options = { new: true };

      const result = await Player.findByIdAndUpdate(id, update, options);
      if (!result) {
        throw createError(404, "Product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Product id"));
      } else {
        next(error);
      }
    }
  },

  deletePlayerById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Player.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Player donot exists");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product id"));
        return;
      }
      next(error);
    }
  },
};
