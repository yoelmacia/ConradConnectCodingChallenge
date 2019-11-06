const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

const github = require("./routes/github.js");
const bookmarks = require("./routes/bookmarks.js");
const repositories = require("./routes/repositories.js");
const user = require("./routes/user.js");
const star = require("./routes/star.js");

app.use(github);
app.use(bookmarks);
app.use(repositories);
app.use(user);
app.use(star);

app.get("/authorize", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
