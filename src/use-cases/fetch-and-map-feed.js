const getRSSFeed = require("../utilities/rss-parser");

const fetchAndFilterFeed = async (url) => {
  try {
    const feedData = await getRSSFeed(url);

    const episodes = feedData.items
      .map((item) => {
        return {
          title: item.title,
          audioUrl: item.enclosure.url,
          publishDate: item.pubDate,
        };
      })
      .slice(0, 10);

    return {
      title: feedData.title,
      description: feedData.description,
      episodes,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch feed");
  }
};
const fetchAndFilterFeedWithSort = async (url, order = "asc") => {
  console.log(order);
  try {
    const feedData = await getRSSFeed(url);

    const episodes = feedData.items
      .map((item) => {
        return {
          title: item.title,
          audioUrl: item.enclosure.url,
          publishDate: item.pubDate,
        };
      })
      .slice(0, 10)
      .sort((a, b) => {
        return order === "asc"
          ? new Date(a.publishDate) - new Date(b.publishDate)
          : new Date(b.publishDate) - new Date(a.publishDate);
      });

    return {
      title: feedData.title,
      description: feedData.description,
      episodes,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch feed");
  }
};

module.exports = { fetchAndFilterFeed, fetchAndFilterFeedWithSort };
