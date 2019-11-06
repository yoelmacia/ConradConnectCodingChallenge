const express = require("express");
const axios = require("axios");
const config = require("../config/config.js");
const router = express.Router();

router.get("/api/star", (req, res) => {
  axios
    .put(
      `https://api.github.com/user/starred/yoelmacia/musicMaker?access_token=${config.token}`
    )
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
