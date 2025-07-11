import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Seatbooking = ({ showId }) => {
  const rows = "ABCDEFGHIJ";
  const seat = [];
  for (let row of rows) {
    for (let i = 1; i <= 10; i++) {
      seat.push(`${row}${i}`);
    }
  }

  const [seatAvailable, setSeatAvailable] = useState([...seat]);
  const [seatReserved, setSeatReserved] = useState([]);
  const [seatSelected, setSeatSelected] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/seats/show/${showId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.bookedSeats) {
          setSeatSelected(data.bookedSeats);
        }
      })
      .catch((err) => console.error("Failed to fetch booked seats:", err));
  }, [showId]);

  const onClickData = (seat) => {
    if (seatReserved.includes(seat)) {
      setSeatAvailable((prev) => [...prev, seat]);
      setSeatReserved((prev) => prev.filter((s) => s !== seat));
    } else {
      setSeatReserved((prev) => [...prev, seat]);
      setSeatAvailable((prev) => prev.filter((s) => s !== seat));
    }
  };

  const isSeatClickable = (seat) => !seatSelected.includes(seat);

  const handleSubmited = async () => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("id");

    const payloads = seatReserved.map((seat) => ({
      seat,
      show_id: Number(showId),
      user_id: Number(user_id),
      barcode_id: Math.random().toString(36).substring(2, 10),
    }));

    for (let payload of payloads) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/seats/book`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error booking seat:", errorText);
          alert("Booking failed: " + errorText);
          return;
        }
      } catch (err) {
        console.error("Booking failed:", err);
        return;
      }
    }

    localStorage.setItem("selectedSeats", JSON.stringify(seatReserved));
    setSeatReserved([]);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/seats/show/${showId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.bookedSeats) {
          setSeatSelected(data.bookedSeats);
        }
        navigate(`/payment/${showId}`);
      });
  };

  const groupSeatsByRow = () => {
    const grouped = {};
    seat.forEach((seat) => {
      const row = seat[0];
      if (!grouped[row]) grouped[row] = [];
      grouped[row].push(seat);
    });
    return grouped;
  };

  const groupedSeats = groupSeatsByRow();

  return (
    <div style={styles.container}>
      <div style={styles.seatsTableWrapper}>
        <table style={styles.gridTable}>
          <tbody>
            {Object.keys(groupedSeats).map((rowKey) => (
              <tr key={rowKey}>
                {groupedSeats[rowKey].map((seat) => {
                  let seatStyle = { ...styles.seatCellBase };

                  if (seatSelected.includes(seat)) {
                    seatStyle = { ...seatStyle, ...styles.reserved };
                  } else if (seatReserved.includes(seat)) {
                    seatStyle = { ...seatStyle, ...styles.selected };
                  } else {
                    seatStyle = { ...seatStyle, ...styles.available };
                  }

                  return (
                    <td
                      key={seat}
                      style={seatStyle}
                      onClick={
                        isSeatClickable(seat)
                          ? () => onClickData(seat)
                          : undefined
                      }
                    >
                      {seat}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.screenSide}>
        <img src="/images/screen.png" alt="Screen" style={styles.screenImage} />
        <h1 style={{ color: "#a4a4a4" }}>Screen</h1>
      </div>

      <button
        style={{
          ...styles.confirmButton,
          backgroundColor: !token ? "#aaa" : "#59b200",
          cursor: !token ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          if (!token) {
            alert("You must be logged in to confirm booking.");
            return;
          }
          handleSubmited();
        }}
        disabled={!token}
        onMouseOver={(e) => {
          if (token) e.currentTarget.style.backgroundColor = "#4ea000";
        }}
        onMouseOut={(e) => {
          if (token) e.currentTarget.style.backgroundColor = "#59b200";
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Seatbooking;

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    padding: "2rem 1rem",
    minHeight: "100vh",
  },
  seatsTableWrapper: {
    marginTop: "2rem",
    overflowX: "auto",
  },
  gridTable: {
    backgroundColor: "#f9f9f9",
    margin: "2rem auto",
    borderCollapse: "separate",
    borderSpacing: "1rem",
    maxWidth: "90%",
  },
  seatCellBase: {
    width: "40px",
    height: "40px",
    verticalAlign: "middle",
    borderRadius: "0.6rem",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "0.9rem",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  },
  available: {
    backgroundColor: "#ffffff",
    border: "1px solid #59b200",
    color: "#59b200",
  },
  selected: {
    backgroundColor: "#59b200",
    color: "#ffffff",
  },
  reserved: {
    backgroundColor: "#d6d6d6",
    border: "1px solid #d6d6d6",
    color: "white",
    cursor: "not-allowed",
  },
  screenSide: {
    textAlign: "center",
    marginTop: "3rem",
  },
  screenImage: {
    maxWidth: "400px",
    width: "100%",
    marginBottom: "0.5rem",
  },
  confirmButton: {
    fontSize: "1rem",
    textAlign: "center",
    borderRadius: "0.8rem",
    fontWeight: "bold",
    backgroundColor: "#59b200",
    color: "white",
    height: "3.5rem",
    width: "12rem",
    margin: "2rem auto",
    display: "block",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
