const express = require("express");
const axios = require("axios");
const config = require("../config/config.js");
const router = express.Router();

router.get("/api/unstar", (req, res) => {
  const user = req.query.user;
  const repo = req.query.repo;
  axios
    .delete(
      `https://api.github.com/user/starred/${user}/${repo}?access_token=${config.token}`
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
