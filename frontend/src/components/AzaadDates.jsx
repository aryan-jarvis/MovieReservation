import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function AzaadDates() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const dates = [
    { month: "May", date: 21, day: "Wed" },
    { month: "May", date: 22, day: "Thu" },
    { month: "May", date: 23, day: "Fri" },
    { month: "May", date: 24, day: "Sat" },
    { month: "May", date: 25, day: "Sun" },
    { month: "May", date: 26, day: "Mon" },
    { month: "May", date: 27, day: "Tue" },
  ];

  const transformMovie = (m) => ({
    id: m.movie_id,
    title: m.movie_name,
    description: m.movie_description,
    posterImage: m.poster_url,
    runtime: m.duration,
    genre: m.genre,
    rating: m.rating,
    languages: Array.isArray(m.languages)
      ? m.languages
      : typeof m.languages === "string"
      ? JSON.parse(m.languages)
      : [],
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/movies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Movie not found");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched movie data:", data);
        setMovie(transformMovie(data)); // or just `data` if backend doesn't wrap it
      })
      .catch((err) => {
        console.error("Failed to load movie:", err);
        setError("Could not load movie details.");
      });
  }, [id]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!movie) return <div>Loading movie details...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <div>
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
      </div>
      <div style={{ margin: "1rem 0", flex: "1" }}>
        <h1>{movie.title}</h1>
        <p style={{ fontSize: "1.1rem", color: "#555", margin: "0.5rem 0" }}>
          {movie.runtime} min | {movie.genre} | Rating {movie.rating}/10 |{" "}
          {movie.languages.join(", ")}
        </p>
        <p>{movie.description}</p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "1.5rem",
          }}
        >
          {dates.map((d, index) => (
            <div
              key={index}
              onClick={() => setSelectedDate(index)}
              style={{
                border: "2px solid #FF5295",
                width: "5rem",
                height: "7rem",
                textAlign: "center",
                borderRadius: "1rem",
                cursor: "pointer",
                backgroundColor: selectedDate === index ? "#FF5295" : "white",
                color: selectedDate === index ? "white" : "black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow:
                  selectedDate === index
                    ? "0 0 10px rgba(255,82,149,0.6)"
                    : "none",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold" }}>{d.month}</p>
              <p style={{ margin: 0, fontSize: "1.2rem" }}>{d.date}</p>
              <p style={{ margin: 0 }}>{d.day}</p>
            </div>
          ))}
        </div>
        {selectedDate !== null && (
          <div style={{ marginTop: "1rem" }}>
            <Link
              to={`/selectshow/${id}`}
              style={{
                textDecoration: "none",
                backgroundColor: "#FF5295",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                display: "inline-block",
              }}
            >
              Select Show
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
