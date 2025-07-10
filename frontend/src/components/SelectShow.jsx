import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const buttonStyle = {
  width: "10.3125rem",
  height: "2.5rem",
  borderRadius: "0.9375rem",
  borderWidth: "0.0625rem",
  borderStyle: "solid",
  opacity: 0.7,
  color: "#4CAF50",
  backgroundColor: "white",
  fontSize: "1rem",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function SelectShow() {
  const { id: movieId } = useParams();

  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState({});
  const [theatres, setTheatres] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/shows`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching shows");
        return res.json();
      })
      .then((data) => {
        const allShows = Array.isArray(data.data) ? data.data : data;
        const filtered = allShows.filter(
          (show) => String(show.movie_id) === String(movieId)
        );
        setShows(filtered);

        const uniqueMovieIds = [
          ...new Set(filtered.map((show) => show.movie_id)),
        ];
        const uniqueTheatreIds = [
          ...new Set(filtered.map((show) => show.theatre_id)),
        ];

        uniqueMovieIds.forEach((id) => {
          fetch(`${import.meta.env.VITE_API_BASE_URL}/movies/${id}`)
            .then((res) => {
              if (!res.ok) throw new Error("Error fetching movie " + id);
              return res.json();
            })
            .then((movie) => {
              setMovies((prev) => ({ ...prev, [id]: movie }));
            })
            .catch((err) => console.error(err));
        });

        uniqueTheatreIds.forEach((id) => {
          fetch(`${import.meta.env.VITE_API_BASE_URL}/theatres/${id}`)
            .then((res) => {
              if (!res.ok) throw new Error("Error fetching theatre " + id);
              return res.json();
            })
            .then((theatre) => {
              setTheatres((prev) => ({ ...prev, [id]: theatre }));
            })
            .catch((err) => console.error(err));
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Could not load shows.");
      });
  }, [movieId]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (shows.length === 0) return <p>No shows available for this movie.</p>;

  // Group shows by theatre_id + date
  const groupedShows = shows.reduce((acc, show) => {
    const key = `${show.theatre_id}_${show.date}`;
    if (!acc[key]) {
      acc[key] = {
        theatre_id: show.theatre_id,
        date: show.date,
        shows: [],
      };
    }
    acc[key].shows.push(show);
    return acc;
  }, {});

  return (
    <div>
      {Object.values(groupedShows).map(({ theatre_id, date, shows }) => {
        const theatre = theatres[theatre_id];
        const movie = movies[movieId];

        return (
          <div
            key={`${theatre_id}-${date}`}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "0.75rem",
              marginBottom: "1rem",
              alignItems: "center",
            }}
          >
            <div>
              <img
                src={theatre?.theatre_image || "/placeholder.jpg"}
                alt={movie?.movie_name || "Movie Poster"}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {theatre?.theatre_name || "Unknown Theatre"}
              </p>
              <p>{new Date(date).toDateString()}</p>
              <p style={{ marginTop: "0.25rem", color: "#666" }}>
                {theatre?.theatre_location || ""}
              </p>
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {shows.map((show) => (
                  <Link
                    key={show.show_id}
                    to={`/seatselect/${show.show_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      style={buttonStyle}
                      title={`Ends at ${show.end_time}`}
                    >
                      <div>
                        {new Date(show.start_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" - "}
                        {new Date(show.end_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
