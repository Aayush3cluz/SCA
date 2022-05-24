const getRSSFeed = require("../utilities/rss-parser");

const fetchAndCustomizeRssFeed = async (url, sort = false, order = "asc") => {
  try {
    let feedData = await getRSSFeed(url);

    let episodes = feedData.items.slice(0, 10).map((item) => {
      return {
        title: item.title,
        audioUrl: item.enclosure.url,
        publishDate: item.pubDate,
      };
    });

    if (sort) {
      episodes = episodes.sort((a, b) => {
        return order === "asc"
          ? new Date(a.publishDate) - new Date(b.publishDate)
          : new Date(b.publishDate) - new Date(a.publishDate);
      });
    }

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

module.exports = fetchAndCustomizeRssFeed;
