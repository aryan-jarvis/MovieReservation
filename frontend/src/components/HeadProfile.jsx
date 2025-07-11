import { useState, useEffect } from "react";
import SearchDropDown from "./SearchDropDown";
import { useNavigate, Link } from "react-router-dom";

export default function HeadProfile() {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // <-- new state

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedIsAdmin = localStorage.getItem("isAdmin"); // Capital A here!

    if (storedUser) {
      setUsername(storedUser);
    }

    if (storedIsAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("loginPopupClosed");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    localStorage.clear();
    setUsername(null);
    setIsAdmin(false);
    window.location.href = "/";
  };

  const handleAdmin = () => {
    navigate("/home");
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
        {/* <div>
          <SearchDropDown />
        </div> */}

        {username && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {isAdmin && (
              <button
                onClick={handleAdmin}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#FF5295",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Admin
              </button>
            )}
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
