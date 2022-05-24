const getRSSFeed = require("../utilities/rss-parser");

const fetchAndFilterFeed = async (url) => {
  try {
    const feedData = await getRSSFeed(url);

    const mappedEpisodes = feedData.items
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
      episodes: mappedEpisodes,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch feed");
  }
};

module.exports = fetchAndFilterFeed;
