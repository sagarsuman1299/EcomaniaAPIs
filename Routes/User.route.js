const express = require("express");
``;
const router = express.Router();
const UserController = require("../Controllers/User.controller");

// register user
router.post("/register", UserController.registerUser);

// login a user
router.post("/login", UserController.loginUser);

// get a user detail by id
router.get("/:id", UserController.findUserById);

// update a user detail by id
router.patch("/update/:id", UserController.updateUserById);

module.exports = router;
