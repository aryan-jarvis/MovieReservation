import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MovieCard() {
  const [searchParams] = useSearchParams();
  const showId = searchParams.get("showId");
  const time = searchParams.get("time");

  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/showAdmin")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch shows");
        return res.json();
      })
      .then((data) => {
        const found = data.data?.find((s) => String(s.ID) === String(showId));
        if (!found) throw new Error("Show not found");
        setShow(found);
      })
      .catch((err) => {
        console.error("Error loading show:", err);
        setError("Could not load show details.");
      });
  }, [showId]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!show) return <div>Loading...</div>;

  return (
    <div style={styles.card}>
      <img src={show.posterImage} alt={show.movie} style={styles.image} />
      <div style={styles.content}>
        <div style={styles.title}>{show.movie}</div>
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
