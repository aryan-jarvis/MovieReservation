import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8080";

export default function LoginPopUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("loginPopupClosed");
    return saved !== "true";
  });
  const [isRegister, setIsRegister] = useState(true);

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API}/register`, {
        name,
        email,
        password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", name);
      localStorage.setItem("email", email);
      localStorage.setItem("loginPopupClosed", "true");

      navigate(`/?user=${encodeURIComponent(name)}`);

      setIsOpen(false);
    } catch (error) {
      const message =
        error.response?.data?.error || "Registration failed. Please try again.";
      setErrorMessage(message);
      console.error("Registration failed:", message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("email", email);
      localStorage.setItem("loginPopupClosed", "true");

      navigate(`/?user=${encodeURIComponent(email)}`);

      setIsOpen(false);
    } catch (error) {
      const message =
        error.response?.data?.error || "Login failed. Please try again.";
      setErrorMessage(message);
      console.error("Login failed:", message);
    }
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9,
    },
    container: {
      position: "fixed",
      top: "9rem",
      left: "calc(50% - 20rem)",
      width: "40rem",
      height: "40rem",
      backgroundColor: "#fffffa",
      borderRadius: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      // padding: "2rem",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "15px",
      background: "transparent",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#333",
    },
    input: {
      margin: "0.4rem",
      padding: "0.6rem",
      fontSize: "1.2rem",
      // width: "200px",
      width: "20rem",
      // backgroundColor: "green",
    },
    button: {
      marginTop: "1rem",
      // padding: "10px 20px",
      padding: "1rem",
      fontSize: "1rem",
      cursor: "pointer",
      backgroundColor: "#FF5295",
      color: "white",
      border: "none",
      borderRadius: "0.2rem",
    },
    errorBox: {
      color: "red",
      backgroundColor: "#ffe6e6",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "15px",
      width: "80%",
      textAlign: "center",
    },
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={styles.overlay} />
      <div style={styles.container}>
        {/* <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
          &times;
        </button> */}

        <h1>{isRegister ? "Register" : "Login"} 👋</h1>

        {errorMessage && <div style={styles.errorBox}>{errorMessage}</div>}

        {isRegister && (
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        )}

        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <div style={{ display: "flex" }}>
          {isRegister ? (
            <button onClick={handleRegister} style={styles.button}>
              Register
            </button>
          ) : (
            <button onClick={handleLogin} style={styles.button}>
              Login
            </button>
          )}
        </div>

        <div>
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMessage("");
            }}
            style={styles.button}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </>
  );
}
