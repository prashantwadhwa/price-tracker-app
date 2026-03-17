import { Toast } from "@base-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.scss";

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

  const comparisonStores = [
    { name: "amazon", price: productData?.price },
    { name: "flipkart", price: productData?.price + 500 },
    { name: "croma", price: productData?.price - 1200 },
  ];

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
          <div className="product-grid mx-auto grid grid-cols-1 md:grid-cols-3 py-10">
            <div className="product-images">
              <img
                src={productData?.image}
                alt={productData?.title}
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="product-details flex flex-col gap-4">
              <div className="product-current-stats">
                <div className="product-title">{productData?.title}</div>
                <div className="product-rating"></div>
                <div className="product-price font-bold">
                  ₹ {productData?.price}
                </div>
              </div>
              <div className="comparison-section flex flex-col gap-4">
                <h2>Compare the price at other stores</h2>
                <div className="product-comparisons overflow-y-scroll flex flex-col gap-3 max-h-40">
                  {comparisonStores.map((store, index) => {
                    const priceDifference =
                      ((store?.price - productData?.price) /
                        productData?.price) *
                      100;
                    return (
                      <div className="store flex justify-between" key={index}>
                        <div className="store-details flex gap-2">
                          <div className="store-logo"></div>
                          <div className="store-name font-semibold capitalize">
                            {store?.name}
                          </div>
                        </div>
                        <div className="store-price-section flex flex-col justify-end items-end">
                          <div className="store-price font-bold">
                            ₹ {store?.price}
                          </div>
                          {store?.price !== productData?.price && (
                            <div
                              className={`price-difference  text-sm ${priceDifference > 0 ? "text-red-600" : "text-green-600"}`}
                            >
                              {`${Math.abs(priceDifference).toFixed(0)}% ${priceDifference > 0 ? "Higher" : "Lower"}`}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="product-deal-scanner"></div>
          </div>
          <div className="product-chart"></div>
        </>
      )}
    </section>
  );
}

export default ProductPage;
