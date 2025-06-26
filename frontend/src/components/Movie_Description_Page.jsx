import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeadProfile from "./HeadProfile";
import Footer from "./Footer";
import PostRating from "./PostRating";
import MovieCard from "./MovieCard";

export default function Movie_Description_Page() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/cinemas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Movie not found");
        return res.json();
      })
      .then((data) => setMovie(data.data))
      .catch((err) => {
        console.error("Failed to load movie:", err);
        setError("Could not load movie details.");
      });

    fetch("http://localhost:8080/cinemas")
      .then((res) => res.json())
      .then((res) => setRelatedMovies(res.data || []))
      .catch((err) => console.error("Failed to load related movies:", err));
  }, [id]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!movie) return <div>Loading movie details...</div>;

  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />

      <div style={{ display: "flex" }}>
        <a href="/" style={{ color: "black", textDecoration: "none" }}>
          <p>Home</p>
        </a>
        &nbsp;<p>/ {movie.title}</p>
      </div>

      {/* Movie details */}
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <img
          src={movie.posterImage}
          alt={movie.title}
          style={{
            width: "300px",
            height: "450px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Languages:</strong> {movie.languages?.join(", ")}
          </p>
          <p>
            <strong>Status:</strong> {movie.status}
          </p>
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
          <p>
            <strong>Show Dates:</strong> {movie.startDate} to {movie.endDate}
          </p>
          <a href="http://localhost:5173/theatre">
            <button
              style={{
                marginLeft: "4rem",
                marginTop: "2rem",
                width: "12rem",
                height: "3rem",
                padding: "10px 20px",
                fontSize: "1.3rem",
                cursor: "pointer",
                backgroundColor: "#FF5295",
                color: "white",
                border: "none",
                borderRadius: "0.25rem",
              }}
            >
              Book Now
            </button>
          </a>
        </div>
      </div>

      <PostRating />

      <h2 style={{ marginTop: "3rem" }}>You might also like</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
        {relatedMovies
          .filter((m) => m.ID !== movie.ID)
          .slice(0, 6)
          .map((m) => (
            <MovieCard
              key={m.ID}
              id={m.ID}
              title={m.title}
              genre={m.genre}
              languages={m.languages}
              posterImage={m.posterImage}
              status={m.status}
            />
          ))}
      </div>

      <Footer />
    </div>
  );
}
