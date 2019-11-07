const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("../config/config.js");
const path = require("path");

router.get("/user/signin/callback", (req, res) => {
  // GET THE CODE FROM THE AUTHORIZE URL

  const { query } = req;
  const { code } = query;
  if (!code) {
    return res.send({
      success: "false",
      message: "Error, no code"
    });
  }

  // POST FOR OBTAIN THE ACCESS_TOKEN

  axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: "723d03ab329e99ca2336",
      client_secret: "71d87b524bb9274cb6899c5996496bee0e2567d7",
      code,
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      const data = response.data;
      config.token = data.split("&")[0].split("=")[1];
      res.redirect("http://localhost:3001/search");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
