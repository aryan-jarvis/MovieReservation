import { useEffect, useState } from "react";
import ComingSoon from "./ComingSoon";
import Footer from "./Footer";
import HeadProfile from "./HeadProfile";
import PrevNext from "./PrevNext";
import SalaarSlider from "./SalaarSlider";
import MovieCard from "./MovieCard";

export default function Movie_List_Page() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const transformMovie = (m) => {
    let langs = [];
    try {
      langs = Array.isArray(m.languages)
        ? m.languages
        : JSON.parse(m.languages || "[]");
    } catch (e) {
      langs = [];
    }

    return {
      ID: m.movie_id,
      title: m.movie_name,
      description: m.movie_description,
      genre: m.genre,
      languages: langs,
      posterImage: m.poster_url,
      status: m.movie_status,
      startDate: m.start_date,
      endDate: m.end_date,
      rating: m.rating,
      duration: m.duration,
    };
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/movies`)
      .then((res) => res.json())
      .then((response) => {
        console.log("FULL RESPONSE:", response);
        const transformed = (response || []).map(transformMovie);
        setMovies(transformed);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const filteredMovies = movies.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
      <SalaarSlider setSearch={setSearch} />
      <br />
      <h2>Movies near you</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
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
          <p>No movies found.</p>
        )}
      </div>

      <br />
      <PrevNext />
      <br />
      <ComingSoon />
      <Footer />
    </div>
  );
}
