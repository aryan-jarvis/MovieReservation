import HeadProfile from "./HeadProfile";
import Seatbooking from "./seat_booking/Seatbooking";
import AzaadPvr from "./AzaadPvr";

export default function ShowBooking_Page() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <div style={{ display: "flex" }}>
        <a
          href="http://localhost:5173/"
          style={{ color: "black", textDecoration: "none" }}
        >
          <p>Home</p>
        </a>
        &nbsp;
        <a
          href="http://localhost:5173/description"
          style={{ color: "black", textDecoration: "none" }}
        >
          <p>/ Movie</p>
        </a>
        &nbsp;
        <a
          href="http://localhost:5173/theatre"
          style={{ color: "black", textDecoration: "none" }}
        >
          <p>/ Show Time</p>
        </a>
        &nbsp;
        <a>
          <p>/ Show Booking</p>
        </a>
      </div>
      <AzaadPvr />
      <div style={{ display: "flex", marginLeft: "45rem" }}>
        <p
          style={{
            backgroundColor: "#ffffff",
            color: "#ffffff",
            border: "solid #59b200 2px",
            borderRadius: "0.2rem",
          }}
        >
          aaa
        </p>
        &nbsp;&nbsp;
        <p>Available</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p
          style={{
            backgroundColor: "#59b200",
            color: "#59b200",
            border: "solid #59b200 2px",
            borderRadius: "0.2rem",
          }}
        >
          aaa
        </p>
        &nbsp;&nbsp;
        <p>Selected</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p
          style={{
            backgroundColor: "#d6d6d6",
            color: "#d6d6d6",
            border: "solid #d6d6d6 2px",
            borderRadius: "0.2rem",
          }}
        >
          aaa
        </p>
        &nbsp;&nbsp;
        <p>Sold Out</p>
      </div>
      <Seatbooking />
    </div>
  );
}
