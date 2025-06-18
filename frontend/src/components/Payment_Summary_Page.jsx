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

  const containerStyle = {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const flexRow = {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 0",
  };

  const logoStyle = {
    width: "60px",
    height: "auto",
    marginRight: "15px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#FF5295",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const sectionTitle = {
    margin: "20px 0 10px",
    color: "#222",
  };

  const detailsStyle = {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "20px",
    color: "#555",
  };

  return (
    <div>
      <HeadProfile />
      <p style={{ padding: "10px 20px", fontSize: "14px", color: "#777" }}>
        Home / Movie / Show time / Show booking
      </p>
      <div className="main-bill" style={containerStyle}>
        <div
          className="show-detail"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div className="left1">
            <img
              src="../src/assets/images/pvr_logo.png"
              alt="PVR Logo"
              style={logoStyle}
            />
          </div>
          <div className="right1">
            <h3 style={{ margin: 0 }}>Azaad</h3>
            <p style={{ margin: "5px 0", color: "#666" }}>
              Cinepolis: Pacific NSP2, Delhi
            </p>
          </div>
        </div>

        <div className="show timing" style={{ marginBottom: "20px" }}>
          <h4>Monday, May 26, 2025, 07:05 PM</h4>
          <hr />
          <h4>{numberOfTickets} Tickets</h4>
          <p>{selectedSeats.join(", ")}</p>
        </div>

        <h2 style={sectionTitle}>Payment Summary</h2>
        <div className="amount-summary" style={detailsStyle}>
          <div style={flexRow}>
            <p>Order amount</p>
            <p>Rs.{ticketTotal}</p>
          </div>
          <div style={flexRow}>
            <p>Booking charge</p>
            <p>Rs.{bookingCharge}</p>
          </div>
          <div style={flexRow}>
            <p>CGST</p>
            <p>Rs.{cgst}</p>
          </div>
          <div style={flexRow}>
            <p>SGST</p>
            <p>Rs.{sgst}</p>
          </div>
          <hr />
          <div style={flexRow}>
            <strong>Total Amount</strong>
            <strong>Rs.{totalAmount}</strong>
          </div>
        </div>

        <h2 style={sectionTitle}>Your details</h2>
        <div className="details" style={detailsStyle}>
          <p>+91-9876543210</p>
          <p>Delhi-NCR</p>
        </div>

        <div className="tnc" style={{ marginBottom: "10px", color: "#888" }}>
          <p>Terms and Conditions</p>
        </div>

        <div className="total">
          <button
            style={buttonStyle}
            onClick={() =>
              (window.location.href = "http://localhost:5173/ticket")
            }
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
