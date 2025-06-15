import AzaadDates from "./AzaadDates";
import HeadProfile from "./HeadProfile";
import SelectShow from "./SelectShow";
import Footer from "./Footer";

export default function Theatre_Selection_Page() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
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
        <p>/ Show Time</p>
      </div>
      <AzaadDates />
      <SelectShow />
      <SelectShow />
      <SelectShow />
      <SelectShow />
      <SelectShow />
      <SelectShow />
      <SelectShow />
      <SelectShow />
      <Footer />
    </div>
  );
}
