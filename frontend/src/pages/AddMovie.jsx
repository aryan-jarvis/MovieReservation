import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Head2 from "../components/Head2";
import LanguageDropdown from "../components/LanguageDropdown";

export default function AddMovie() {
  const navigate = useNavigate();
  const location = useLocation();
  const editMovie = location.state?.movie;

  const [title, setTitle] = useState(editMovie?.title || "");
  const [description, setDescription] = useState(editMovie?.description || "");
  const [genre, setGenre] = useState(editMovie?.genre || "");
  const [languages, setLanguages] = useState(editMovie?.languages || []);
  const [startDate, setStartDate] = useState(editMovie?.startDate || "");
  const [endDate, setEndDate] = useState(editMovie?.endDate || "");
  const [status, setStatus] = useState(editMovie?.status || "Now Showing");
  const [posterImage, setPosterImage] = useState(editMovie?.posterImage || "");

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPosterImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      description,
      genre,
      languages,
      startDate,
      endDate,
      status,
      posterImage,
    };

    try {
      if (editMovie) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/cinemas/${editMovie.ID}`,
          movieData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/cinemas`,
          movieData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      navigate("/listM");
    } catch (err) {
      console.error("Failed to submit movie:", err);
      alert("Failed to submit movie. See console for details.");
    }
  };

  const cancelClick = () => {
    navigate("/listM");
  };

  return (
    <div>
      <Head2 />
      <span style={styles.breadcrumb}>
        <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
          <p>Home</p>
        </a>
        <p> / </p>
        <a href="/listM" style={{ color: "grey", textDecoration: "none" }}>
          <p>Movie Management</p>
        </a>
        <p> / </p>
        <p style={{ color: "#000" }}>
          {editMovie ? "Edit Movie" : "Add New Movie"}
        </p>
      </span>

      <form onSubmit={handleSubmit} style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.formBox}>
            <p style={styles.label}>Basic Info</p>

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
                style={{ ...styles.select, width: "50%" }}
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
            </div>

            <div style={styles.selectRow}>
              <input
                type="date"
                style={{ ...styles.input, width: "50%" }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                style={{ ...styles.input, width: "50%" }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <select
              style={styles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Status</option>
              <option>Now Showing</option>
              <option>Expired</option>
              <option>Upcoming</option>
            </select>

            <p style={styles.posterSection}>Upload Poster</p>
            <div style={styles.posterUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterUpload}
                style={{
                  opacity: 0,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
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
                  <p style={{ fontSize: "12px", color: "#6B7280" }}>
                    Upload file here
                  </p>
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
    height: "2.5rem",
    padding: "1rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
  },
  textarea: {
    height: "8rem",
    padding: "1rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
  },
  _selectRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
  },
  get selectRow() {
    return this._selectRow;
  },
  set selectRow(value) {
    this._selectRow = value;
  },
  select: {
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
