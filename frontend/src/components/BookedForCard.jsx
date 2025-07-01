import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard() {
  return (
    <div style={styles.card}>
      <img
        src="/images/harrypotter.png"
        alt="Movie Poster"
        style={styles.image}
      />
      <div style={styles.content}>
        <p style={styles.label}>Booked for:</p>
        <p style={styles.title}>Alice in Wonderland</p>
        <p style={styles.location}>Cinepolis: Pacific NSP2, Delhi</p>
        <p style={styles.time}>2 hours ago</p>
      </div>
      <div style={styles.actions}>
        <Link to="/ticket">
          <button style={styles.button}>View Ticket</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    border: "0.1rem solid #e0dfdf",
    backgroundColor: "#ffffff",
    height: "8.68rem",
    borderRadius: "1rem",
    padding: "0.5rem",
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
    margin: "0.2rem auto",
  },
  image: {
    width: "8rem",
    height: "8.68rem",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
  content: {
    marginLeft: "1rem",
    flexGrow: 1,
  },
  label: {
    fontSize: "1rem",
    margin: 0,
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
    margin: "0.2rem 0",
  },
  location: {
    fontSize: "0.8rem",
    color: "#555",
    margin: "0.2rem 0",
  },
  time: {
    fontSize: "0.8rem",
    color: "#888",
    margin: "0.2rem 0",
  },
  actions: {
    marginLeft: "auto",
    paddingRight: "1rem",
  },
  button: {
    backgroundColor: "#ff5295",
    color: "white",
    height: "3rem",
    width: "8.5rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
