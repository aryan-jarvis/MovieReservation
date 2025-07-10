import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Man_theatre_card({ theatre, getTheatresList }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitiesAndStates = async () => {
      try {
        const [citiesRes, statesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/cities`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/states`),
        ]);

        if (!citiesRes.ok || !statesRes.ok) {
          throw new Error("Failed to fetch cities or states");
        }

        const citiesData = await citiesRes.json();
        const statesData = await statesRes.json();

        setCities(citiesData);
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching cities/states:", error);
      }
    };

    fetchCitiesAndStates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/theatres/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete theatre");
      } else {
        getTheatresList();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const cityObj = cities.find((city) => city.city_id === theatre.city_id);
  const cityName = cityObj?.city_name || "Unknown City";
  const stateName =
    states.find((state) => state.state_id === cityObj?.state_id)?.state_name ||
    "Unknown State";

  return (
    <div style={styles.cardContainer}>
      <div style={styles.card}>
        <div style={styles.imageWrapper}>
          {theatre.theatre_image ? (
            <img
              src={theatre.theatre_image}
              alt="Theatre Poster"
              style={styles.image}
            />
          ) : (
            <div
              style={{
                ...styles.image,
                width: "4rem",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                color: "#999",
              }}
            >
              No Image
            </div>
          )}
        </div>

        <div style={styles.content}>
          <div style={styles.details}>
            <div style={styles.headerRow}>
              <h3 style={styles.title}>{theatre.theatre_name}</h3>
              <div
                style={{
                  ...styles.nowShowing,
                  backgroundColor:
                    theatre.theatre_status === "active" ? "#BCFFCB" : "#FFCBCB",
                  color:
                    theatre.theatre_status === "active" ? "#0F5132" : "#842029",
                  marginLeft: "0.75rem",
                }}
              >
                {theatre.theatre_status
                  ? theatre.theatre_status.charAt(0).toUpperCase() +
                    theatre.theatre_status.slice(1)
                  : "Unknown"}
              </div>
            </div>

            <p style={styles.genre}>
              {theatre.theatre_location}, {cityName}, {stateName}
            </p>
          </div>

          <div
            style={styles.menuWrapper}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <span>⋮</span>
            {showDropdown && (
              <div style={styles.dropdown}>
                <div
                  style={styles.dropdownItem}
                  onClick={() => navigate("/addT", { state: { theatre } })}
                >
                  <span style={styles.dropdownText}>Edit</span>
                </div>
                <div
                  style={styles.dropdownItem}
                  onClick={() => handleDelete(theatre?.theatre_id)}
                >
                  <span style={styles.dropdownText}>Delete</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    border: "#E0DFDF solid 0.05rem",
    borderRadius: "1rem",
    marginBottom: "1rem",
  },
  card: {
    display: "flex",
    alignItems: "center",
    height: "8rem",
  },
  imageWrapper: {
    height: "4rem",
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
    width: "5rem",
  },
  image: {
    height: "100%",
    borderTopLeftRadius: "0.6rem",
    borderBottomLeftRadius: "0.6rem",
    width: "100%",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginLeft: "1rem",
    marginTop: "1rem",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    flex: 1,
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
  },
  tagsRow: {
    display: "flex",
    gap: "0.4rem",
  },
  nowShowing: {
    backgroundColor: "#BCFFCB",
    color: "black",
    padding: "0.4rem",
    borderRadius: "1rem",
    fontSize: "0.7rem",
    fontWeight: 600,
  },
  showAdded: {
    backgroundColor: "white",
    color: "black",
    padding: "0.4rem",
    borderRadius: "1rem",
    border: "0.01px #E7E6EA solid",
    fontSize: "0.7rem",
    fontWeight: 600,
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "black",
    margin: 0,
  },
  genre: {
    fontSize: "0.8rem",
    color: "black",
    marginTop: "0.2rem",
    fontWeight: 500,
  },
  menuWrapper: {
    position: "relative",
    cursor: "pointer",
    right: "1rem",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    backgroundColor: "#fff",
    border: "#E0DFDF solid 0.05rem",
    borderRadius: "0.75rem",
    padding: "0.5rem",
    width: "12rem",
    zIndex: 10,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.6rem 1rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  dropdownText: {
    fontSize: "1rem",
    color: "black",
    fontWeight: 500,
  },
};
