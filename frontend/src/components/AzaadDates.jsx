import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  }, [id]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!movie) return <div>Loading movie details...</div>;

  return (
    <>
      <div className="Azaad" style={{ display: "flex" }}>
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
        <div style={{ margin: "100px" }}>
          <h1>{movie.title}</h1>
          <p>
            {movie.runtime} {movie.genre} | PG13+ |{" "}
            {movie.languages?.join(", ")}
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {dates.map((d, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(index)}
                style={{
                  border: "solid 0.2rem #FF5295",
                  width: "5rem",
                  height: "7rem",
                  textAlign: "center",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  backgroundColor: selectedDate === index ? "#FF5295" : "white",
                  color: selectedDate === index ? "white" : "black",
                  transition: "all 0.2s ease",
                }}
              >
                <p>{d.month}</p>
                <p>{d.date}</p>
                <p>{d.day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
