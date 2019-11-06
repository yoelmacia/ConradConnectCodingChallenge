const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("../config/config.js");

router.get("/api/user", (req, res) => {
  axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${config.token}`
      }
    })
    .then(response => {
      const data = response.data;
      res.send(data);
    })
    .catch(error => {
      console.log("adios");
      console.log(error);
    });
});

module.exports = router;
