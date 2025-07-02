import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthPopUp() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("loginPopUpClosed");
    return saved !== "true";
  });

  const handleRegister = async () => {
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Name and email cannot be empty.");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          name,
          email,
          password,
        }
      );

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", name);
      localStorage.setItem("loginPopUpClosed", "true");

      navigate(`/home/?user=${encodeURIComponent(name)}`);
      setIsOpen(false);
    } catch (error) {
      // console.error(
      //   "Registration failed:",
      //   error.response?.data?.error || error.message
      // );
      const message =
        error.response?.data?.error || "Registration failed. Please try again.";
      setErrorMessage(message);
      console.error("Registration failed:", message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        { email, password }
      );

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("loginPopUpClosed", "true");

      navigate(`/home/?user=${encodeURIComponent(email)}`);
      setIsOpen(false);
    } catch (error) {
      // console.error(
      //   "Login Failed:",
      //   error.response?.data?.error || error.message
      // );
      const message =
        error.response?.data?.error || "Login failed. Please try again.";
      setErrorMessage(message);
      console.error("Login failed:", message);
    }
  };

  const styles = {
    container: {
      width: "100%",
      maxWidth: "37.5rem",
      margin: "3rem auto",
      backgroundColor: "#fff",
      borderRadius: "0.625rem",
      padding: "3rem",
      boxShadow: "0 0.5rem 1.25rem rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
    },
    title: {
      marginBottom: "2rem",
      textAlign: "center",
      fontSize: "2rem",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "0.875rem",
      marginBottom: "1.5rem",
      fontSize: "1.1rem",
      border: "1px solid #ccc",
      borderRadius: "0.375rem",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "0.875rem",
      fontSize: "1.1rem",
      backgroundColor: "#FF5295",
      color: "#fff",
      border: "none",
      borderRadius: "0.375rem",
      cursor: "pointer",
      marginBottom: "1.5rem",
    },
    toggleButton: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      backgroundColor: "#f1f1f1",
      color: "#333",
      border: "1px solid #ccc",
      borderRadius: "0.375rem",
      cursor: "pointer",
    },
    errorBox: {
      color: "red",
      backgroundColor: "#ffe6e6",
      padding: "0.6rem",
      borderRadius: "0.4rem",
      marginBottom: "1rem",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isRegister ? "Register" : "Login"} 👋</h1>

      {errorMessage && <div style={styles.errorBox}>{errorMessage}</div>}

      {isRegister && (
        <input
          placeholder="Name"
          type="text"
          style={styles.input}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        placeholder="Email"
        type="email"
        style={styles.input}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        style={styles.input}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* <button style={styles.button}>{isRegister ? "Register" : "Login"}</button> */}

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

      <button
        style={styles.toggleButton}
        onClick={() => {
          setIsRegister((prev) => !prev);
          setErrorMessage("");
        }}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
}
