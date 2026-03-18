import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function PriceChart({ productData }) {
  if (!productData || productData.length === 0) return null;

  const formattedData = productData?.priceHistory.map((item) => ({
    price: item.price,
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
  }));

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm border">
      <h2 className="font-semibold mb-4">Price History</h2>

      <div className="w-full h-75">
        <ResponsiveContainer>
          <AreaChart data={formattedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value) => `₹ ${value}`}
              labelFormatter={(label) => `Date: ${label}`}
            />

            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="price"
              stroke="#16a34a"
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PriceChart;
