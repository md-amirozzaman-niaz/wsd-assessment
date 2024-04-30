const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const middleware = require("./middleware");
const route = require("./api/route");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.json({
    message: "Auth-service: 🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use(`/api/${process.env.API_VERSION}`, route);

app.use(middleware.notFound);
app.use(middleware.errorHandler);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
module.exports = app;
