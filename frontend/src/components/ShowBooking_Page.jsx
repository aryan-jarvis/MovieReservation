import { Link, useParams } from "react-router-dom";
import HeadProfile from "./HeadProfile";
import Seatbooking from "./Seatbooking";
import AzaadPvr from "./AzaadPvr";

export default function ShowBooking_Page() {
  const { showId } = useParams();

  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
      {/* <div style={{ display: "flex" }}>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <p>Home</p>
        </Link>
        &nbsp;
        <Link
          to="/description"
          style={{ color: "black", textDecoration: "none" }}
        >
          <p>/ Movie</p>
        </Link>
        &nbsp;
        <Link to="/theatre" style={{ color: "black", textDecoration: "none" }}>
          <p>/ Show Time</p>
        </Link>
        &nbsp;
        <p>/ Show Booking</p>
      </div> */}
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
      <Seatbooking showId={showId} />
    </div>
  );
}
