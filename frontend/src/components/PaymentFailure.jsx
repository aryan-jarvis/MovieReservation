import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();
  const clickM = () => {
    navigate("/movies");
  };
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Payment Failed ❌</h1>
      <p>Something went wrong with the payment. Please try again.</p>
      <button
        onClick={clickM}
        style={{
          marginTop: "2rem",
          fontSize: "1.3rem",
          padding: "1rem",
          borderRadius: "0.8rem",
          border: "0.1rem white solid",
          backgroundColor: "red",
          color: "white",
          height: "4rem",
        }}
      >
        Try Booking Again
      </button>
    </div>
  );
}
