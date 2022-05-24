const express = require("express");
const getRSSFeed = require("./utilities/rss-parser");
const errorHandler = require("./middlewares/error-handler");
const {
  fetchAndFilterFeed,
  fetchAndFilterFeedWithSort,
} = require("./use-cases/fetch-and-map-feed");
const validateQueryParams = require("./middlewares/validate-query-params");

require("express-async-errors");

const app = express();
const port = 3000;
const RSSURL = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss";

app.get("/", async (req, res) => {
  const feed = await fetchAndFilterFeed(RSSURL);

  res.send(feed);
});
app.get("/sort", validateQueryParams, async (req, res) => {
  const order = req.query.order;

  const feed = await fetchAndFilterFeedWithSort(RSSURL, order);

  res.send(feed);
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
