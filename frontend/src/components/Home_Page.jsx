import React, { useEffect, useState } from "react";
import BookingSteps from "./BookingSteps";
import ComingSoon from "./ComingSoon";
import Footer from "./Footer";
import HeadProfile from "./HeadProfile";
import LoginPopUp from "./LoginPopUp";
import SalaarSlider from "./SalaarSlider";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default function Home_Page() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/cinemas`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const latestMovies = movies.slice(0, 6);
  const nowShowing = movies
    .filter((m) => m.status === "Now Showing")
    .slice(0, 6);

  const renderSection = (title, data) => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <h2>{title}</h2>
        <Link to="/movies" style={{ textDecoration: "none", color: "#FF5295" }}>
          <p>See All</p>
        </Link>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {data.length > 0 ? (
          data.map((movie) => (
            <MovieCard
              key={movie.ID}
              id={movie.ID}
              title={movie.title}
              genre={movie.genre}
              languages={movie.languages}
              posterImage={movie.posterImage}
              rating={movie.rating || 4.5}
            />
          ))
        ) : (
          <p>No movies to show.</p>
        )}
      </div>
    </>
  );

  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
      <SalaarSlider />
      <br />
      <LoginPopUp />

      {renderSection("Watch Latest Movie", latestMovies)}
      {renderSection("Now Showing in Theatres", nowShowing)}
      <BookingSteps />
      {renderSection("Bollywood Trending", latestMovies)}

      <ComingSoon />
      <Footer />
    </div>
  );
}
