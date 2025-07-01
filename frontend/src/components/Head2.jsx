import { useEffect, useState } from "react";
import SearchDropDown from "./SearchDropDown";
import { Link } from "react-router-dom";

export default function Head2() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("loginPopUpClosed");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUsername("");
    window.location.href = "/auth";
  };

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
      fontWeight: 500,
      color: "#333",
    },
    logoutButton: {
      padding: "0.5rem 1rem",
      fontSize: "0.9rem",
      borderRadius: "0.5rem",
      border: "1px solid white",
      cursor: "pointer",
      backgroundColor: "#FF5295",
      color: "white",
    },
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
        <SearchDropDown />
        <img
          style={styles.logo}
          src="/images/user_logo.png"
          alt="User Profile Logo"
        />
        <p style={styles.greeting}>Hi, {username || "Guest"}</p>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}
