import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          DealTracker
        </Link>

        <div className="flex gap-6 text-sm">
          <a href="#deals">Hot Deals</a>
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
