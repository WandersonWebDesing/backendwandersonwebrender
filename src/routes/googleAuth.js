const express = require("express");
const router = express.Router();

const oAuth2Client = require("../config/google");

router.get("/", (req, res) => {
  res.send("Google Auth OK");
});

module.exports = router;