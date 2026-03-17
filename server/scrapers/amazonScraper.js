
async function scrapeAmazonProduct(page, url) {

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const product = await page.evaluate(() => {
    const title =
      document.querySelector("#productTitle")?.innerText.trim() || null;

    const price =
      document.querySelector(".a-price .a-offscreen")?.innerText.trim() || null;

    const image = document.querySelector("#imgTagWrapperId img")?.src || null;
    return { title, price, image };
  });
  

  return product;
}

module.exports = scrapeAmazonProduct;
