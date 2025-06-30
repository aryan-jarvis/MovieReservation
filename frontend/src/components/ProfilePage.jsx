import React, { useState, useEffect } from "react";
import HeadProfile from "./HeadProfile";
import ProfileHistory from "./ProfileHistory";

export default function ProfilePage() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [originalUsername, setOriginalUsername] = useState(null);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("username");
  //   const storedEmail = localStorage.getItem("email");
  //   if (storedUser) setUsername(storedUser);
  //   if (storedEmail) setEmail(storedEmail);
  // }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    if (storedUser) {
      setUsername(storedUser);
      setOriginalUsername(storedUser);
    }
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("loginPopupClosed");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUsername(null);
    setEmail(null);
    window.location.href = "http://localhost:5173/";
  };

  // const handleSave = async () => {
  //   try {
  //     const userId = localStorage.getItem("userId");
  //     if (!userId) {
  //       alert("User ID not found.");
  //       return;
  //     }

  //     // const res = await fetch(`http://localhost:8080/users/${userId}`, {
  //     //   method: "PUT",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify({
  //     //     name: username,
  //     //     email: email,
  //     //   }),
  //     // });

  //     const res = await fetch(`http://localhost:8080/users/${username}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: username,
  //         email: email,
  //       }),
  //     });

  //     if (!res.ok) {
  //       const error = await res.json();
  //       alert(`Error updating profile: ${error.message}`);
  //       return;
  //     }

  //     const updatedUser = await res.json();
  //     alert("Profile updated successfully!");

  //     localStorage.setItem("username", updatedUser.Name);
  //     localStorage.setItem("email", updatedUser.Email);
  //   } catch (err) {
  //     console.error("Update failed:", err);
  //     alert("Something went wrong.");
  //   }
  // };

  const handleSave = async () => {
    try {
      if (!username) {
        alert("Username not found.");
        return;
      }

      const res = await fetch(
        `http://localhost:8080/users/${originalUsername}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            email: email,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(`Error updating profile: ${error.message}`);
        return;
      }

      const updatedUser = await res.json();
      alert("Profile updated successfully!");

      localStorage.setItem("username", updatedUser.name);
      localStorage.setItem("email", updatedUser.email);
      setOriginalUsername(updatedUser.name);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
      <ProfileHistory />
      <div>
        <div style={styles.profileContainer}>
          <div style={styles.detailsSection}>
            <div style={styles.banner}>
              <div style={styles.bannerContent}>
                <span style={styles.profilePic}>
                  <img
                    src="../src/assets/images/camera.png"
                    alt="Camera"
                    style={styles.cameraIcon}
                  />
                </span>
                <p style={styles.greetingText}>
                  {username ? `Hi, ${username}` : "Hi, Guest"}
                </p>
              </div>
            </div>

            <div style={styles.detailsContainer}>
              <h2 style={styles.detailsHeading}>Personal Details</h2>

              <span style={styles.inputGroup}>
                <p style={styles.label}>Name</p>
                <input
                  type="text"
                  placeholder="Enter name here"
                  style={styles.input}
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </span>

              <span style={styles.inputGroup}>
                <p style={styles.label}>Email Address</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={styles.input}
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
            </div>

            <div style={styles.buttonGroup}>
              <span style={styles.logoutButton}>
                <p style={styles.logoutText} onClick={handleLogout}>
                  Log out
                </p>
              </span>
              <span style={styles.saveButton}>
                <p style={styles.saveText} onClick={handleSave}>
                  Save
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  profileContainer: {
    width: "100%",
  },
  tabContainer: {
    backgroundColor: "#E2E0E0",
    padding: "0.5rem",
  },
  tabLinks: {
    display: "flex",
    alignItems: "center",
    gap: "3%",
    marginLeft: "2.4%",
  },
  detailsSection: {
    backgroundColor: "#F1F1F1",
    margin: "1.6rem 3%",
    height: "70vh",
    paddingTop: "2rem",
  },
  banner: {
    height: "6.4rem",
    width: "100%",
    background: "linear-gradient(to right, #2D3148, #E54D61)",
    position: "relative",
  },
  bannerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "2rem",
    paddingTop: "2rem",
    marginLeft: "12%",
  },
  profilePic: {
    width: "6.4rem",
    height: "6.2rem",
    borderRadius: "50%",
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    width: "3rem",
    height: "3rem",
    zIndex: 10,
  },
  greetingText: {
    fontSize: "1.25rem",
    color: "white",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: "2rem",
    // marginLeft: "22%",
    width: "100%",
    // backgroundColor: "green",
  },
  detailsHeading: {
    fontSize: "1.5rem",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: "1rem",
    marginLeft: "10rem",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "20rem",
    // backgroundColor: "yellow",
    width: "40%",
    fontSize: "1rem",
  },
  label: {
    // fontSize: "1rem",
    // maxWidth: "18%",
  },
  input: {
    width: "60%",
    height: "4rem",
    padding: "0.25rem",
    backgroundColor: "white",
    border: "1px solid #CCCCCC",
    borderRadius: "0.375rem",
    outline: "none",
    // marginRight: "20rem",
    // backgroundColor: "green",
    fontSize: "1rem",
    marginTop: "2rem",
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "4rem",
    gap: "1.5rem",
    maxWidth: "68%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  logoutButton: {
    width: "10%",
    height: "2rem",
    border: "1px solid #FF1414",
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.75rem",
    cursor: "pointer",
  },
  logoutText: {
    fontSize: "1rem",
    color: "#FF1414",
  },
  saveButton: {
    width: "10%",
    height: "2rem",
    backgroundColor: "#FF5295",
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.75rem",
    cursor: "pointer",
  },
  saveText: {
    fontSize: "1rem",
    color: "white",
  },
};
