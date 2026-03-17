const scrapeAmazonProduct = require("./amazonScraper");
const scrapeFlipkartProduct = require("./flipkartScraper");

function getScraper(store) {
  switch (store) {
    case "amazon":
      return scrapeAmazonProduct;
    case "flipkart":
      return scrapeFlipkartProduct;

    default:
      throw new Error("Unsupported store");
  }
}

module.exports = getScraper;
