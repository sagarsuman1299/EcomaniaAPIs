const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json()); // middleware for post req Content-Type: application/json

// initialize DB
require("./initDB")();

app.get('/', (req, res) => {
  res.send('Hello Unity Developers!');
})

const LeaderboardRoute = require("./Routes/Leaderboard.route");
app.use("/api/leaderboard", LeaderboardRoute);

const UserRoute = require("./Routes/User.route");
app.use("/api/user", UserRoute);

// wrong end point error handling
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
