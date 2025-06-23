import SearchDropDown from "./SearchDropDown";

export default function Head2() {
  const styles = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
    },
    leftSection: {
      display: "flex",
      gap: "1.5rem",
      alignItems: "center",
    },
    rightSection: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    logo: {
      height: "2.5rem",
      width: "auto",
      cursor: "pointer",
    },
    searchContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    searchIcon: {
      position: "absolute",
      right: "0.625rem",
      width: "1rem",
      height: "1rem",
      pointerEvents: "none",
      opacity: 0.6,
    },
    searchInput: {
      padding: "0.5rem 2rem 0.5rem 1rem",
      fontSize: "1rem",
      borderRadius: "1rem",
      border: "1px solid #ccc",
      outline: "none",
      width: "15.625rem",
    },
    greeting: {
      margin: 0,
      fontSize: "1rem",
      fontWeight: 500,
      color: "#333",
    },
  };

  return (
    <div style={styles.header}>
      <div style={styles.leftSection}>
        <a href="http://localhost:5173/home">
          <img
            style={styles.logo}
            src="../src/assets/images/logo.png"
            alt="Company Logo"
          />
        </a>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search anything..."
            style={styles.searchInput}
          />
          <img
            src="../src/assets/images/search_icon.png"
            alt="Search Icon"
            style={styles.searchIcon}
          />
        </div>
      </div>
      <div style={styles.rightSection}>
        <SearchDropDown />
        <img
          style={styles.logo}
          src="../src/assets/images/user_logo.png"
          alt="User Profile Logo"
        />
        <p style={styles.greeting}>Hi, Rahul</p>
      </div>
    </div>
  );
}
