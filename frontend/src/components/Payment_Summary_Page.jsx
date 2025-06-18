import React from "react";
import HeadProfile from "./HeadProfile";

export default function Payment_Summary_Page() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
  const numberOfTickets = selectedSeats.length;

  const ticketPrice = 300;
  const bookingChargePerTicket = 30;
  const cgstPerTicket = 54;
  const sgstPerTicket = 54;

  const ticketTotal = numberOfTickets * ticketPrice;
  const bookingCharge = numberOfTickets * bookingChargePerTicket;
  const cgst = numberOfTickets * cgstPerTicket;
  const sgst = numberOfTickets * sgstPerTicket;
  const totalAmount = ticketTotal + bookingCharge + cgst + sgst;

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const showId = localStorage.getItem("selectedShowId") || 1;

      if (!token) {
        alert("You must be logged in to proceed.");
        return;
      }

      const res = await fetch("http://localhost:8080/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          amount: totalAmount,
          show_id: showId,
          seats: selectedSeats.join(","),
        }),
      });

      const html = await res.text();

      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);

      const form = document.getElementById("payuForm");
      if (form) {
        form.submit();
      } else {
        throw new Error("PayU form not found in response");
      }
    } catch (err) {
      console.error("Payment initiation failed", err);
      alert("Something went wrong with payment initiation.");
    }
  };

  return (
    <div>
      <HeadProfile />
      <p style={{ padding: "10px 20px", fontSize: "14px", color: "#777" }}>
        <a href="/" style={{ color: "#777", textDecoration: "none" }}>
          Home
        </a>{" "}
        /{" "}
        <a href="/movies" style={{ color: "#777", textDecoration: "none" }}>
          Movie
        </a>{" "}
        /{" "}
        <a
          href="/description"
          style={{ color: "#777", textDecoration: "none" }}
        >
          Show time
        </a>{" "}
        /{" "}
        <a href="/theatre" style={{ color: "#777", textDecoration: "none" }}>
          Show booking
        </a>
      </p>

      <div style={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src="../src/assets/images/pvr_logo.png"
            alt="PVR Logo"
            style={styles.logo}
          />
          <div>
            <h3 style={{ margin: 0 }}>Azaad</h3>
            <p style={{ margin: "5px 0", color: "#666" }}>
              Cinepolis: Pacific NSP2, Delhi
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h4>Monday, May 26, 2025, 07:05 PM</h4>
          <hr />
          <h4>{numberOfTickets} Tickets</h4>
          <p>{selectedSeats.join(", ")}</p>
        </div>

        <h2 style={styles.sectionTitle}>Payment Summary</h2>
        <div style={styles.details}>
          <Row label="Order amount" value={`Rs.${ticketTotal}`} />
          <Row label="Booking charge" value={`Rs.${bookingCharge}`} />
          <Row label="CGST" value={`Rs.${cgst}`} />
          <Row label="SGST" value={`Rs.${sgst}`} />
          <hr />
          <Row
            label={<strong>Total Amount</strong>}
            value={<strong>Rs.{totalAmount}</strong>}
          />
        </div>

        <h2 style={styles.sectionTitle}>Your details</h2>
        <div style={styles.details}>
          <p>+91-9876543210</p>
          <p>Delhi-NCR</p>
        </div>

        <div style={{ marginBottom: "10px", color: "#888" }}>
          <p>Terms and Conditions</p>
        </div>

        <button style={styles.button} onClick={handlePayment}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={styles.row}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 0",
  },
  logo: {
    width: "60px",
    height: "auto",
    marginRight: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#FF5295",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  sectionTitle: {
    margin: "20px 0 10px",
    color: "#222",
  },
  details: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "20px",
    color: "#555",
  },
};
