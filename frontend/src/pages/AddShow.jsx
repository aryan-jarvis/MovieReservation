import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Head2 from "../components/Head2";
import axios from "axios";

export default function AddShow() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingShow = location.state?.show;

  const [movieID, setMovieID] = useState("");
  const [theatreID, setTheatreID] = useState("");
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [date, setDate] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [dateLimits, setDateLimits] = useState({ minDate: "", maxDate: "" });
  const [selectedMovieDuration, setSelectedMovieDuration] = useState(0);

  const [showTimes, setShowTimes] = useState([
    { start_time: "", end_time: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, theatresRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/movies`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/theatres`),
        ]);
        setMovies(Array.isArray(moviesRes.data) ? moviesRes.data : []);
        setTheatres(Array.isArray(theatresRes.data) ? theatresRes.data : []);
      } catch (err) {
        console.error(
          "Failed to load movies or theatres:",
          err.response?.data || err.message || err
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editingShow) {
      setMovieID(editingShow.movie_id || "");
      setTheatreID(editingShow.theatre_id || "");
      setDate(editingShow.date ? editingShow.date.slice(0, 10) : "");
      setSelectedLanguage(editingShow.languages?.[0] || "");
      setShowTimes(
        editingShow.times?.length
          ? editingShow.times.map((t) => ({
              start_time: t.start_time?.slice(0, 5) || "",
              end_time: t.end_time?.slice(0, 5) || "",
            }))
          : [{ start_time: "", end_time: "" }]
      );
      fetchMovieDates(editingShow.movie_id);
    }
  }, [editingShow]);

  const fetchMovieDates = async (movieId) => {
    if (!movieId) {
      setDateLimits({ minDate: "", maxDate: "" });
      setSelectedMovieDuration(0);
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/movies/${movieId}`
      );
      const m = res.data;
      if (m.start_date && m.end_date) {
        const start = m.start_date;
        const end = m.end_date;
        const min = `${start.year}-${String(start.month).padStart(
          2,
          "0"
        )}-${String(start.day).padStart(2, "0")}`;
        const max = `${end.year}-${String(end.month).padStart(2, "0")}-${String(
          end.day
        ).padStart(2, "0")}`;
        setDateLimits({ minDate: min, maxDate: max });
      } else {
        setDateLimits({ minDate: "", maxDate: "" });
      }
      setSelectedMovieDuration(m.duration || 0);
    } catch (err) {
      console.error(
        "Failed to fetch movie dates:",
        err.response?.data || err.message || err
      );
      setDateLimits({ minDate: "", maxDate: "" });
      setSelectedMovieDuration(0);
    }
  };

  const handleAddShow = async () => {
    if (
      !movieID ||
      !theatreID ||
      !date ||
      showTimes.some((t) => !t.start_time || !t.end_time) ||
      !selectedLanguage
    ) {
      alert("Please fill all required fields.");
      return;
    }

    for (let i = 0; i < showTimes.length; i++) {
      for (let j = i + 1; j < showTimes.length; j++) {
        if (
          timesOverlap(
            showTimes[i].start_time,
            showTimes[i].end_time,
            showTimes[j].start_time,
            showTimes[j].end_time
          )
        ) {
          alert(
            `Showtime ${showTimes[i].start_time}-${showTimes[i].end_time} overlaps with another showtime ${showTimes[j].start_time}-${showTimes[j].end_time}`
          );
          return;
        }
      }
    }

    if (dateLimits.minDate && date < dateLimits.minDate) {
      alert(`Date cannot be before ${dateLimits.minDate}`);
      return;
    }
    if (dateLimits.maxDate && date > dateLimits.maxDate) {
      alert(`Date cannot be after ${dateLimits.maxDate}`);
      return;
    }

    try {
      const existingShowsRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/shows`,
        {
          params: {
            theatre_id: theatreID,
            date: date,
          },
        }
      );
      const existingShows = Array.isArray(existingShowsRes.data)
        ? existingShowsRes.data
        : [];

      const existingIntervals = [];
      for (const s of existingShows) {
        if (editingShow && s.show_id === editingShow.show_id) continue;
        if (s.times && Array.isArray(s.times)) {
          for (const t of s.times) {
            if (t.start_time && t.end_time) {
              existingIntervals.push({
                start: t.start_time,
                end: t.end_time,
              });
            }
          }
        }
      }

      for (const newTime of showTimes) {
        for (const existing of existingIntervals) {
          if (
            timesOverlap(
              newTime.start_time,
              newTime.end_time,
              existing.start,
              existing.end
            )
          ) {
            alert(
              `Showtime ${newTime.start_time} - ${newTime.end_time} conflicts with existing show ${existing.start} - ${existing.end}`
            );
            return;
          }
        }
      }

      const showPayload = {
        movie_id: Number(movieID),
        theatre_id: Number(theatreID),
        date: date,
        times: showTimes,
        languages: [selectedLanguage],
      };

      if (editingShow && editingShow.show_id) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/shows/${editingShow.show_id}`,
          showPayload
        );
      } else if (editingShow && !editingShow.show_id) {
        alert("Cannot update show: show_id is missing.");
        return;
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/shows`,
          showPayload
        );
      }

      navigate("/listS");
    } catch (err) {
      console.error(
        "Failed to save show:",
        err.response?.data || err.message || err
      );
      alert(err.response?.data?.error || "Failed to save show.");
    }
  };

  const timesOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
  };

  const cancelClick = () => navigate("/listS");

  const addShowTime = () => {
    setShowTimes([...showTimes, { start_time: "", end_time: "" }]);
  };

  const removeShowTime = (index) => {
    if (showTimes.length === 1) return;
    setShowTimes(showTimes.filter((_, i) => i !== index));
  };

  const updateShowTime = (index, field, value) => {
    const updated = [...showTimes];
    updated[index][field] = value;

    if (field === "start_time" && value && selectedMovieDuration) {
      const [hours, minutes] = value.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes + selectedMovieDuration + 20;
      const endHours = Math.floor(totalMinutes / 60) % 24;
      const endMinutes = totalMinutes % 60;
      const endTime = `${String(endHours).padStart(2, "0")}:${String(
        endMinutes
      ).padStart(2, "0")}`;
      updated[index]["end_time"] = endTime;
    }

    setShowTimes(updated);
  };

  if (loading) {
    return (
      <div>
        <Head2 />
        <p style={{ padding: "2rem", textAlign: "center" }}>Loading data...</p>
      </div>
    );
  }

  return (
    <div>
      <Head2 />
      <nav style={styles.breadcrumb}>
        <a href="/home" style={styles.breadcrumbLink}>
          Home
        </a>
        <span>/</span>
        <a href="/listS" style={styles.breadcrumbLink}>
          Showtime Scheduling
        </a>
        <span>/</span>
        <span style={styles.currentBreadcrumb}>
          {editingShow ? "Edit Showtime" : "Add New Showtime"}
        </span>
      </nav>

      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.formBox}>
            <p style={styles.label}>Basic Info</p>

            <select
              style={styles.input}
              value={movieID}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMovieID(val);
                setSelectedLanguage("");
                fetchMovieDates(val);
              }}
            >
              <option value="">Select Movie</option>
              {movies.map((m) => (
                <option key={m.movie_id} value={m.movie_id}>
                  {m.title || m.movie_name}
                </option>
              ))}
            </select>

            <select
              style={styles.input}
              value={theatreID}
              onChange={(e) => setTheatreID(Number(e.target.value))}
            >
              <option value="">Select Theatre</option>
              {theatres.map((t) => (
                <option key={t.theatre_id} value={t.theatre_id}>
                  {t.name || t.theatre_name}
                </option>
              ))}
            </select>

            <input
              type="date"
              style={styles.input}
              value={date}
              min={dateLimits.minDate}
              max={dateLimits.maxDate}
              onChange={(e) => setDate(e.target.value)}
            />

            {movieID && (
              <select
                style={styles.input}
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="">Select Language</option>
                {(
                  movies.find((m) => m.movie_id === movieID)?.languages || []
                ).map((lang, i) => (
                  <option key={i} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            )}

            <div style={styles.showtimeBox}>
              <p style={styles.subLabel}>Showtimes</p>
              <div style={styles.showtimesContainer}>
                {showTimes.map((t, idx) => (
                  <div key={idx} style={styles.showtimeItem}>
                    <input
                      type="time"
                      value={t.start_time}
                      onChange={(e) =>
                        updateShowTime(idx, "start_time", e.target.value)
                      }
                      style={styles.input}
                    />
                    <span style={styles.toText}>to</span>
                    <input
                      type="time"
                      value={t.end_time}
                      readOnly
                      style={{
                        ...styles.input,
                        backgroundColor: "#eee",
                        cursor: "not-allowed",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeShowTime(idx)}
                      style={styles.removeButton}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addShowTime}
                style={styles.addTimingButton}
              >
                + Add Another Showtime
              </button>
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
  },
  subLabel: {
    fontWeight: "600",
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  },
  input: {
    height: "2.5rem",
    padding: "0.75rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
    flex: "1",
  },
  showtimeBox: {
    border: "0.1rem #A1A2A4 solid",
    padding: "1rem",
    borderRadius: "0.3rem",
    background: "#fff",
  },
  timingRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "0.5rem",
    flexWrap: "wrap",
  },
  timingItem: {
    fontSize: "0.95rem",
    marginTop: "0.2rem",
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
  showtimesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
    alignItems: "center",
  },

  showtimeItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.5rem",
  },

  toText: {
    fontSize: "1.1rem",
    color: "#333",
  },

  removeButton: {
    backgroundColor: "#FF5295",
    color: "#fff",
    fontWeight: "600",
    padding: "0.3rem 0.5rem",
    border: "none",
    borderRadius: "0.3rem",
    cursor: "pointer",
    fontSize: "1.1rem",
  },

  addTimingButton: {
    backgroundColor: "#FF5295",
    color: "#fff",
    border: "none",
    borderRadius: "0.3rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "1rem",
    marginTop: "1rem",
  },
};
