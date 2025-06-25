import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Head2 from "../components/Head2";

export default function AddShow() {
  const navigate = useNavigate();

  const [movieName, setMovieName] = useState("");
  const [theatreName, setTheatreName] = useState("");
  const [languages, setLanguages] = useState([]);
  const [timings, setTimings] = useState([]);
  const [poster, setPoster] = useState("");

  useEffect(() => {
    setMovieName("");
    setTheatreName("");
    setLanguages([]);
    setTimings([]);
    setPoster("");
  }, []);

  const handleLanguageChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setLanguages(selected);
  };

  const handleTimingAdd = () => {
    const start = prompt("Enter Start Time:");
    const end = prompt("Enter End Time:");
    if (start && end) setTimings([...timings, `${start} - ${end}`]);
  };

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => setPoster(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddShow = () => {
    const newShow = {
      name: movieName,
      theatre: theatreName,
      languages,
      timings,
      poster,
    };

    const existing = JSON.parse(localStorage.getItem("shows") || "[]");
    localStorage.setItem("shows", JSON.stringify([...existing, newShow]));

    setMovieName("");
    setTheatreName("");
    setLanguages([]);
    setTimings([]);
    setPoster("");

    navigate("/listS");
  };

  const cancelClick = () => navigate("/listS");

  const styles = {
    container: {},
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginLeft: "2rem",
    },
    formWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    formBox: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    label: {
      fontWeight: "600",
      fontSize: "1.4rem",
    },
    input: {
      height: "0.35rem",
      padding: "1rem",
      border: "0.1rem #A1A2A4 solid",
      borderRadius: "0.3rem",
      fontSize: "1rem",
    },
    select: {
      height: "2.5rem",
      padding: "0.6rem",
      border: "0.1rem #A1A2A4 solid",
      borderRadius: "0.3rem",
      fontSize: "1rem",
      backgroundColor: "white",
    },
    selectRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: "2rem",
    },
    posterSection: {
      fontWeight: "600",
    },
    posterUpload: {
      width: "9rem",
      height: "6rem",
      border: "0.1rem #5A5A61 dotted",
      borderRadius: "1rem",
      paddingTop: "1rem",
      textAlign: "center",
    },
    posterImage: {
      marginTop: "0.5rem",
      width: "100px",
    },
    buttonsRow: {
      display: "flex",
      gap: "20px",
      marginTop: "1rem",
    },
    addButton: {
      backgroundColor: "#FF5295",
      color: "#fff",
      fontWeight: "600",
      width: "6rem",
      height: "2.5rem",
      border: "solid 0.1rem white",
      borderRadius: "0.3rem",
    },
    cancelButton: {
      backgroundColor: "#fff",
      color: "black",
      fontWeight: "600",
      width: "6rem",
      height: "2.5rem",
      border: "solid 0.1rem #FF5295",
      borderRadius: "0.3rem",
    },
  };

  return (
    <div>
      <Head2 />
      <span style={styles.breadcrumb}>
        <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
          <p>Home</p>
        </a>
        <p> / </p>
        <a href="/listS" style={{ color: "grey", textDecoration: "none" }}>
          <p>Showtime Scheduling</p>
        </a>
        <p> / </p>
        <p style={{ color: "#000" }}>Add New Showtime</p>
      </span>

      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.formBox}>
            <p style={styles.label}>Basic Info</p>

            <input
              type="text"
              placeholder="Movie Name"
              style={styles.input}
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Theatre Name"
              style={styles.input}
              value={theatreName}
              onChange={(e) => setTheatreName(e.target.value)}
            />

            <div style={styles.selectRow}>
              <input type="date" style={{ ...styles.input, width: "50%" }} />
              <select
                multiple
                value={languages}
                onChange={handleLanguageChange}
                style={{ ...styles.select, width: "50%" }}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
                <option value="Telugu">Telugu</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div style={{ border: "0.01rem black solid", padding: "1rem" }}>
              <h4>Add showtime</h4>
              <button onClick={handleTimingAdd}>+ Add Timing</button>
              {timings.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
            </div>

            <div style={styles.posterSection}>
              Poster Upload (PNG only):
              <div style={styles.posterUpload}>
                <input
                  type="file"
                  accept="image/png"
                  onChange={handlePosterUpload}
                />
                {poster && (
                  <img src={poster} alt="Poster" style={styles.posterImage} />
                )}
              </div>
            </div>

            <div style={styles.buttonsRow}>
              <button style={styles.addButton} onClick={handleAddShow}>
                Add
              </button>
              <button style={styles.cancelButton} onClick={cancelClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
