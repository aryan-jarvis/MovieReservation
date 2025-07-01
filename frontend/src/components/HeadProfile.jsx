import { useState, useEffect } from "react";
import SearchDropDown from "./SearchDropDown";
import { useNavigate, Link } from "react-router-dom";

export default function HeadProfile() {
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("loginPopupClosed");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    // localStorage.clear();
    setUsername(null);
    navigate("/");
  };

  return (
    <div
      className="Header Profile Section"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="Left-Profile-Section"
        style={{ display: "flex", gap: "3rem" }}
      >
        <Link to="/">
          <img className="logo" src="/images/logo.png" alt="Company Logo" />
        </Link>
      </div>
      <div
        className="Right-Profile-Section"
        style={{ display: "flex", gap: "1rem" }}
      >
        <div>
          <SearchDropDown />
        </div>
        {username && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              Welcome, {username}
            </span>
            <img
              className="logo"
              src="/images/user_logo.png"
              alt="User Profile Logo"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/profile");
              }}
            />
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                backgroundColor: "#FF5295",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
