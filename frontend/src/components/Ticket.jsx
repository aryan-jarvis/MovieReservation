import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";

export default function Ticket() {
  const transactionId = localStorage.getItem("transaction_id") || "UNKNOWN";
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
  const theatre = localStorage.getItem("theatre") || "Unknown Theatre";
  const showId = localStorage.getItem("show_id") || null;

  const [showDetails, setShowDetails] = useState({
    movie: "Loading...",
    date: "Loading...",
    start_time: "Loading...",
    end_time: "Loading...",
  });

  useEffect(() => {
    if (!showId) {
      console.error("show_id not found in localStorage.");
      return;
    }

    const fetchDetails = async () => {
      try {
        const resShow = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/shows/${showId}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!resShow.ok)
          throw new Error(`Failed to fetch show: ${resShow.status}`);
        const showData = await resShow.json();

        const movieId = showData.movie_id;
        if (!movieId) throw new Error(`Show does not have movie_id.`);

        const resMovie = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/movies/${movieId}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!resMovie.ok)
          throw new Error(`Failed to fetch movie: ${resMovie.status}`);
        const movieData = await resMovie.json();

        setShowDetails({
          movie: movieData.movie_name || "Unknown Movie",
          date: showData.date || null,
          start_time: showData.start_time || null,
          end_time: showData.end_time || null,
        });
      } catch (err) {
        console.error("Error fetching show or movie details:", err);
        setShowDetails({
          movie: "Unavailable",
          date: null,
          start_time: null,
          end_time: null,
        });
      }
    };

    fetchDetails();
  }, [showId]);

  const totalPrice = selectedSeats.length * 438;

  const formatDate = (isoString) => {
    if (!isoString) return "Unknown Date";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return "Unknown Time";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "2rem",
        border: "2px solid #ccc",
        borderRadius: "10px",
        width: "60rem",
        margin: "2rem auto",
        background: "#fdfdfd",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            paddingRight: "1.5rem",
            borderRight: "1px dashed #ccc",
          }}
        >
          <h1
            style={{
              backgroundColor: "#ff5295",
              color: "white",
              padding: "0.8rem",
              borderRadius: "6px",
              fontSize: "1.5rem",
              marginBottom: "1.2rem",
              textAlign: "center",
              marginLeft: "2.5rem",
            }}
          >
            Cinema Ticket
          </h1>
          <div style={{ marginLeft: "5rem" }}>
            <div style={{ marginBottom: "0.8rem" }}>
              <strong>THEATRE:</strong> {theatre}
            </div>
            <div style={{ marginBottom: "0.8rem" }}>
              <strong>SEAT(S):</strong> {selectedSeats.join(", ")}
            </div>
            <div style={{ marginBottom: "0.8rem" }}>
              <strong>DATE:</strong> {formatDate(showDetails.date)}
            </div>
            <div style={{ marginBottom: "0.8rem" }}>
              <strong>PRICE:</strong> Rs. {totalPrice}
            </div>
            <h2 style={{ color: "#ff5295", margin: "1rem 0 0.5rem" }}>
              {showDetails.movie}
            </h2>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>
              Show Time:{" "}
              <strong>
                {formatTime(showDetails.start_time)} -{" "}
                {formatTime(showDetails.end_time)}
              </strong>
            </p>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>
              Ticket No: <strong>{transactionId}</strong>
            </p>
          </div>
        </div>

        <div style={{ flex: 1, textAlign: "center", paddingLeft: "1.5rem" }}>
          <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            STANDARD 3D
          </p>
          <p style={{ marginBottom: "0.5rem" }}>THEATRE: {theatre}</p>
          <p style={{ marginBottom: "0.5rem" }}>
            SEAT(S): {selectedSeats.join(", ")}
          </p>
          <div style={{ margin: "1rem auto" }}>
            <Barcode value={transactionId} format="CODE128" height={80} />
          </div>
          <p style={{ marginBottom: "0.5rem" }}>
            DATE: {formatDate(showDetails.date)}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            TIME: {formatTime(showDetails.start_time)} -{" "}
            {formatTime(showDetails.end_time)}
          </p>
        </div>
      </div>
    </div>
  );
}
