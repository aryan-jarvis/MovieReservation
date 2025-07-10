import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Head2 from "../components/Head2";
import Man_movie_card from "../components/Man_movie_card";

export default function ListMovie() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const getMoviesList = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/movies`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          setMovies(data);
        } else if (data && Array.isArray(data.data)) {
          setMovies(data.data);
        } else {
          setMovies([]);
        }
      })

      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  useEffect(() => {
    getMoviesList();
  }, []);

  const handleAddMovieClick = () => {
    navigate("/addM");
  };

  return (
    <div>
      <Head2 />
      <div style={styles.container}>
        <div style={styles.breadcrumb}>
          <a href="/home" style={styles.breadcrumbLink}>
            <p>Home</p>
          </a>
          <p>/</p>
          <a href="/listM" style={styles.breadcrumbActiveLink}>
            <p>Movie Management</p>
          </a>
        </div>

        <div style={styles.header}>
          <h1 style={styles.title}>Manage Movies</h1>
          <button style={styles.addButton} onClick={handleAddMovieClick}>
            + Add New Movie
          </button>
        </div>

        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie, index) => (
            <Man_movie_card
              key={index}
              movie={movie}
              getMoviesList={getMoviesList}
            />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "0 2rem",
  },
  breadcrumb: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  breadcrumbLink: {
    color: "grey",
    textDecoration: "none",
  },
  breadcrumbActiveLink: {
    color: "black",
    textDecoration: "none",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  addButton: {
    padding: "1rem",
    backgroundColor: "#fff",
    color: "#FF5295",
    border: "2px solid #FF5295",
    borderRadius: "0.4rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};
