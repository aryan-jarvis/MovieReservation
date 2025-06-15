const buttonStyle = {
  width: "10.3125rem",
  height: "2.5rem",
  top: "6.25rem",
  left: "1.25rem",
  borderRadius: "0.9375rem",
  borderWidth: "0.0625rem",
  borderStyle: "solid",
  opacity: 0.7,
  color: "#4CAF50",
  backgroundColor: "white",
  fontSize: "1rem",
  cursor: "pointer",
};

export default function SelectShow() {
  return (
    <div>
      <div
        className="Theatre Name"
        style={{ display: "flex", gap: "1rem", padding: "1rem" }}
      >
        <div>
          <img
            src="../src/assets/images/pvr_logo.png"
            alt="User Profile Logo"
          />
        </div>
        <div>
          <p>PVR Elan Miracle</p>
          <p>Sec 84, Gurugram</p>
        </div>
      </div>
      <div className="Booking Buttons" style={{ padding: "1rem" }}>
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
        <a href="http://localhost:5173/seatselect">
          <button style={buttonStyle}>2:40 PM</button>
        </a>
        &nbsp;&nbsp;
      </div>
    </div>
  );
}
