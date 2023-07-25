const express = require("express");
``;
const router = express.Router();
const PlayerController = require("../Controllers/Player.controller");

// find list of all players
router.get("/", PlayerController.getAllPlayers);

// post a player
router.post("/", PlayerController.postAPlayer);

// get a player by id
router.get("/:id", PlayerController.findPlayerById);

// update a player by id
router.patch("/:id", PlayerController.updatePlayerById);

// delete the player by id
router.delete("/:id", PlayerController.deletePlayerById);
module.exports = router;
