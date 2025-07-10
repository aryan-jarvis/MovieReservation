import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HeadProfile from "./HeadProfile";
import Footer from "./Footer";
import PostRating from "./PostRating";
import MovieCard from "./MovieCard";

export default function Movie_Description_Page() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [error, setError] = useState(null);

  const formatDate = (dateObj) => {
    if (!dateObj) return "N/A";
    if (typeof dateObj === "string") {
      return new Date(dateObj).toISOString().split("T")[0];
    }
    const { day, month, year } = dateObj;
    if (!day || !month || !year) return "N/A";
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  };

  const transformMovie = (m) => ({
    ID: m.movie_id,
    title: m.movie_name,
    description: m.movie_description,
    genre: m.genre,
    languages: Array.isArray(m.languages) ? m.languages : [],
    posterImage: m.poster_url,
    status: m.movie_status,
    startDate: formatDate(m.start_date),
    endDate: formatDate(m.end_date),
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/movies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Movie not found");
        return res.json();
      })
      .then((data) => {
        console.log("Single movie response:", data);
        setMovie(transformMovie(data));
      })
      .catch((err) => {
        console.error("Failed to load movie:", err);
        setError("Could not load movie details.");
      });

    fetch(`${import.meta.env.VITE_API_BASE_URL}/movies`)
      .then((res) => res.json())
      .then((res) => {
        console.log("All movies response:", res);
        const movies = (res || []).map(transformMovie);
        setRelatedMovies(movies);
      })
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
            <strong>Languages:</strong> {movie.languages.join(", ")}
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
          <Link to={`/theatre/${movie.ID}`}>
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
          </Link>
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
