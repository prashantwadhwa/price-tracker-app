import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { detectStore } from "@/lib/storeDetector";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiURL = import.meta.env.VITE_BASE_URL;

function TrackerInput() {

  const navigate = useNavigate();

  const [productURL, setProductURL] = useState("");
  const [product, setProduct] = useState(null);

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
      console.log(res.data);
      navigate(`/product/${res.data?._id}`)
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="price-tracker-search">
      <Input
        placeholder="Paste product URL..."
        value={productURL}
        onChange={(e) => setProductURL(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button onClick={handleTrack}>
        {loading ? "Loading..." : "Track Price"}
      </Button>
    </div>
  );
}

export default TrackerInput;
