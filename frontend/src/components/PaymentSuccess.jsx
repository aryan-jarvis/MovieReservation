import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const clickT = () => {
    navigate("/ticket");
  };
  const clickH = () => {
    navigate("/");
  };
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Your tickets have been booked successfully.</p>

      <button
        style={{
          marginTop: "2rem",
          fontSize: "1.3rem",
          padding: "1rem",
          borderRadius: "0.8rem",
          border: "0.1rem white solid",
          backgroundColor: "#ff5295",
          color: "white",
          height: "4rem",
        }}
        onClick={clickT}
      >
        View your ticket
      </button>
      <br />
      <button
        style={{
          marginTop: "2rem",
          fontSize: "1.3rem",
          padding: "1rem",
          borderRadius: "0.8rem",
          border: "0.1rem white solid",
          backgroundColor: "lightgreen",
          color: "white",
          height: "4rem",
        }}
        onClick={clickH}
      >
        Get back to home page
      </button>
    </div>
  );
}
