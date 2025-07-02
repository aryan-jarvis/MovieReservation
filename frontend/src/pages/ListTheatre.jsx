import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Head2 from "../components/Head2";
import Man_theatre_card from "../components/Man_theatre_card";

export default function ListTheatre() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theatres, setTheatres] = useState([]);

  const getTheatresList = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/theatres`
      );
      const data = await response.json();
      setTheatres(data.data);
    } catch (error) {
      console.error("Error fetching theatres:", error);
    }
  };

  useEffect(() => {
    getTheatresList();
  }, [location]);

  const handleAddTheatreClick = () => {
    navigate("/addT");
  };

  return (
    <div>
      <Head2 />
      <div style={{ margin: "0 2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
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
            marginBottom: "1rem",
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
              cursor: "pointer",
            }}
            onClick={handleAddTheatreClick}
          >
            + Add New Theatre
          </button>
        </div>

        {theatres.length === 0 ? (
          <p>No theatres added yet.</p>
        ) : (
          theatres.map((theatre, index) => (
            <Man_theatre_card
              key={index}
              theatre={theatre}
              getTheatresList={getTheatresList}
            />
          ))
        )}
      </div>
    </div>
  );
}
