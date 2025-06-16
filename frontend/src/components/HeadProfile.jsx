import { useState, useEffect } from "react";
import SearchDropDown from "./SearchDropDown";

export default function HeadProfile() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("loginPopupClosed");
    setUsername(null);
    window.location.href = "http://localhost:5173/";
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
        <a href="http://localhost:5173/">
          <img
            className="logo"
            src="../src/assets/images/logo.png"
            alt="Company Logo"
          />
        </a>
      </div>
      <div
        className="Right-Profile-Section"
        style={{ display: "flex", gap: "1rem" }}
      >
        <div>
          <SearchDropDown />
        </div>
        <img
          className="logo"
          src="../src/assets/images/user_logo.png"
          alt="User Profile Logo"
        />
        {username && (
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
        )}
      </div>
    </div>
  );
}
