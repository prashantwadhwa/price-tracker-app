const { default: puppeteer } = require("puppeteer");
const productModel = require("../models/product.model");
const getScraper = require("../scrapers/scraperFactory");
const detectStore = require("../utils/storeDetector");
const parsePrice = require("../utils/parsePrice");

async function productTrack(req, res) {
  try {
    const { productURL } = req.body;

    if (!productURL) {
      return res.status(400).json({
        message: "Please fill the required fields",
      });
    }

    const store = detectStore(productURL);
    const scraper = getScraper(store);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const productData = await scraper(page, productURL);

    let product = await productModel.findOne({ productURL });

    const parsedPrice = parsePrice(productData.price);

    if (!product) {
      product = new productModel({
        title: productData.title,
        price: parsedPrice,
        image: productData.image,
        productURL,
        store,
        lowestPrice: parsedPrice,
        priceHistory: [{ price: parsedPrice, date: new Date() }],
      });

      await product.save();
    } else if (product.price !== Number(productData.price)) {
      product.price = parsedPrice;
      product.priceHistory.push({ price: parsedPrice });
      await product.save();
    }

    return res.status(200).json(product);

    await browser.close();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function getProducts(req, res) {
  try {
    const product = await productModel.find();

    if (!product) {
      return res.status(404).json({
        message: "No Product Data Found",
      });
    }

    return res.status(200).json({
      message: "Products Fetched Successfully",
      product,
      priceDropped: {
        type: Boolean,
        default: false,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function getProduct(req, res) {
  try {
    const productId = req.params.id;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "No Product Data Found",
      });
    }

    return res.status(200).json({
      message: "Product Fetched Successfully",
      product,
      priceDropped: {
        type: Boolean,
        default: false,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = { productTrack, getProducts, getProduct };
