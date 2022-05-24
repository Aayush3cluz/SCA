const getRSSFeed = require("../utilities/rss-parser");
const {
  convertISODateToAEST,
} = require("../utilities/format-iso-date-to-AEST");
const CustomError = require("../errors/custom-error");
const fetchAndCustomizeRssFeed = async (url, sort = false, order = "asc") => {
  try {
    let feedData = await getRSSFeed(url);

    let episodes = feedData.items.slice(0, 10);

    if (sort) {
      console.log(order);
      episodes = episodes.sort((a, b) => {
        return order === "asc"
          ? new Date(a.pubDate) - new Date(b.pubDate)
          : new Date(b.pubDate) - new Date(a.pubDate);
      });
    }

    episodes = episodes.map((item) => {
      return {
        title: item.title,
        audioUrl: item.enclosure.url,
        publishDate: convertISODateToAEST(item.pubDate),
      };
    });

    return {
      title: feedData.title,
      description: feedData.description,
      episodes,
    };
  } catch (error) {
    console.log(error);
    throw new CustomError("Failed to fetch feed");
  }
};

module.exports = fetchAndCustomizeRssFeed;
