const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fetch = require("node-fetch");

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
