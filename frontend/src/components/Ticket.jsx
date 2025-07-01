import React, { useMemo } from "react";
import Barcode from "react-barcode";

export default function Ticket() {
  const genVal = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const barcodeValue = useMemo(() => genVal(), []);

  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [
    "B7",
    "B8",
  ];
  const movie = localStorage.getItem("movie") || "Azaad";
  const theatre = localStorage.getItem("theatre") || "Theatre 03";
  const date = localStorage.getItem("date") || "03/07/2025";
  const time = localStorage.getItem("show_time") || "11:45 PM";

  const totalPrice = selectedSeats.length * 438;

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
      {/* <div style={{ transform: "rotate(270deg)", marginRight: "2rem" }}>
        <Barcode value={barcodeValue} format="CODE128" height={50} />
      </div> */}
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
              <strong>DATE:</strong> {date}
            </div>
            <div style={{ marginBottom: "0.8rem" }}>
              <strong>PRICE:</strong> Rs. {totalPrice}
            </div>
            <h2 style={{ color: "#ff5295", margin: "1rem 0 0.5rem" }}>
              {movie}
            </h2>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>
              Ticket No:{" "}
              <strong>{barcodeValue.slice(0, 8).toUpperCase()}</strong>
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
            <Barcode value={barcodeValue} format="CODE128" height={80} />
          </div>
          <p style={{ marginBottom: "0.5rem" }}>DATE: {date}</p>
          <p style={{ marginBottom: "0.5rem" }}>TIME: {time}</p>
        </div>
      </div>
    </div>
  );
}
