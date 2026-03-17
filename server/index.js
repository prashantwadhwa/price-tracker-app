const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/product.routes");
const monitorPrices = require("./cron/priceMonitor");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Price tracker api running");
});

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);

  monitorPrices();
});
