import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Head2 from "../components/Head2";
import axios from "axios";
import Select from "react-select";

export default function AddTheatre() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTheatre = location.state?.theatre;

  const [form, setForm] = useState({
    theatre_name: "",
    theatre_location: "",
    city_id: "",
    total_seats: "100",
    theatre_image: "",
    theatre_status: "active",
  });

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchCitiesAndStates = async () => {
      try {
        const [citiesRes, statesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/cities`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/states`),
        ]);
        setCities(citiesRes.data);
        setStates(statesRes.data);
      } catch (error) {
        console.error("Failed to fetch cities or states:", error);
      }
    };

    fetchCitiesAndStates();

    if (editingTheatre) {
      setForm({
        theatre_name: editingTheatre.theatre_name || "",
        theatre_location: editingTheatre.theatre_location || "",
        city_id: editingTheatre.city_id?.toString() || "",
        total_seats: editingTheatre.total_seats?.toString() || "",
        theatre_image: editingTheatre.theatre_image || "",
        theatre_status: editingTheatre.theatre_status || "active",
      });
    } else {
      setForm({
        theatre_name: "",
        theatre_location: "",
        city_id: "",
        total_seats: "",
        theatre_image: "",
        theatre_status: "active",
      });
    }
  }, [editingTheatre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, theatre_image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   !form.theatre_name.trim() ||
    //   !form.theatre_location.trim() ||
    //   !form.city_id ||
    //   !form.total_seats ||
    //   !form.theatre_status
    // ) {
    //   alert("Please fill all required fields.");
    //   return;
    // }
    // if (
    //   isNaN(parseInt(form.total_seats, 10)) ||
    //   parseInt(form.total_seats, 10) <= 0
    // ) {
    //   alert("Total seats must be a positive number.");
    //   return;
    // }
    const payload = {
      theatre_name: form.theatre_name,
      theatre_location: form.theatre_location,
      city_id: parseInt(form.city_id, 10),
      total_seats: 100,
      theatre_timing: form.theatre_timing,
      theatre_image: form.theatre_image,
      theatre_status: form.theatre_status,
    };

    try {
      if (editingTheatre) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/theatres/${
            editingTheatre.theatre_id
          }`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Theatre updated");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/theatres`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Theatre created");
      }
      navigate("/listT");
    } catch (error) {
      console.error("Error saving theatre:", error);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  const cancelClick = () => navigate("/listT");

  const selectedCity = cities.find(
    (c) => c.city_id.toString() === form.city_id
  );
  const selectedState = selectedCity
    ? states.find((s) => s.state_id === selectedCity.state_id)
    : null;
  const selectedStateName = selectedState ? selectedState.state_name : "";

  const cityOptions = cities.map((city) => ({
    value: city.city_id.toString(),
    label: city.city_name,
  }));

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
            <p style={styles.label}>Theatre Info</p>

            <input
              type="text"
              name="theatre_name"
              placeholder="Theatre Name"
              value={form.theatre_name}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="text"
              name="theatre_location"
              placeholder="Theatre Location"
              value={form.theatre_location}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <div style={styles.selectRow}>
              <Select
                name="city_id"
                value={
                  cityOptions.find((option) => option.value === form.city_id) ||
                  null
                }
                onChange={(selectedOption) => {
                  setForm((prev) => ({
                    ...prev,
                    city_id: selectedOption.value,
                  }));
                }}
                options={cityOptions}
                placeholder="Select City *"
                isSearchable
                styles={{
                  control: (base, state) => ({
                    ...base,
                    height: "2.5rem",
                    borderRadius: "0.3rem",
                    width: "15rem",
                    borderColor: !form.city_id ? "red" : base.borderColor,
                  }),
                  menuList: (base) => ({
                    ...base,
                    maxHeight: "200px",
                  }),
                }}
              />

              <input
                type="text"
                value={selectedStateName}
                placeholder="State"
                disabled
                style={styles.input}
              />
            </div>

            <input
              type="number"
              name="total_seats"
              placeholder="Total Seats"
              value={form.total_seats || "100"}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <select
              name="theatre_status"
              value={form.theatre_status}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div style={styles.posterSection}>
              Upload Image:
              <br />
              <br />
              <label style={styles.posterUpload}>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  style={styles.fileInput}
                />
                {form.theatre_image ? (
                  <img
                    src={form.theatre_image}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "1rem",
                    }}
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
              </label>
            </div>

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
  breadcrumbActive: {
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
  input: {
    height: "2.5rem",
    padding: "0.75rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
    flex: "1",
  },
  input2: {
    // height: "2.5rem",
    padding: "0.75rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
    flex: "1",
  },
  selectRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  select: {
    padding: "0.75rem",
    border: "0.1rem #A1A2A4 solid",
    borderRadius: "0.3rem",
    fontSize: "1rem",
    backgroundColor: "white",
    flex: "1",
  },
  posterSection: {
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  posterUpload: {
    width: "9rem",
    height: "6rem",
    border: "0.1rem #5A5A61 dotted",
    borderRadius: "1rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
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
