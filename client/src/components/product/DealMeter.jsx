import React from "react";

function DealMeter({ productData }) {
  if (!productData) return null;

  const priceDifference =
    ((productData?.price - productData?.lowestPrice) /
      productData?.lowestPrice) *
    100;

  let label = "Great Deal";
  let color = "text-green-600";
  let bg = "bg-green-50";

  if (priceDifference > 15) {
    label = "Expensive";
    color = "text-red-600";
    bg = "bg-red-50";
  } else if (priceDifference > 5) {
    label = "Okay Deal";
    color = "text-yellow-600";
    bg = "bg-yellow-50";
  }

  return (
    <div className={`p-5 rounded-2xl ${bg}`}>
      <div>
        <div className="font-semibold text-lg">Deal Rating</div>
        <span className={`font-bold ${color}`}>{label}</span>
      </div>
      <div className="mt-3">
        <p className="font-semibold">
          Lowest Price: ₹ {productData?.price}
        </p>
        <p className="text-sm text-gray-600">
          Current Price is{" "}
          <span className="font-semibold">
            {Math.abs(priceDifference.toFixed(1))}%
          </span>
          {priceDifference > 0
            ? " above the lowest recorded price"
            : " lower than the lowest recorded price"}{" "}
        </p>
        {priceDifference <= 5 && (
          <p className="text-green-600 text-sm mt-2">
            🔥 This is near the lowest price!
          </p>
        )}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
        <div
          className="h-2 rounded-full bg-linear-to-r from-green-400 to-red-500"
          style={{
            width: `${Math.min(priceDifference, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

export default DealMeter;
