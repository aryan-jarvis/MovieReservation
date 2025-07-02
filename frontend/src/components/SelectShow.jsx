import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const buttonStyle = {
  width: "10.3125rem",
  height: "2.5rem",
  borderRadius: "0.9375rem",
  borderWidth: "0.0625rem",
  borderStyle: "solid",
  opacity: 0.7,
  color: "#4CAF50",
  backgroundColor: "white",
  fontSize: "1rem",
  cursor: "pointer",
};

export default function SelectShow() {
  const { id: movieId } = useParams();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/showAdmin`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setShows(data.data || []);
      })
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  return (
    <div>
      {shows.map((show) => (
        <div
          key={show.ID}
          style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <img
              src={show.posterImage}
              alt="Movie Poster"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              {show.theatre}
            </p>
            {/* <p>{show.movie}</p> */}
            {/* <p>{show.date}</p> */}
            {/* <p>{show.languages.join(", ")}</p> */}

            <div
              style={{
                marginTop: "0.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {show.showtime.split(",").map((time, index) => (
                <Link
                  key={index}
                  to={`/seatselect?showId=${show.ID}&time=${encodeURIComponent(
                    time.trim()
                  )}&movieId=${movieId}`}
                  style={{ textDecoration: "none" }}
                >
                  <button style={buttonStyle}>{time.trim()}</button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
