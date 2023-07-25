const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  moneyCount: {
    type: Number,
    required: true,
  },
  playerPosition: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    z: {
      type: Number,
      required: true,
    },
  },
  answeredQues: {
    type: Number,
    required: true,
  },
  answeredCorrected: {
    type: Number,
    required: true,
  },
  theAccuracy: {
    type: Number,
    required: true,
  },
  assetsCount: {
    type: Number,
    required: true,
  },
  assetsName: {
    type: Array,
    required: true,
  },
  assetsState: {
    type: Array,
    required: true,
  },
  playerEmail: {
    type: String,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model("player", PlayerSchema);
module.exports = Player;
