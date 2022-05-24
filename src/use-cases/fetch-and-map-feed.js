const getRSSFeed = require("../utilities/rss-parser");

const fetchAndFilterFeed = async (url) => {
  try {
    const feedData = await getRSSFeed(url);
    console.log({ ...feedData, items: feedData.items.slice(0, 5) });
    return { ...feedData, items: feedData.items.slice(0, 10) };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = fetchAndFilterFeed;
