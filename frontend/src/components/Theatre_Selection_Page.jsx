import AzaadDates from "./AzaadDates";
import HeadProfile from "./HeadProfile";
import SelectShow from "./SelectShow";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function Theatre_Selection_Page() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
      <div style={{ display: "flex" }}>
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
        <p>/ Show Time</p>
      </div>
      <AzaadDates />
      <SelectShow />
      <Footer />
    </div>
  );
}
