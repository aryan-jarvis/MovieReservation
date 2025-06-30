import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Man_show_card({ show, getShowsList }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/showAdmin/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete show");
      } else {
        getShowsList();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.card}>
        <div style={styles.imageWrapper}>
          <img src={show.poster} alt="Movie Poster" style={styles.image} />
        </div>
        <div style={styles.content}>
          <div style={styles.details}>
            <p style={styles.title}>{show.name}</p>
            <p style={styles.genre}>{show.theatre}</p>
            <div style={styles.languageTags}>
              {show.timings.map((t, i) => (
                <span key={i} style={styles.languageTag}>
                  {t}
                </span>
              ))}
            </div>
            <p style={styles.genre}>{show.languages.join(", ")}</p>
          </div>

          <div style={styles.menuWrapper}>
            <img
              src="../src/assets/images/dots_icon.png"
              alt="Options"
              style={styles.dotIcon}
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div style={styles.dropdown}>
                <div
                  style={styles.dropdownItem}
                  onClick={() =>
                    navigate("/addS", {
                      state: {
                        show: {
                          ID: show.ID,
                          movie: show.name,
                          theatre: show.theatre,
                          date: show.date,
                          languages: show.languages,
                          showtime: show.timings ? show.timings.join(", ") : "",
                          posterImage: show.poster,
                        },
                      },
                    })
                  }
                >
                  <img
                    src="../src/assets/images/pencil_icon.png"
                    alt="Edit"
                    style={styles.dropdownIcon}
                  />
                  <span style={styles.dropdownText}>Edit</span>
                </div>
                <div
                  style={styles.dropdownItem}
                  onClick={() => handleDelete(show?.ID)}
                >
                  <img
                    src="../src/assets/images/delete_icon.png"
                    alt="Delete"
                    style={styles.dropdownIcon}
                  />
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
    height: "8rem",
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: "100%",
    borderTopLeftRadius: "0.6rem",
    borderBottomLeftRadius: "0.6rem",
    width: "10rem",
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
  title: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "black",
    margin: 0,
  },
  languageTags: {
    display: "flex",
    gap: "0.5rem",
  },
  languageTag: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
    fontSize: "0.75rem",
    padding: "0.1rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: 500,
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
  dropdownIcon: {
    width: "1rem",
    height: "1rem",
    marginRight: "0.75rem",
  },
  dropdownText: {
    fontSize: "1rem",
    color: "black",
    fontWeight: 500,
  },
};
