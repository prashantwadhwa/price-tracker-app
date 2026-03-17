const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

router.post("/products/track", productController.productTrack);
router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProduct);

module.exports = router;
