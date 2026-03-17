const axios = require("axios");

function extractPID(url) {
  const match = url.match(/pid=([A-Z0-9]+)/);
  return match ? match[1] : null;
}

async function scrapeFlipkart(url) {
  try {
    const pid = extractPID(url);

    if (!pid) {
      throw new Error("PID not found in URL");
    }

    const apiURL = `https://www.flipkart.com/api/3/product/${pid}`;

    const response = await axios.get(apiURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Accept: "application/json",
      },
    });

    const data = response.data;

    const product = {
      title: data?.productBaseInfo?.productAttributes?.title,
      price:
        "₹" +
        data?.productBaseInfo?.productAttributes?.sellingPrice?.amount,
      image:
        data?.productBaseInfo?.productAttributes?.imageUrls?.[0],
    };

    return product;

  } catch (error) {
    console.error("Flipkart API scrape failed:", error.message);

    return {
      title: "Flipkart product unavailable",
      price: "N/A",
      image: "https://via.placeholder.com/200",
    };
  }
}

module.exports = scrapeFlipkart;