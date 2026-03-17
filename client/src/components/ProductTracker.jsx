import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { detectStore } from "@/lib/storeDetector";
import React, { useEffect, useState } from "react";

import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;

function ProductTracker() {
  const [productURL, setProductURL] = useState("");
  const [product, setProduct] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    const store = detectStore(productURL);

    if (!store) {
      setError("Store is unsupported yet");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await axios.post(`${apiURL}/products/track`, { productURL });
      setProduct(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${apiURL}/products`);

    console.log(res.data.product);
    setProductsData(res.data.product);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col gap-3 px-6">
      <Card className="w-105 min-h-45 flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Price Tracker</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <Input
            placeholder="Paste product URL..."
            value={productURL}
            onChange={(e) => setProductURL(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleTrack}>
            {loading ? "Loading..." : "Track Price"}
          </Button>

          {product && (
            <div className="w-full border rounded-lg p-4 mt-4 bg-white">
              <h2 className="font-semibold text-lg">{product?.title}</h2>
              <p className="text-green-600 font-bold text-xl">
                {" "}
                {product?.price}
              </p>
              <img src={product.image} className="w-40 mb-2" />
            </div>
          )}
        </CardContent>
      </Card>
      <div className="all-prods flex gap-2 w-fit">
        {productsData &&
          productsData.map((product, index) => (
            <Card key={index} className="w-1/2">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Tracked Products
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 items-center">
                <div className="w-full border rounded-lg p-4 mt-4 bg-white">
                  <h2 className="font-semibold text-lg">{product?.title}</h2>
                  <p className="text-green-600 font-bold text-xl">
                    {" "}
                    {product?.price}
                  </p>
                  <img src={product.image} className="w-40 mb-2" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default ProductTracker;
