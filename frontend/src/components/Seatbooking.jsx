import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

class Seatbooking extends Component {
  constructor() {
    super();
    const rows = "ABCDEFGHIJ";
    const seat = [];

    for (let row of rows) {
      for (let i = 1; i <= 10; i++) {
        seat.push(`${row}${i}`);
      }
    }

    this.state = {
      seat,
      seatAvailable: [...seat],
      seatReserved: [],
      seatSelected: [
        "A1",
        "B2",
        "D5",
        "D6",
        "D7",
        "F2",
        "F3",
        "G2",
        "G3",
        "J6",
        "J7",
      ],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/seats")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookedSeats) {
          this.setState({ seatSelected: data.bookedSeats });
        }
      })
      .catch((err) => console.error("Failed to fetch booked seats:", err));
  }

  onClickData = (seat) => {
    if (this.state.seatReserved.includes(seat)) {
      this.setState((prevState) => ({
        seatAvailable: [...prevState.seatAvailable, seat],
        seatReserved: prevState.seatReserved.filter((s) => s !== seat),
      }));
    } else {
      this.setState((prevState) => ({
        seatReserved: [...prevState.seatReserved, seat],
        seatAvailable: prevState.seatAvailable.filter((s) => s !== seat),
      }));
    }
  };

  isSeatClickable = (seat) => !this.state.seatSelected.includes(seat);

  handleSubmited = async () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const payloads = this.state.seatReserved.map((seat) => ({
      username,
      theatre: "Theatre 1",
      seat,
      date: "2025-06-17",
      price: "300",
      movie: "Some Movie",
      show_time: "6:00 PM",
      barcode_id: Math.random().toString(36).substring(2, 10),
    }));

    for (let payload of payloads) {
      try {
        const res = await fetch("http://localhost:8080/seat", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Error booking seat:", text);
          return;
        }
      } catch (err) {
        console.error("Booking failed:", err);
        return;
      }
    }

    // Save selected seats to localStorage for the payment summary
    localStorage.setItem(
      "selectedSeats",
      JSON.stringify(this.state.seatReserved)
    );

    this.setState({ seatReserved: [] });

    fetch("http://localhost:8080/seats")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookedSeats) {
          this.setState({ seatSelected: data.bookedSeats });
        }
        this.props.navigate("/payment");
      });
  };

  groupSeatsByRow = () => {
    const grouped = {};
    this.state.seat.forEach((seat) => {
      const row = seat[0];
      if (!grouped[row]) grouped[row] = [];
      grouped[row].push(seat);
    });
    return grouped;
  };

  render() {
    const groupedSeats = this.groupSeatsByRow();

    return (
      <div>
        <style>{`
      .grid {
        background-color: #f9f9f9;
        margin: 2rem auto;
        border-collapse: separate;
        border-spacing: 1rem;
        max-width: 90%;
      }

      .grid td {
        width: 40px;
        height: 40px;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 0.6rem;
        text-align: center;
        font-weight: bold;
        font-size: 0.9rem;
        transition: transform 0.2s ease;
      }

      .grid td:hover {
        transform: scale(1.05);
      }

      .available {
        background-color: #ffffff;
        border: 1px solid #59b200;
        color: #59b200;
      }

      .selected {
        background-color: #59b200;
        color: #ffffff;
      }

      .reserved {
        background-color: #d6d6d6;
        border: 1px solid #d6d6d6;
        color: white;
        cursor: not-allowed;
      }

      .btn-success {
        font-size: 1rem;
        text-align: center;
        border-radius: 0.8rem;
        font-weight: bold;
        background-color: #59b200;
        color: white;
        height: 3.5rem;
        width: 12rem;
        margin: 2rem auto;
        display: block;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .btn-success:hover {
        background-color: #4ea000;
      }

      .screen-side {
        text-align: center;
        margin-top: 3rem;
      }

      .seats-table {
        margin-top: 2rem;
        overflow-x: auto;
      }

      .seat-booking-container {
        text-align: center;
        background-color: #f9f9f9;
        padding: 2rem 1rem;
        min-height: 100vh;
      }

      .screen-side img {
        margin-bottom: 0.5rem;
      }
    `}</style>

        <div
          className="seat-booking-container"
          style={{ textAlign: "center", backgroundColor: "#f9f9f9" }}
        >
          <div className="seats-table">
            <table className="grid">
              <tbody>
                {Object.keys(groupedSeats).map((rowKey) => (
                  <tr key={rowKey}>
                    {groupedSeats[rowKey].map((seat) => (
                      <td
                        key={seat}
                        className={
                          this.state.seatSelected.includes(seat)
                            ? "reserved"
                            : this.state.seatReserved.includes(seat)
                            ? "selected"
                            : "available"
                        }
                        onClick={
                          this.isSeatClickable(seat)
                            ? () => this.onClickData(seat)
                            : null
                        }
                      >
                        {seat}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="screen-side">
            <img
              src="/images/screen.png"
              alt="Screen"
              style={{ maxWidth: "400px", width: "100%" }}
            />
            <h1 style={{ color: "#a4a4a4" }}>Screen</h1>
          </div>
        </div>

        <div className="confirm-button">
          <button
            className="btn-success btnmargin"
            onClick={this.handleSubmited}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    );
  }
}
function SeatbookingWithNavigate(props) {
  const navigate = useNavigate();
  return <Seatbooking {...props} navigate={navigate} />;
}

export default SeatbookingWithNavigate;
