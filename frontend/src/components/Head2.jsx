import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Head2() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleUser = () => {
    navigate("/");
  };

  return (
    <div style={styles.header}>
      <div style={styles.leftSection}>
        <Link to="/home">
          <img style={styles.logo} src="/images/logo.png" alt="Company Logo" />
        </Link>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search anything..."
            style={styles.searchInput}
          />
          <img
            src="/images/search_icon.png"
            alt="Search Icon"
            style={styles.searchIcon}
          />
        </div>
      </div>
      <div style={styles.rightSection}>
        <p style={styles.greeting}>Hi, {username || "Admin"}</p>
        <button onClick={handleUser} style={styles.homeButton}>
          Home Page
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "2rem",
    marginRight: "2rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  leftSection: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  rightSection: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  logo: {
    width: "auto",
    cursor: "pointer",
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "40rem",
  },
  searchIcon: {
    position: "absolute",
    right: "1rem",
  },
  searchInput: {
    padding: "0.5rem 2rem 0.5rem 1rem",
    fontSize: "1.2rem",
    borderRadius: "1rem",
    border: "1px solid #ccc",
    outline: "none",
    width: "40rem",
  },
  greeting: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    color: "#333",
  },
  homeButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    borderRadius: "0.5rem",
    border: "1px solid white",
    cursor: "pointer",
    backgroundColor: "#FF5295",
    color: "white",
  },
};
