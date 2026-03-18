import React from "react";

function InsightsRow({ productData }) {
  if (!productData || !productData.priceHistory?.length) return null;

  const prices = productData.priceHistory.map((product) => product.price);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length; // using reduce here due to many values of price.
  const savings = highest - productData.price;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="p-5 rounded-2xl bg-white shadow-sm border">
        <p className="text-sm text-gray-500">Lowest Price</p>
        <h2 className="text-xl font-bold text-green-600">₹ {lowest}</h2>
      </div>

      <div className="p-5 rounded-2xl bg-white shadow-sm border">
        <p className="text-sm text-gray-500">Highest Price</p>
        <h2 className="text-xl font-bold text-red-600">₹ {highest}</h2>
      </div>

      <div className="p-5 rounded-2xl bg-white shadow-sm border">
        <p className="text-sm text-gray-500">Average Price</p>
        <h2 className="text-xl font-bold text-blue-600">₹ {avg.toFixed(0)}</h2>
      </div>

      <p className="text-sm text-gray-500">Potential Savings</p>
      <h2 className="text-xl font-bold text-purple-600">₹ {savings}</h2>
    </div>
  );
}

export default InsightsRow;
