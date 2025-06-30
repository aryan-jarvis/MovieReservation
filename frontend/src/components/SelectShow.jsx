import { useEffect, useState } from "react";

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
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/showAdmin")
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
                <a
                  key={index}
                  href={`http://localhost:5173/seatselect?showId=${
                    show.ID
                  }&time=${encodeURIComponent(time.trim())}`}
                  style={{ textDecoration: "none" }}
                >
                  <button style={buttonStyle}>{time.trim()}</button>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
