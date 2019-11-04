const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fetch = require("node-fetch");
const path = require("path");
const axios = require("axios");

const ACCESS_TOKEN = "";

app.get("/api/repo", (req, res) => {
  const data = [];
  const url = "https://api.github.com/search/repositories?q=tetris";
  const getData = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      data.push(json);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  getData(url);
});

app.get("/authorize", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/user/signin/callback", (req, res) => {
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
      this.ACCESS_TOKEN = data.split("&")[0].split("=")[1];
      res.send(data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
