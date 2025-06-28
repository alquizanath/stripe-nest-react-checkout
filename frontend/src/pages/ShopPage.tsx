import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export default function ShopPage() {
  const [selectedItem, setSelectedItem] = useState<{ name: string; amount: number } | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleSelectItem = (item: { name: string; amount: number }) => {
    setSelectedItem(item);
    setClientSecret(null); 
  };

  const handleCheckout = async () => {
    if (!selectedItem) {
      alert("Select an item first!");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payments/create-intent`,
        {
          orderCode: `ORDER-${Date.now()}`,
          amount: selectedItem.amount,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setClientSecret(res.data.clientSecret);
    } catch (error) {
      console.error("Failed to create payment intent:", error);
      alert("Error creating payment intent. See console.");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "3rem auto" }}>
      <h2>🛒 Simple React Stripe Checkout</h2>

      {!clientSecret && (
        <>
          <p>Select an item to buy:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button onClick={() => handleSelectItem({ name: "Item A", amount: 2000 })}>
              Item A - ₱20.00
            </button>
            <button onClick={() => handleSelectItem({ name: "Item B", amount: 3000 })}>
              Item B - ₱30.00
            </button>
          </div>

          {selectedItem && (
            <div style={{ marginTop: "2rem" }}>
              <h4>🛍 Selected: {selectedItem.name} - ₱{(selectedItem.amount / 100).toFixed(2)}</h4>
              <button onClick={handleCheckout} style={{ marginTop: "1rem" }}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </>
      )}

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}
