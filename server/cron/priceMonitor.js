const cron = require("node-cron");
const puppeteer = require("puppeteer");
const productModel = require("../models/product.model");
const getScraper = require("../scrapers/scraperFactory");
const checkPriceDrop = require("../utils/priceChecker");
const parsePrice = require("../utils/parsePrice");

const monitorPrices = () => {
  cron.schedule("0 */6 * * *", async () => {
    console.log("Running price monitor job...");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const products = await productModel.find();

      for (const product of products) {
        try {
          if (!product.productURL) continue;

          const page = await browser.newPage();

          const scraper = getScraper(product.store);

          const scrapedData = await scraper(page, product.productURL);

          const newPrice = parsePrice(scrapedData.price);
          if (newPrice === null) {
            console.log(`Price parse failed for ${product.title}, skipping`);
            await page.close();
            continue;
          }

          const oldPrice = parsePrice(product.price) || 0;

          const result = checkPriceDrop(oldPrice, newPrice);

          if (newPrice !== oldPrice) {
            console.log(`Price changed for ${product.title}`);
            product.price = newPrice;

            product.priceHistory.push({
              price: newPrice,
              date: new Date(),
            });

            if (!product.lowestPrice || newPrice < product.lowestPrice) {
              product.lowestPrice = newPrice;
            }

            product.lastChecked = new Date();

            await product.save();
          }

          if (result.dropped) {
            product.priceDropped = result.dropped;
            console.log(`PRICE DROP 🚨`);
            console.log(product.title);
            console.log(`Old: ${oldPrice}`);
            console.log(`New: ${newPrice}`);
            console.log(`Drop: ${result.difference}`);
          }

          await page.close();
        } catch (error) {
          console.error("Scraping failed:", product.productURL, error.message);
        }
      }
    } catch (error) {
      console.error("Cron job failed:", error.message);
    }
    await browser.close();
  });
};

module.exports = monitorPrices;
