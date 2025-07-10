import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Head2 from "../components/Head2";
import Man_show_card from "../components/Man_show_card";

export default function ListShow() {
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);

  const getShowsList = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/shows`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch shows");
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          const groupedMap = {};

          data.forEach((item) => {
            const key = [
              item.Movie.movie_name,
              item.Theatre.theatre_name,
              item.Theatre.theatre_location,
              item.date,
              (item.languages || []).join(","),
            ].join("|");

            const timingString = `${new Date(
              item.start_time
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${new Date(item.end_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`;

            if (!groupedMap[key]) {
              groupedMap[key] = {
                ID: item.show_id,
                name: item.Movie.movie_name,
                poster: item.Movie.poster_url,
                theatre: `${item.Theatre.theatre_name}, ${item.Theatre.theatre_location}`,
                timings: [timingString],
                languages: item.languages,
                date: item.date,
                rawStartTime: item.start_time,
                rawEndTime: item.end_time,
              };
            } else {
              groupedMap[key].timings.push(timingString);
            }
          });

          const formattedShows = Object.values(groupedMap);

          setShows(formattedShows);
        }
      })

      .catch((error) => {
        console.error("Error fetching shows:", error);
      });
  };

  useEffect(() => {
    getShowsList();
  }, []);

  const handleAddShowClick = () => {
    navigate("/addS");
  };

  return (
    <div>
      <Head2 />
      <div style={{ margin: "0 2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <a href="/home" style={{ color: "grey", textDecoration: "none" }}>
            <p>Home</p>
          </a>
          <p>/</p>
          <a href="/listS" style={{ color: "black", textDecoration: "none" }}>
            <p>Showtime Scheduling</p>
          </a>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Schedule Showtimes
          </h1>
          <button
            style={{
              padding: "1rem",
              backgroundColor: "#fff",
              color: "#FF5295",
              border: "2px solid #FF5295",
              borderRadius: "0.4rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={handleAddShowClick}
          >
            + Add New Showtime
          </button>
        </div>

        {shows.length === 0 ? (
          <p>No showtimes scheduled yet.</p>
        ) : (
          shows.map((show, index) => (
            <Man_show_card
              key={index}
              show={show}
              getShowsList={getShowsList}
            />
          ))
        )}
      </div>
    </div>
  );
}
