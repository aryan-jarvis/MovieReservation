import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MovieCard() {
  const [searchParams] = useSearchParams();
  const showId = searchParams.get("showId");
  const time = searchParams.get("time");
  const movieId = searchParams.get("movieId");

  const [show, setShow] = useState(null);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!showId || !movieId) {
      setError("Missing showId or movieId in URL.");
      return;
    }

    // Fetch show details
    fetch(`${import.meta.env.VITE_API_BASE_URL}/showAdmin`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.data?.find((s) => String(s.ID) === String(showId));
        if (!found) throw new Error("Show not found");
        setShow(found);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load show details.");
      });

    // Fetch movie details
    fetch(`${import.meta.env.VITE_API_BASE_URL}/cinemas/${movieId}`)
      .then((res) => res.json())
      .then((data) => setMovie(data.data))
      .catch((err) => {
        console.error(err);
        setError("Could not load movie details.");
      });
  }, [showId, movieId]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!show || !movie) return <div>Loading...</div>; // Wait for both fetches

  return (
    <div style={styles.card}>
      <img src={movie.posterImage} alt={movie.title} style={styles.image} />
      <div style={styles.content}>
        <div style={styles.title}>{movie.title}</div>
        <div style={styles.subtitle}>
          {show.theatre} | {time}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    border: "1px solid #ddd",
    borderRadius: "1rem",
    padding: "1rem",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#555",
  },
};
