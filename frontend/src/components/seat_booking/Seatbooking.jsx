import React, { Component } from "react";
import "./seats.css";
// import post from "./post.json";

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

  handleSubmited = () => {
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
        <div
          className="seat-booking-container"
          style={{ textAlign: "center", backgroundColor: "#f9f9f9" }}
        >
          {/*
          <div className="heading">
            <h1>Seat Reservation System</h1>
          </div>
          */}
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
            <img src="../src/assets/images/screen.png" alt="Screen" />
            <h1 style={{ color: "#a4a4a4" }}>Screen</h1>
          </div>
        </div>
        <div className="confirm-button" style={{ backgroundColor: "#f9f9f9" }}>
          <a href="http://localhost:5173/payment">
            <button
              className="btn-success btnmargin"
              onClick={this.handleSubmited}
              style={{ marginLeft: "49rem" }}
            >
              Confirm Booking
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default Seatbooking;
