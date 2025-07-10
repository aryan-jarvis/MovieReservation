import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeadProfile from "./HeadProfile";

export default function Payment_Summary_Page() {
  const { showId } = useParams();
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
  const numberOfTickets = selectedSeats.length;
  const [userName, setUserName] = useState("");

  const [movie, setMovie] = useState(null);
  const [theatre, setTheatre] = useState(null);
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);

  const ticketPrice = 300;
  const bookingChargePerTicket = 30;
  const cgstPerTicket = 54;
  const sgstPerTicket = 54;

  const ticketTotal = numberOfTickets * ticketPrice;
  const bookingCharge = numberOfTickets * bookingChargePerTicket;
  const cgst = numberOfTickets * cgstPerTicket;
  const sgst = numberOfTickets * sgstPerTicket;
  const totalAmount = ticketTotal + bookingCharge + cgst + sgst;

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  useEffect(() => {
    if (!showId) {
      setError("Missing showId in URL.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/shows/${showId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch show");
        return res.json();
      })
      .then((data) => {
        const s = data.data || data;
        setShow(s);

        fetch(`${import.meta.env.VITE_API_BASE_URL}/movies/${s.movie_id}`)
          .then((res) => res.json())
          .then((data) => setMovie(data.data || data))
          .catch(() => setError("Failed to load movie"));

        fetch(`${import.meta.env.VITE_API_BASE_URL}/theatres/${s.theatre_id}`)
          .then((res) => res.json())
          .then((data) => setTheatre(data.data || data))
          .catch(() => setError("Failed to load theatre"));
      })
      .catch(() => setError("Failed to load show"));
  }, [showId]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to proceed.");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: totalAmount,
            show_id: parseInt(showId, 10),
            seats: selectedSeats.join(","),
          }),
        }
      );

      const text = await res.text();

      if (!res.ok) {
        console.error("Payment initiation failed:", text);
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const div = document.createElement("div");
      div.innerHTML = text;
      document.body.appendChild(div);

      const form = document.getElementById("payuForm");
      if (form) {
        form.submit();
      } else {
        throw new Error("PayU form not found in response");
      }
    } catch (err) {
      console.error("Payment initiation failed", err);
      alert("Something went wrong: " + err.message);
    }
  };

  function parseDate(dateString) {
    if (!dateString) return null;
    if (dateString.includes("T")) return new Date(dateString);
    return new Date(dateString.replace(" ", "T"));
  }

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!movie || !theatre || !show) return <div>Loading...</div>;

  return (
    <div>
      <HeadProfile />
      <div style={styles.container}>
        <div style={styles.header}>
          <img
            src={movie.poster_url || "/placeholder.jpg"}
            alt={movie.movie_name}
            style={styles.poster}
          />
          <div>
            <h3 style={{ margin: 0 }}>{movie.movie_name}</h3>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {theatre.theatre_name}
            </p>
            <p style={{ margin: "5px 0", color: "#888" }}>
              {new Date(show.date).toLocaleDateString()} |{" "}
              {parseDate(show.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {parseDate(show.end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div>
          <h4>{numberOfTickets} Ticket(s)</h4>
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
          <p>
            <strong>Name:</strong> {userName || "Guest"}
          </p>
          <p>+91-9876543210</p>
          <p>Delhi-NCR</p>
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
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
  },
  header: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    alignItems: "center",
  },
  poster: {
    width: "100px",
    height: "140px",
    borderRadius: "4px",
    objectFit: "cover",
  },
  sectionTitle: {
    marginTop: "30px",
    marginBottom: "10px",
  },
  details: {
    background: "#f5f5f5",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#59b200",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
