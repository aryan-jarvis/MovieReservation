import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Head2 from "../components/Head2";
import axios from "axios";
import LanguageDropdown from "../components/LanguageDropdown";

export default function AddShow() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingShow = location.state?.show;

  const [movieName, setMovieName] = useState("");
  const [theatreName, setTheatreName] = useState("");
  const [date, setDate] = useState("");
  const [languages, setLanguages] = useState([]);
  const [timings, setTimings] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [poster, setPoster] = useState("");

  useEffect(() => {
    if (editingShow) {
      setMovieName(editingShow.movie || "");
      setTheatreName(editingShow.theatre || "");
      setDate(editingShow.date || "");
      setLanguages(editingShow.languages || []);
      setTimings(
        editingShow.showtime
          ? editingShow.showtime.split(",").map((s) => s.trim())
          : []
      );
      setPoster(editingShow.posterImage || "");
    } else {
      setMovieName("");
      setTheatreName("");
      setDate("");
      setLanguages([]);
      setTimings([]);
      setPoster("");
    }
  }, [editingShow]);

  const handleTimingAdd = () => {
    if (startTime && endTime) {
      setTimings([...timings, `${startTime} - ${endTime}`]);
      setStartTime("");
      setEndTime("");
    } else {
      alert("Please enter both start and end times.");
    }
  };

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => setPoster(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddShow = async () => {
    const newShow = {
      movie: movieName,
      theatre: theatreName,
      date,
      languages: Array.isArray(languages) ? languages : [],
      showtime: timings.length > 0 ? timings.join(", ") : "",
      posterImage: poster || "",
    };

    console.log("Submitting this show:", newShow);

    try {
      if (editingShow) {
        await axios.put(
          `http://localhost:8080/showAdmin/${editingShow.ID}`,
          newShow
        );
      } else {
        await axios.post("http://localhost:8080/showAdmin", newShow);
      }
      navigate("/listS");
    } catch (err) {
      console.error("Failed to save show:", err);
    }
  };

  const cancelClick = () => navigate("/listS");

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
        <p style={{ color: "#000" }}>
          {editingShow ? "Edit Showtime" : "Add New Showtime"}
        </p>
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
              <input
                type="date"
                style={{ ...styles.input, width: "50%" }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <LanguageDropdown
                selected={languages}
                setSelected={setLanguages}
              />
            </div>

            <div style={{ border: "0.01rem black solid", padding: "1rem" }}>
              <h4>Add showtime</h4>
              <div
                style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}
              >
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleTimingAdd}>+ Add Timing</button>
              </div>
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
                  style={{
                    opacity: 0,
                    position: "absolute",
                    width: "8rem",
                    height: "5rem",
                    cursor: "pointer",
                  }}
                />
                {poster ? (
                  <img src={poster} alt="Poster" style={styles.posterImage} />
                ) : (
                  <>
                    <img
                      src="../src/assets/images/upload.png"
                      alt="Upload"
                      style={{ width: "2rem" }}
                    />
                    <p style={{ fontSize: "12px", color: "#6B7280" }}>
                      Upload file here
                    </p>
                  </>
                )}
              </div>
            </div>

            <div style={styles.buttonsRow}>
              <button style={styles.addButton} onClick={handleAddShow}>
                {editingShow ? "Update" : "Add"}
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
    position: "relative",
    overflow: "hidden",
  },
  posterImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "1rem",
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
