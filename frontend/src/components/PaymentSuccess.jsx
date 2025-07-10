import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const txnid = searchParams.get("txnid");

  useEffect(() => {
    if (!txnid) {
      console.error("Transaction ID not found in URL.");
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/booking/${txnid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch booking: ${res.status}`);
        }

        const data = await res.json();

        localStorage.setItem("transaction_id", txnid);
        localStorage.setItem("movie", data.movie);
        localStorage.setItem("show", data.show_name);
        localStorage.setItem("show_id", data.show_id);
        localStorage.setItem("date", data.date);
        localStorage.setItem("theatre", data.theatre);
        localStorage.setItem(
          "selectedSeats",
          JSON.stringify(data.selectedSeats)
        );
        localStorage.setItem("show_time", data.time);

        console.log("Booking details saved to localStorage.");
      } catch (err) {
        console.error("Error fetching booking details:", err);
      }
    };

    fetchBookingDetails();
  }, [txnid]);

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
