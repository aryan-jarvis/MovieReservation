import { useNavigate } from "react-router-dom";
import Head2 from "../components/Head2";
import Man_show_card from "../components/Man_show_card";

export default function ListMovie() {
  const navigate = useNavigate();
  const handleAddShowClick = () => {
    navigate("/addS");
  };

  return (
    <div>
      <Head2 />
      <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
            <p>Home</p>
          </a>
          <p>/</p>
          <a href="/listS" style={{ color: "black", textDecoration: "none" }}>
            <p>Showtime Scheduling</p>
          </a>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Schedule Showtimes
          </h1>
          <button
            style={{
              padding: "1rem",
              backgroundColor: "#fff",
              color: "#FF5295",
              border: "2px solid #FF5295",
              borderRadius: "0.4rem",
              fontSize: "1rem",
            }}
            onClick={handleAddShowClick}
          >
            + Add New Showtime
          </button>
        </div>

        <Man_show_card />
        <Man_show_card />
        <Man_show_card />
        <Man_show_card />
      </div>
    </div>
  );
}
