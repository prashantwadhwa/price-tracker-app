import React from "react";

function HeroSection({ productData }) {
  if (!productData) return null;

  const comparisonStores = [
    { name: "amazon", price: productData?.price },
    { name: "flipkart", price: productData?.price + 500 },
    { name: "croma", price: productData?.price - 1200 },
  ];

  return (
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
          <div className="product-price font-bold">₹ {productData?.price}</div>
          <div className="text-sm text-gray-400">
            Last checked: {new Date(productData?.lastChecked).toLocaleString()}
          </div>
          <div className="flex gap-3 mt-4">
            <a
              href={productData?.productURL}
              target="_blank"
              rel="noreferrer"
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              View Product
            </a>

            <button className="border px-4 py-2 rounded-xl">
              Set Alert 🔔
            </button>
          </div>
        </div>
        <div className="comparison-section flex flex-col gap-4">
          <h2>Compare the price at other stores</h2>
          <div className="product-comparisons overflow-y-scroll flex flex-col gap-3 max-h-40">
            {comparisonStores.map((store, index) => {
              const priceDifference =
                ((store?.price - productData?.price) / productData?.price) *
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
  );
}

export default HeroSection;
