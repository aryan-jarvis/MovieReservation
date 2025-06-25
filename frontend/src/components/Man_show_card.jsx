import React, { useState } from "react";

export default function Man_show_card() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.card}>
        <div style={styles.imageWrapper}>
          <img
            src="../src/assets/images/inception.png"
            alt="Movie Poster"
            style={styles.image}
          />
        </div>
        <div style={styles.content}>
          <div style={styles.details}>
            <p style={styles.title}>Harry Potter</p>
            <p style={styles.genre}>Cinepolis | Bandra, Mumbai</p>
            <div style={styles.languageTags}>
              <span style={styles.languageTag}>12:00 PM - 03:00 PM</span>
              <span style={styles.languageTag}>03:00 PM - 06:00 PM</span>
              <span style={styles.languageTag}>06:00 PM - 09:00 PM</span>
            </div>
            <p style={styles.genre}>
              Hindi, English, Spanish, German, Sanskrit
            </p>
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
                  onClick={() => alert("Edit clicked")}
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
                  onClick={() => alert("Delete clicked")}
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

// const styles = {
//   cardContainer: {
//     padding: "1rem",
//     margin: "0 auto",
//   },
//   card: {
//     display: "flex",
//     backgroundColor: "#fff",
//     borderRadius: "1rem",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
//     transition: "0.3s ease",
//     overflow: "hidden",
//     maxHeight: "9rem",
//   },
//   imageWrapper: {
//     flexShrink: 0,
//     width: "9rem",
//     height: "9rem",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     borderRadius: "1rem 0 0 1rem",
//   },
//   content: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     flex: 1,
//     padding: "0.2rem",
//     marginLeft: "2rem",
//     gap: "1rem",
//   },
//   details: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.4rem",
//     flex: 1,
//   },
//   title: {
//     fontSize: "1.25rem",
//     fontWeight: 700,
//     color: "#111827",
//     margin: 0,
//   },
//   genre: {
//     fontSize: "0.9rem",
//     color: "#6b7280",
//     marginTop: "0.2rem",
//     fontWeight: 500,
//   },
//   languageTags: {
//     display: "flex",
//     gap: "0.5rem",
//     flexWrap: "wrap",
//     margin: "0.4rem 0",
//   },
//   languageTag: {
//     backgroundColor: "#e5e7eb",
//     color: "#374151",
//     fontSize: "0.75rem",
//     padding: "0.35rem 0.6rem",
//     borderRadius: "0.5rem",
//     fontWeight: 500,
//   },
//   menuWrapper: {
//     position: "relative",
//     cursor: "pointer",
//   },
//   dotIcon: {
//     width: "1.5rem",
//     height: "1.5rem",
//     opacity: 0.6,
//     transition: "opacity 0.2s ease",
//   },
//   dropdown: {
//     position: "absolute",
//     top: "2.5rem",
//     right: 0,
//     backgroundColor: "#ffffff",
//     borderRadius: "0.75rem",
//     boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
//     padding: "0.5rem 0",
//     width: "10rem",
//     zIndex: 10,
//   },
//   dropdownItem: {
//     display: "flex",
//     alignItems: "center",
//     padding: "0.6rem 1rem",
//     borderRadius: "0.5rem",
//     cursor: "pointer",
//     transition: "background-color 0.2s ease",
//   },
//   dropdownIcon: {
//     width: "1rem",
//     height: "1rem",
//     marginRight: "0.75rem",
//   },
//   dropdownText: {
//     fontSize: "0.95rem",
//     color: "#374151",
//     fontWeight: 500,
//   },
// };

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
  tagsRow: {
    display: "flex",
    gap: "0.4rem",
  },
  // nowShowing: {
  //   backgroundColor: "#BCFFCB",
  //   color: "black",
  //   padding: "0.4rem",
  //   borderRadius: "1rem",
  //   border: "0.05rem black solid",
  //   fontSize: "0.7rem",
  //   fontWeight: 600,
  // },
  // showAdded: {
  //   backgroundColor: "white",
  //   color: "black",
  //   padding: "0.4rem",
  //   borderRadius: "1rem",
  //   border: "0.01px #E7E6EA solid",
  //   fontSize: "0.7rem",
  //   fontWeight: 600,
  // },
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
