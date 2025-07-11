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
  const [search, setSearch] = useState("");

  const [movieCollection, setMovieCollection] = useState([]);
  const transformMovie = (m) => ({
    ID: m.movie_id,
    title: m.movie_name,
    genre: m.genre,
    languages: Array.isArray(m.languages) ? m.languages : [],
    posterImage: m.poster_url,
    rating: m.rating || 0,
    status: m.movie_status,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/movies`)
      .then((res) => res.json())
      .then((res) => {
        const rawMovies = Array.isArray(res) ? res : res.data || [];
        const transformed = rawMovies.map(transformMovie);
        setMovieCollection(rawMovies);
        setMovies(transformed);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const filteredMovies = movieCollection.filter((movie) =>
    movie.movie_name?.toLowerCase().includes(search.toLowerCase())
  );

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
        {search && filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.movie_id}
              id={movie.movie_id}
              title={movie.movie_name}
              genre={movie.genre}
              languages={Array.isArray(movie.languages) ? movie.languages : []}
              posterImage={movie.poster_url}
              rating={movie.rating || 0}
              status={movie.movie_status}
            />
          ))
        ) : data.length > 0 ? (
          data.map((movie) => (
            <MovieCard
              key={movie.ID}
              id={movie.ID}
              title={movie.title}
              genre={movie.genre}
              languages={movie.languages}
              posterImage={movie.posterImage}
              rating={movie.rating}
              status={movie.status}
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
      <SalaarSlider setSearch={setSearch} />
      <br />
      {/* <LoginPopUp /> */}

      {renderSection("Watch Latest Movie", latestMovies)}
      {renderSection("Now Showing in Theatres", nowShowing)}
      <BookingSteps />
      {renderSection("Bollywood Trending", latestMovies)}

      <ComingSoon />
      <Footer />
    </div>
  );
}
