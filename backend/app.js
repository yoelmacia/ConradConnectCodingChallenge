const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");

const github = require("./routes/github.js");
const bookmarks = require("./routes/bookmarks.js");
const repositories = require("./routes/repositories.js");
const user = require("./routes/user.js");
const star = require("./routes/star.js");
const unstar = require("./routes/unstar.js");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(github);
app.use(bookmarks);
app.use(repositories);
app.use(user);
app.use(star);
app.use(unstar);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", bookmarks);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
