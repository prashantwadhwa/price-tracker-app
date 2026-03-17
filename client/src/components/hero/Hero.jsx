import React from "react";
import "./Hero.scss";
import TrackerInput from "../tracker/TrackerInput";

function Hero() {
  return (
    <section className="hero-section py-24 bg-linear-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Track Prices. <br />
          Never Overpay again.
        </h1>
        <p className="mb-8 text-lg">
          Paste any product link and instantly see price history, deal score,
          and best store.
        </p>

        <TrackerInput />
      </div>
    </section>
  );
}

export default Hero;
