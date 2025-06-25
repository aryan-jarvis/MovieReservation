import { useNavigate } from "react-router-dom";
import Head2 from "../components/Head2";
import Man_theatre_card from "../components/Man_theatre_card";

export default function ListTheatre() {
  const navigate = useNavigate();
  const handleAddTheatreClick = () => {
    navigate("/addT");
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
          <a href="/listT" style={{ color: "black", textDecoration: "none" }}>
            <p>Theatre Management</p>
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
            Manage Theatres
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
            onClick={handleAddTheatreClick}
          >
            + Add New Theatre
          </button>
        </div>

        <Man_theatre_card />
        <Man_theatre_card />
        <Man_theatre_card />
        <Man_theatre_card />
      </div>
    </div>
  );
}
