import React from "react";
import Barcode from "react-barcode";

export default function Ticket() {
  return (
    <div style={{ display: "flex", padding: "5rem", border: "1px solid" }}>
      <div style={{ transform: "rotate(270deg)" }}>
        <Barcode value="w37b12tsrqr64nptm12" format="CODE128" height={50} />;
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
            <p>THEATRE : </p>
            &nbsp;
            <p>03 / SEAT : B7, B8</p>
          </div>
          <div style={{ display: "flex", marginLeft: "2.5rem" }}>
            <p>DATE : </p>
            &nbsp;
            <p>03 / 07 / 2025</p>
          </div>
          <div style={{ display: "flex", marginLeft: "3rem" }}>
            <p>PRICE : </p>
            &nbsp;
            <p>Rs. 360</p>
          </div>
          <h2 style={{ color: "#ff5295" }}>Azaad</h2>
          <p>NO.: 01234567</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>STANDARD</p>
          <p>3D</p>
          <p>THEATRE: 03</p>
          <p>SEAT : B7, B8</p>
          <Barcode value="w37b12tsrqr64nptm12" format="CODE128" height={100} />
          <p>DATE : 10/07/2025</p>
          <p>TIME : 11:45 PM</p>
        </div>
      </div>
    </div>
  );
}
