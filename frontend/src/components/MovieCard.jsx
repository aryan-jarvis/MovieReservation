import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const styles = {
  card: {
    width: "250px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
  },
  content: {
    padding: "16px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "8px",
  },
  rating: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1976d2",
  },
  actions: {
    padding: "16px",
  },
  link: {
    textDecoration: "none",
    display: "block",
  },
  button: {
    width: "100%",
    padding: "10px 16px",
    backgroundColor: "#FF5295",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

const MovieCard = ({
  id,
  title = "Untitled",
  genre = "Unknown",
  languages = [],
  posterImage = "/fallback.jpg",
  rating = 4.5,
  status = "",
}) => {
  return (
    <>
      <div className="movie-card" style={styles.card}>
        <img
          src={posterImage || "/fallback.jpg"}
          alt={title}
          style={styles.image}
        />
        <div style={styles.content}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.subtitle}>
            {genre} | {(languages || []).join(", ")}
          </p>
          <p style={styles.rating}>{rating} ★★★★☆</p>
        </div>
        <div style={styles.actions}>
          <Link
            to={`/description/${id}`}
            state={{
              movie: {
                id,
                title,
                genre,
                languages,
                posterImage,
                rating,
                status,
              },
            }}
            style={styles.link}
          >
            <button className="movie-button" style={styles.button}>
              Book Now
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        .movie-card:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .movie-button:hover {
          background-color: #e74786;
        }
      `}</style>
    </>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  genre: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  posterImage: PropTypes.string,
  rating: PropTypes.number,
  status: PropTypes.string,
};

export default MovieCard;
