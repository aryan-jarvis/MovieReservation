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
    <div style={{ display: "flex", padding: "5rem", border: "1px solid" }}>
      <div style={{ transform: "rotate(270deg)" }}>
        <Barcode value={barcodeValue} format="CODE128" height={50} />
      </div>
      <div style={{ display: "flex", gap: "15rem" }}>
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              backgroundColor: "#ff5295",
              color: "white",
              padding: "1rem",
            }}
          >
            Cinema Ticket
          </h1>
          <div style={{ display: "flex", marginLeft: "0.6rem" }}>
            <p>THEATRE :</p>&nbsp;
            <p>
              {theatre} / SEAT : {selectedSeats.join(", ")}
            </p>
          </div>
          <div style={{ display: "flex", marginLeft: "2.5rem" }}>
            <p>DATE :</p>&nbsp;
            <p>{date}</p>
          </div>
          <div style={{ display: "flex", marginLeft: "3rem" }}>
            <p>PRICE :</p>&nbsp;
            <p>Rs. {totalPrice}</p>
          </div>
          <h2 style={{ color: "#ff5295" }}>{movie}</h2>
          <p>NO.: {barcodeValue.slice(0, 8).toUpperCase()}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>STANDARD</p>
          <p>3D</p>
          <p>THEATRE: {theatre}</p>
          <p>SEAT : {selectedSeats.join(", ")}</p>
          <Barcode value={barcodeValue} format="CODE128" height={100} />
          <p>DATE : {date}</p>
          <p>TIME : {time}</p>
        </div>
      </div>
    </div>
  );
}
