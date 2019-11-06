const express = require("express");
const axios = require("axios");
const config = require("../config/config.js");
const router = express.Router();

router.get("/api/bookmarks", (req, res) => {
  axios
    .get("https://api.github.com/users/yoelmacia/starred", {
      headers: {
        Authorization: `token ${config.token}`,
        Accept: "application / vnd.github.v3.star + json"
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
