import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "1rem",
  },
  posterAndInfo: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
  },
  poster: {
    width: "300px",
    height: "450px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  movieInfo: {
    margin: "1rem 0",
    flex: 1,
  },
  metaText: {
    fontSize: "1.1rem",
    color: "#555",
    margin: "0.5rem 0",
  },
  dateList: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    marginTop: "1.5rem",
  },
  dateBox: (isSelected) => ({
    border: "2px solid #FF5295",
    width: "5rem",
    height: "7rem",
    textAlign: "center",
    borderRadius: "1rem",
    cursor: "pointer",
    backgroundColor: isSelected ? "#FF5295" : "white",
    color: isSelected ? "white" : "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: isSelected ? "0 0 10px rgba(255,82,149,0.6)" : "none",
  }),
  showCard: {
    width: "100%",
    display: "flex",
    gap: "1.25rem",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "0.75rem",
    marginBottom: "1rem",
    alignItems: "center",
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  theatreImg: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
  button: {
    width: "10.3125rem",
    height: "2.5rem",
    borderRadius: "0.9375rem",
    border: "1px solid",
    opacity: 0.7,
    color: "#4CAF50",
    backgroundColor: "white",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function MovieShowSelection() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [movie, setMovie] = useState(null);
  const [movieError, setMovieError] = useState(null);
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState({});
  const [theatres, setTheatres] = useState({});
  const [showsError, setShowsError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsError, setReviewsError] = useState(null);

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
    startDate: m.start_date,
    endDate: m.end_date,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/movies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Movie not found");
        return res.json();
      })
      .then((data) => setMovie(transformMovie(data)))
      .catch((err) => {
        console.error("Failed to load movie:", err);
        setMovieError("Could not load movie details.");
      });
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/shows`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching shows");
        return res.json();
      })
      .then((data) => {
        const allShows = Array.isArray(data.data) ? data.data : data;
        const filtered = allShows.filter(
          (show) => String(show.movie_id) === String(id)
        );
        setShows(filtered);

        const uniqueMovieIds = [
          ...new Set(filtered.map((show) => show.movie_id)),
        ];
        const uniqueTheatreIds = [
          ...new Set(filtered.map((show) => show.theatre_id)),
        ];

        uniqueMovieIds.forEach((mId) => {
          fetch(`${import.meta.env.VITE_API_BASE_URL}/movies/${mId}`)
            .then((res) => res.json())
            .then((movieData) =>
              setMovies((prev) => ({ ...prev, [mId]: movieData }))
            );
        });

        uniqueTheatreIds.forEach((tId) => {
          fetch(`${import.meta.env.VITE_API_BASE_URL}/theatres/${tId}`)
            .then((res) => res.json())
            .then((theatreData) =>
              setTheatres((prev) => ({ ...prev, [tId]: theatreData }))
            );
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        setShowsError("Could not load shows.");
      });
  }, [id]);

  // Fetch all reviews
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching reviews");
        return res.json();
      })
      .then((data) => {
        const allReviews = Array.isArray(data.data) ? data.data : data;
        setReviews(allReviews);
      })
      .catch((err) => {
        console.error("Error loading reviews:", err);
        setReviewsError("Could not load reviews.");
      });
  }, []);

  if (movieError) return <div style={{ color: "red" }}>{movieError}</div>;
  if (!movie) return <div>Loading movie details...</div>;

  // Calculate average rating
  const movieReviews = reviews.filter(
    (review) => String(review.movie_id) === String(id)
  );
  const averageRating =
    movieReviews.length > 0
      ? (
          movieReviews.reduce((sum, r) => sum + Number(r.rating), 0) /
          movieReviews.length
        ).toFixed(1)
      : "3.0";

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(
    movie.startDate.year,
    movie.startDate.month - 1,
    movie.startDate.day
  );
  const endDate = new Date(
    movie.endDate.year,
    movie.endDate.month - 1,
    movie.endDate.day
  );

  const firstDate = startDate > today ? startDate : today;

  const uniqueDates = [];
  let currentDate = new Date(firstDate);
  while (currentDate <= endDate) {
    uniqueDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <div style={styles.container}>
      <div style={styles.posterAndInfo}>
        <div>
          <img
            src={movie.posterImage}
            alt={movie.title}
            style={styles.poster}
          />
        </div>
        <div style={styles.movieInfo}>
          <h1>{movie.title}</h1>
          <p style={styles.metaText}>
            {movie.runtime} min | {movie.genre} | User Rating {averageRating}/5
            | {movie.languages.join(", ")}
          </p>
          <p>{movie.description}</p>
          {reviewsError && <p style={{ color: "red" }}>{reviewsError}</p>}
          <div style={styles.dateList}>
            {uniqueDates.map((dateObj, index) => {
              const isSelected =
                selectedDate?.toDateString() === dateObj.toDateString();
              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(dateObj)}
                  style={styles.dateBox(isSelected)}
                >
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {dateObj.toLocaleString("default", { month: "short" })}
                  </p>
                  <p style={{ margin: 0, fontSize: "1.2rem" }}>
                    {dateObj.getDate()}
                  </p>
                  <p style={{ margin: 0 }}>
                    {dateObj.toLocaleString("default", { weekday: "short" })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div>
          <p style={{ fontWeight: "bold" }}>
            Available Shows on{" "}
            {selectedDate.toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
          {showsError ? (
            <div style={{ color: "red" }}>{showsError}</div>
          ) : (
            (() => {
              const showsForSelectedDate = Object.values(groupedShows).filter(
                (group) =>
                  new Date(group.date).toDateString() ===
                  selectedDate.toDateString()
              );
              if (showsForSelectedDate.length === 0) {
                return (
                  <p style={{ marginTop: "0.5rem" }}>
                    No shows available for this date.
                  </p>
                );
              }
              return showsForSelectedDate.map(({ theatre_id, date, shows }) => {
                const theatre = theatres[theatre_id];
                return (
                  <div key={`${theatre_id}-${date}`} style={styles.showCard}>
                    <img
                      src={theatre?.theatre_image || "/placeholder.jpg"}
                      alt={theatre?.theatre_name || "Theatre"}
                      style={styles.theatreImg}
                    />
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
                            <button style={styles.button}>
                              <div>
                                {new Date(show.start_time).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}{" "}
                                -{" "}
                                {new Date(show.end_time).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              });
            })()
          )}
        </div>
      )}
    </div>
  );
}
