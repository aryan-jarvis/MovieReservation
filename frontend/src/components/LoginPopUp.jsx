import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPopUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("loginPopupClosed");
    return saved !== "true";
  });
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  axios.defaults.withCredentials = true;

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const handleRegister = async () => {
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Name and email cannot be empty.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    try {
      const registerRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        { name, email, password }
      );

      const token = registerRes.data.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.warn("No token returned from registration response");
      }

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("username", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("id", res.data.user_id);
      localStorage.setItem("isAdmin", res.data.is_admin);
      localStorage.setItem("loginPopupClosed", "true");

      window.location.href = "/";
      setIsOpen(false);
    } catch (error) {
      const message = error.response?.data?.error || "Registration failed.";
      setErrorMessage(message);
    }
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      setErrorMessage("Email cannot be empty.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Password cannot be empty.");
      return;
    }
    try {
      const loginRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        { email, password }
      );

      const token = loginRes.data.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.warn("No token returned from login response");
      }

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("username", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("id", res.data.user_id);
      localStorage.setItem("isAdmin", res.data.is_admin);
      localStorage.setItem("loginPopupClosed", "true");

      window.location.href = "/";
      setIsOpen(false);
    } catch (error) {
      const message = error.response?.data?.error || "Login failed.";
      setErrorMessage(message);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={styles.overlay} />
      <div style={styles.container}>
        <h1 style={styles.heading}>{isRegister ? "Register" : "Login"} 👋</h1>

        {errorMessage && <div style={styles.errorBox}>{errorMessage}</div>}

        {isRegister && (
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        )}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <div style={{ position: "relative" }}>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={styles.passwordToggle}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          onClick={isRegister ? handleRegister : handleLogin}
          style={styles.button}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setErrorMessage("");
          }}
          style={styles.secondaryButton}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 9,
  },
  container: {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "400px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  closeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#555",
  },
  heading: {
    fontSize: "1.75rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#333",
  },
  input: {
    margin: "0.5rem 0",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  inputFocused: {
    borderColor: "#FF5295",
  },
  passwordToggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#888",
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#FF5295",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    transition: "background-color 0.2s",
  },
  secondaryButton: {
    marginTop: "0.75rem",
    padding: "0.5rem",
    fontSize: "0.9rem",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#333",
    border: "none",
    textDecoration: "underline",
  },
  errorBox: {
    color: "#b00020",
    backgroundColor: "#ffe6e6",
    padding: "0.75rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "0.95rem",
  },
};
