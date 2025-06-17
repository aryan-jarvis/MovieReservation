import React, { Component } from "react";

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
    console.log("Confirm Booking clicked");

    const token = localStorage.getItem("token");
    console.log("Token sent:", token);

    for (const seat of this.state.seatReserved) {
      const payload = {
        theatre: "Inox",
        seat: seat,
        date: "2025-06-18",
        price: "250",
        movie: "Inside Out 2",
        show_time: "7:30 PM",
        barcode_id: `${seat}-${Date.now()}`,
      };

      try {
        const response = await fetch("http://localhost:8080/seat", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Booking failed");
        }

        console.log(`Seat ${seat} booked successfully.`);
      } catch (error) {
        console.error(`Error booking seat ${seat}:`, error.message);
      }
    }

    this.setState((prevState) => ({
      seatSelected: [...prevState.seatSelected, ...prevState.seatReserved],
      seatReserved: [],
    }));
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
            margin: 1rem auto;
            border-collapse: separate;
            border-spacing: 1.5rem;
          }

          .grid td {
            width: 40px;
            height: 40px;
            vertical-align: middle;
            cursor: pointer;
            border-radius: 0.6rem;
            text-align: center;
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
            vertical-align: center;
            border-radius: 0.8rem;
            border: #d6d6d6;
            font-weight: bold;
            background-color: #59b200;
            color: white;
            height: 5rem;
            width: 12rem;
            position: absolute;
          }

          .btnmargin {
            margin-left: 49rem;
          }

          .screen-side {
            text-align: center;
            margin-top: 2rem;
          }

          .seats-table {
            margin-top: 2rem;
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
              src="../src/assets/images/screen.png"
              alt="Screen"
              style={{ maxWidth: "400px", width: "100%" }}
            />
            <h1 style={{ color: "#a4a4a4" }}>Screen</h1>
          </div>
        </div>

        <div className="confirm-button" style={{ backgroundColor: "#f9f9f9" }}>
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

export default Seatbooking;
