import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Head2 from "../components/Head2";
import axios from "axios";

export default function AddTheatre() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTheatre = location.state?.theatre;

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    screens: "",
    movies: "",
    status: "Active",
    posterUrl: "",
  });

  useEffect(() => {
    if (editingTheatre) {
      setForm({
        name: editingTheatre.name || "",
        address: editingTheatre.address || "",
        city: editingTheatre.city || "",
        state: editingTheatre.state || "",
        screens: editingTheatre.screens?.toString() || "",
        movies: Array.isArray(editingTheatre.movies)
          ? editingTheatre.movies.join(", ")
          : "",
        status: editingTheatre.status || "Active",
        posterUrl: editingTheatre.theatreIcon || "",
      });
    } else {
      setForm({
        name: "",
        address: "",
        city: "",
        state: "",
        screens: "",
        movies: "",
        status: "Active",
        posterUrl: "",
      });
    }
  }, [editingTheatre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, posterUrl: reader.result }));
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieArray = form.movies
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    const payload = {
      name: form.name,
      address: form.address,
      city: form.city,
      state: form.state,
      status: form.status,
      screens: parseInt(form.screens, 10),
      movies: movieArray,
      theatreIcon: form.posterUrl,
    };

    try {
      let res;
      if (editingTheatre) {
        // Update
        res = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/theatres/${editingTheatre.ID}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Theatre updated:", res.data);
      } else {
        // Add new
        res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/theatres`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Theatre added:", res.data);
      }

      navigate("/listT");
    } catch (error) {
      console.error("Failed to save theatre:", error);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  const cancelClick = () => {
    navigate("/listT");
  };

  return (
    <div>
      <Head2 />
      <div style={styles.breadcrumb}>
        <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
          <p>Home</p>
        </a>
        <p> / </p>
        <a href="/listT" style={{ color: "grey", textDecoration: "none" }}>
          <p>Theatre Management</p>
        </a>
        <p> / </p>
        <p style={styles.breadcrumbActive}>
          {editingTheatre ? "Edit Theatre" : "Add New Theatre"}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.formBox}>
            <p style={styles.label}>Basic Info</p>

            <input
              type="text"
              name="name"
              placeholder="Theatre Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="address"
              placeholder="Theatre Address"
              value={form.address}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <div style={styles.selectRow}>
              <input
                type="text"
                name="city"
                placeholder="City Name"
                value={form.city}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="state"
                placeholder="State Name"
                value={form.state}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.selectRow}>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                type="number"
                name="screens"
                placeholder="Total Screens"
                value={form.screens}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <input
              type="text"
              name="movies"
              placeholder="Current Movies (comma separated)"
              value={form.movies}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <p style={styles.posterSection}>Upload Theatre Icon</p>
            <label style={styles.posterUpload}>
              <input
                type="file"
                accept="image/png"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {form.posterUrl ? (
                <img
                  src={form.posterUrl}
                  alt="Poster Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                />
              ) : (
                <p style={{ fontSize: "12px", color: "#6b7280" }}>+ Upload</p>
              )}
            </label>

            <div style={styles.buttonsRow}>
              <button type="submit" style={styles.addButton}>
                {editingTheatre ? "Update" : "Add"}
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
  breadcrumbActive: {
    fontWeight: "bold",
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
    maxWidth: "600px",
    width: "100%",
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
  selectRow: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "2rem",
    marginRight: "2rem",
  },
  select: {
    padding: "0.6rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
    backgroundColor: "white",
    width: "15rem",
  },
  posterSection: {
    fontWeight: "600",
  },
  posterUpload: {
    width: "9rem",
    height: "6rem",
    border: "0.1rem #5A5A61 dotted",
    borderRadius: "1rem",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
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
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#fff",
    color: "black",
    fontWeight: "600",
    width: "6rem",
    height: "2.5rem",
    border: "solid 0.1rem #FF5295",
    borderRadius: "0.3rem",
    cursor: "pointer",
  },
};
