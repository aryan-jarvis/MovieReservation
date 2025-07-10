import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AzaadPvr() {
  const { showId } = useParams();

  const [show, setShow] = useState(null);
  const [movie, setMovie] = useState(null);
  const [theatre, setTheatre] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!showId) {
      setError("Missing showId in URL.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/shows/${showId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch show");
        return res.json();
      })
      .then((data) => {
        const s = data.data || data;
        setShow(s);

        // 2. Fetch movie by movie_id
        fetch(`${import.meta.env.VITE_API_BASE_URL}/movies/${s.movie_id}`)
          .then((res) => res.json())
          .then((data) => setMovie(data.data || data))
          .catch((err) => {
            console.error(err);
            setError("Could not load movie details.");
          });

        // 3. Fetch theatre by theatre_id
        fetch(`${import.meta.env.VITE_API_BASE_URL}/theatres/${s.theatre_id}`)
          .then((res) => res.json())
          .then((data) => setTheatre(data.data || data))
          .catch((err) => {
            console.error(err);
            setError("Could not load theatre details.");
          });
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load show details.");
      });
  }, [showId]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!show || !movie || !theatre) return <div>Loading...</div>;

  return (
    <div style={styles.card}>
      <img
        src={movie.poster_url || "/placeholder.jpg"}
        alt={movie.movie_name}
        style={styles.image}
      />
      <div style={styles.content}>
        <div style={styles.title}>{movie.movie_name}</div>
        <div style={styles.subtitle}>
          {theatre.theatre_name} |{" "}
          {new Date(show.start_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(show.end_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
