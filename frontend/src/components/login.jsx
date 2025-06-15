import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const api = axios.create({ baseURL: "http://localhost:8080" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setUser(res.data);
      setError("");
    } catch (err) {
      setError("Signup failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/users"); // Get all users
      const found = res.data.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (found) {
        setUser(found);
        setError("");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setForm({ email: "", password: "", name: "" });
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: 400,
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          <p style={{ color: "red" }}>{error}</p>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
