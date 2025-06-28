import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutComplete() {
  const [message, setMessage] = useState("Checking payment status...");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkPayment = async () => {
      const clientSecret = searchParams.get("payment_intent_client_secret");
      if (!clientSecret) {
        setMessage("No payment information found.");
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        setMessage("Stripe not loaded.");
        return;
      }

      const { paymentIntent, error } = await stripe.retrievePaymentIntent(clientSecret);

      if (error) {
        console.error("Error retrieving PaymentIntent:", error);
        setMessage("Something went wrong while checking the payment status.");
        return;
      }

      if (!paymentIntent) {
        setMessage("Payment not found.");
        return;
      }

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment successful! Thank you for your purchase.");
          break;
        case "processing":
          setMessage("Payment is processing. We'll update you soon.");
          break;
        case "requires_payment_method":
          setMessage("Payment failed. Please try again with a different payment method.");
          break;
        default:
          setMessage(`Payment status: ${paymentIntent.status}`);
      }
    };

    checkPayment();
  }, [searchParams]);

  return (
    <div style={{ maxWidth: 500, margin: "3rem auto", textAlign: "center" }}>
      <h1>Payment Status</h1>
      <p>{message}</p>
    </div>
  );
}
