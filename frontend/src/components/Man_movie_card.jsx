import React, { useState } from "react";

export default function Man_movie_card({ movie, getMoviesList }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/cinemas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete cinema");
      } else {
        getMoviesList();
      }

      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.card}>
        <div style={styles.imageWrapper}>
          <img
            src={movie?.posterImage || "../src/assets/images/inception.png"}
            alt="Movie Poster"
            style={styles.image}
          />
        </div>
        <div style={styles.content}>
          <div style={styles.details}>
            <div style={styles.tagsRow}>
              <span style={styles.nowShowing}>{movie?.status}</span>
              <span style={styles.showAdded}>Show Added</span>
            </div>
            <p style={styles.title}>{movie?.title}</p>
            <div style={styles.languageTags}>
              {movie?.languages?.map((lang, idx) => (
                <span key={idx} style={styles.languageTag}>
                  {lang}
                </span>
              ))}
            </div>
            <p style={styles.genre}>{movie?.genre}</p>
          </div>

          <div style={styles.menuWrapper}>
            <img
              src="../src/assets/images/dots_icon.png"
              alt="Options"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownItem}>
                  <img
                    src="../src/assets/images/pencil_icon.png"
                    alt="Edit"
                    style={styles.dropdownIcon}
                  />
                  <span style={styles.dropdownText}>Edit</span>
                </div>
                <div style={styles.dropdownItem}>
                  <img
                    src="../src/assets/images/delete_icon.png"
                    alt="Delete"
                    style={styles.dropdownIcon}
                  />
                  <span
                    style={styles.dropdownText}
                    onClick={() => handleDelete(movie?.ID)}
                  >
                    Delete
                  </span>
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
    width: "8rem",
  },
  image: {
    height: "100%",
    borderTopLeftRadius: "0.6rem",
    borderBottomLeftRadius: "0.6rem",
    width: "100%",
    objectFit: "cover",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    left: "12rem",
    marginTop: "1rem",
    width: "85%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    flex: 1,
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
