const express = require("express");
const getRSSFeed = require("./utilities/rss-parser");
const errorHandler = require("./middlewares/error-handler");
const fetchAndCustomizeRssFeed = require("./use-cases/fetch-and-map-feed");
const validateQueryParams = require("./middlewares/validate-query-params");

require("express-async-errors");

const app = express();
const port = 3000;
const RSSURL = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss";

app.get("/", async (req, res) => {
  const feed = await fetchAndCustomizeRssFeed(RSSURL);

  res.send(feed);
});
app.get("/sort", validateQueryParams, async (req, res) => {
  const order = req.query.order;

  const feed = await fetchAndCustomizeRssFeed(RSSURL, 1, order);

  res.send(feed);
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;
