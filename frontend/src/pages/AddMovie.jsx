import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Head2 from "../components/Head2";
import LanguageDropdown from "../components/LanguageDropdown";

export default function AddMovie() {
  const navigate = useNavigate();
  const location = useLocation();
  const editMovie = location.state?.movie;

  const [title, setTitle] = useState(editMovie?.movie_name || "");
  const [description, setDescription] = useState(
    editMovie?.movie_description || ""
  );
  const [genre, setGenre] = useState(editMovie?.genre || "");
  const [languages, setLanguages] = useState(editMovie?.languages || []);
  const [posterImage, setPosterImage] = useState(editMovie?.poster_url || "");
  const [duration, setDuration] = useState(
    editMovie?.duration?.toString() || ""
  );
  const [startDate, setStartDate] = useState(editMovie?.start_date || "");
  const [endDate, setEndDate] = useState(editMovie?.end_date || "");
  const [status, setStatus] = useState(
    editMovie?.movie_status || "Now Showing"
  );

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPosterImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!languages || languages.length === 0) {
      alert("Please select at least one language.");
      return;
    }

    if (!posterImage) {
      alert("Please upload a poster image.");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    const durationNumber = Number(duration);
    if (isNaN(durationNumber) || durationNumber < 60 || durationNumber > 300) {
      alert("Duration must be a number between 60 and 300 minutes.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      alert("End date cannot be before start date.");
      return;
    }

    const startDateObj = {
      day: start.getUTCDate(),
      month: start.getUTCMonth() + 1,
      year: start.getUTCFullYear(),
    };

    const endDateObj = {
      day: end.getUTCDate(),
      month: end.getUTCMonth() + 1,
      year: end.getUTCFullYear(),
    };

    const movieData = {
      movie_name: title,
      movie_description: description,
      genre,
      languages,
      poster_url: posterImage,
      duration: String(duration),
      start_date: startDateObj,
      end_date: endDateObj,
      movie_status: status,
    };

    try {
      const method = editMovie ? "PUT" : "POST";
      const url = editMovie
        ? `http://localhost:8080/movies/${editMovie.movie_id}`
        : "http://localhost:8080/movies";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save movie");
      }

      const result = await response.json();
      console.log(`${editMovie ? "Movie updated" : "Movie created"}:`, result);
      navigate("/listM");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const cancelClick = () => {
    navigate("/listM");
  };

  return (
    <div>
      <Head2 />
      <nav style={styles.breadcrumb}>
        <a href="/home" style={styles.breadcrumbLink}>
          Home
        </a>
        <span>/</span>
        <a href="/listM" style={styles.breadcrumbLink}>
          Movie Management
        </a>
        <span>/</span>
        <span style={styles.currentBreadcrumb}>
          {editMovie ? "Edit Movie" : "Add New Movie"}
        </span>
      </nav>

      <form onSubmit={handleSubmit} style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.formBox}>
            <h2 style={styles.label}>Movie Details</h2>

            <input
              type="text"
              placeholder="Movie Title"
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Movie Description"
              style={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div style={styles.selectRow}>
              <select
                style={styles.select}
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">Genre</option>
                <option>Thriller</option>
                <option>Adventure</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Horror</option>
                <option>Drama</option>
                <option>Mystery</option>
                <option>Romance</option>
                <option>Fantasy</option>
              </select>

              <LanguageDropdown
                selected={languages}
                setSelected={setLanguages}
              />

              <select
                style={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Status</option>
                <option value="Now Showing">Now Showing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Duration (minutes)"
              style={styles.input}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                type="date"
                placeholder="Start Date"
                style={styles.input2}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />

              <input
                type="date"
                placeholder="End Date"
                style={styles.input2}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <p style={styles.posterSection}>Upload Poster:</p>
            <div style={styles.posterUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterUpload}
                style={styles.fileInput}
              />
              {posterImage ? (
                <img
                  src={posterImage}
                  alt="Poster"
                  style={styles.posterImage}
                />
              ) : (
                <>
                  <img
                    src="/images/upload.png"
                    alt="Upload"
                    style={{ width: "2rem" }}
                  />
                  <p style={styles.uploadText}>Upload file here</p>
                </>
              )}
            </div>

            <div style={styles.buttonsRow}>
              <button type="submit" style={styles.addButton}>
                {editMovie ? "Update" : "Add"}
              </button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={cancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: "1rem 2rem",
    fontSize: "0.95rem",
  },
  breadcrumbLink: {
    color: "grey",
    textDecoration: "none",
  },
  currentBreadcrumb: {
    color: "#000",
    fontWeight: "500",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "600px",
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    background: "#f9f9f9",
    padding: "2rem",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
  },
  label: {
    fontWeight: "600",
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
  },
  input: {
    height: "2.5rem",
    padding: "0.75rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
  },
  input2: {
    height: "2.5rem",
    width: "13rem",
    padding: "0.75rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
  },
  textarea: {
    minHeight: "6rem",
    padding: "0.75rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
  },
  selectRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  select: {
    flex: "1",
    height: "2.5rem",
    padding: "0.6rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
    backgroundColor: "white",
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
  fileInput: {
    opacity: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  uploadText: {
    fontSize: "12px",
    color: "#6B7280",
  },
  buttonsRow: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    marginTop: "1rem",
  },
  addButton: {
    backgroundColor: "#FF5295",
    color: "#fff",
    fontWeight: "600",
    width: "6rem",
    height: "2.5rem",
    border: "none",
    borderRadius: "0.3rem",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#fff",
    color: "black",
    fontWeight: "600",
    width: "6rem",
    height: "2.5rem",
    border: "0.1rem solid #FF5295",
    borderRadius: "0.3rem",
    cursor: "pointer",
  },
};
