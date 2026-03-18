import { Toast } from "@base-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.scss";
import HeroSection from "@/components/product/HeroSection";
import DealMeter from "@/components/product/DealMeter";
import InsightsRow from "@/components/product/InsightsRow";
import PriceChart from "@/components/product/PriceChart";

const apiURL = import.meta.env.VITE_BASE_URL;

function ProductPage() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [productPriceData, setProductPriceData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiURL}/product/${id}`);
      setProductPriceData(res.data?.priceDropped);
      setProductData(res.data?.product);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Some error occured", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        Loading product...
      </section>
    );
  }
  return (
    <section className="product-page min-h-screen ">
      {productData && (
        <>
          <HeroSection productData={productData} />
          <DealMeter productData={productData} />
          <InsightsRow productData={productData} />
          <PriceChart productData={productData} />
        </>
      )}
    </section>
  );
}

export default ProductPage;
