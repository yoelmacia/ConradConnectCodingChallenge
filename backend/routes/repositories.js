const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/api/repo", (req, res) => {
  const data = [];
  const query = req.query.q;
  const url = `https://api.github.com/search/repositories?q=${query}`;
  const getData = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      data.push(json);
      res.send(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  getData(url);
});

module.exports = router;
