const fetchAndCustomizeRssFeed = require("../use-cases/fetch-and-map-feed");
const request = require("supertest");
const app = require("../index");
const validUrl = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss";
const invalidUrl = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rs";

describe("Fetching RSS Feeds", () => {
  it("Return a payload with title,description and 10 episodes", async () => {
    const result = await fetchAndCustomizeRssFeed(validUrl);
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("episodes");

    expect(result.episodes).toHaveLength(10);
  });
  it("The episodes need to have a title, audioUrl and publishdate property", async () => {
    const result = await fetchAndCustomizeRssFeed(validUrl);

    result.episodes.forEach((episode) => {
      expect(episode).toHaveProperty("title");
      expect(episode).toHaveProperty("audioUrl");
      expect(episode).toHaveProperty("publishDate");
    });
  });
  it("Throws an error if invalid url provided", async () => {
    try {
      const result = await fetchAndCustomizeRssFeed(invalidUrl);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe("Failed to fetch feed");
    }
  });

  it("Should be sorted", async () => {});
});

describe("API TESTS", () => {
  it("Should throw an error if incorrect query params provided", async () => {
    const response = await request(app).get("/sort?order=aschg");
    expect(response.status).toBe(500);
  });
  it("Should give a 200 if correct query params provided", async () => {
    const response = await request(app).get("/sort?order=asc");
    expect(response.status).toBe(200);
    const response2 = await request(app).get("/sort?order=desc");
    expect(response2.status).toBe(200);
  });
});
