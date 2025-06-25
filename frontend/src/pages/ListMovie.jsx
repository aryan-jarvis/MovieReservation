import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Head2 from "../components/Head2";
import Man_movie_card from "../components/Man_movie_card";

export default function ListMovie() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
    setMovies(storedMovies);
  }, []);

  const handleAddMovieClick = () => {
    navigate("/addM");
  };

  return (
    <div>
      <Head2 />
      <div style={{ margin: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
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

        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie, index) => (
            <Man_movie_card
              key={index}
              title={movie.title}
              status={movie.status}
              languages={movie.languages}
              genre={movie.genre}
              description={movie.description}
              posterImage={movie.posterImage}
            />
          ))
        )}
      </div>
    </div>
  );
}
