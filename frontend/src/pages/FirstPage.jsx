import { useNavigate } from "react-router-dom";

export default function FirstPage() {
  const navigate = useNavigate();
  const navUser = () => {
    navigate("/");
  };
  const navAdmin = () => {
    navigate("/auth");
  };

  const styles = {
    pageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
    },
    buttonContainer: {
      display: "flex",
      gap: "10rem",
      flexDirection: "row",
    },
    button: {
      padding: "15px 30px",
      fontSize: "1.2rem",
      border: "none",
      cursor: "pointer",
      borderRadius: "0.8rem",
      fontWeight: "bold",
      backgroundColor: "#FF5295",
      color: "white",
      transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
      backgroundColor: "#FF4064",
      transform: "scale(1.05)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    buttonActive: {
      backgroundColor: "#FF4064",
      transform: "scale(1.05)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.buttonContainer}>
        <button
          onClick={navUser}
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF4064")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF5295")}
          onMouseDown={(e) => (e.target.style.backgroundColor = "#FF4064")}
          onMouseUp={(e) => (e.target.style.backgroundColor = "#FF5295")}
        >
          User
        </button>
        <button
          onClick={navAdmin}
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF4064")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF5295")}
          onMouseDown={(e) => (e.target.style.backgroundColor = "#FF4064")}
          onMouseUp={(e) => (e.target.style.backgroundColor = "#FF5295")}
        >
          Admin
        </button>
      </div>
    </div>
  );
}
