import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      }
    );

    if (error) {
      console.error(error);
      setMessage(`Payment failed: ${error.message}`);
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Payment successful:", paymentIntent);
      setMessage("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-element-container">
        <CardElement
          className="StripeElement"
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: "Helvetica, sans-serif",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
              complete: {
                color: "#4caf50",
              },
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
