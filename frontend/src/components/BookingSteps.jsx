export default function BookingSteps() {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h2>Book Your Show in 4 Easy Steps</h2>
        <p>
          Booking your favorite show is simple and quick! Just follow these four
          easy steps to secure your seats and enjoy an unforgettable experience.
        </p>
      </div>
      <div>
        <img src="../src/assets/images/booking_steps.png" alt="Company Logo" />
      </div>
      <div
        style={{
          display: "flex",
          gap: "11rem",
          margin: "auto auto auto 18.5rem",
        }}
      >
        <p>Select Movie & Location</p> <p>Pick Date & Show Timing</p>
        <p>Choose Seats & Tickets</p> <p>Payment & Confirm Booking</p>
      </div>
    </div>
  );
}
