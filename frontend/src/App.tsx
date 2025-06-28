import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import CheckoutComplete from "./pages/CheckoutComplete";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/checkout-complete" element={<CheckoutComplete />} />
      </Routes>
    </BrowserRouter>
  );
}
