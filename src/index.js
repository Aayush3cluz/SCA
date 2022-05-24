const express = require("express");
const fetchAndFilterFeed = require("./use-cases/fetch-and-map-feed");
const getRSSFeed = require("./utilities/rss-parser");
const errorHandler = require("./middlewares/error-handler");

require("express-async-errors");

const app = express();
const port = 3000;
const RSSURL = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss";

app.get("/", async (req, res) => {
  const feed = await fetchAndFilterFeed(RSSURL);

  res.send(feed);
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
