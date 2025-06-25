import { useNavigate } from "react-router-dom";
import Head2 from "../components/Head2";
import Man_movie_card from "../components/Man_movie_card";

export default function ListMovie() {
  const navigate = useNavigate();
  const handleAddMovieClick = () => {
    navigate("/addM");
  };

  return (
    <div>
      <Head2 />
      <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
            <p>Home</p>
          </a>
          <p>/</p>
          <a href="/listM" style={{ color: "black", textDecoration: "none" }}>
            <p>Movie Management</p>
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
            Manage Movies
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
            onClick={handleAddMovieClick}
          >
            + Add New Movie
          </button>
        </div>

        <Man_movie_card />
        <Man_movie_card />
        <Man_movie_card />
        <Man_movie_card />
      </div>
    </div>
  );
}
