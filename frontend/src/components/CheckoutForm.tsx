import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/checkout-complete`,
      },
    });

    if (error) {
      console.error(error);
      setMessage(`Payment failed: ${error.message}`);
    } else {
      console.log("Payment successful!");
      setMessage("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="payment-element-container">
        <PaymentElement
          className="StripeElement"
          options={{
            layout: "accordion",
            wallets: {
              applePay: "auto",
              googlePay: "auto",
            },
          }}
        />
      </div>

      <button type="submit" disabled={!stripe} className="pay-button">
        Pay
      </button>

      {message && <p className="payment-message">{message}</p>}
    </form>
  );
}
