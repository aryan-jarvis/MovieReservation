import { useEffect, useState } from "react";
import ComingSoon from "./ComingSoon";
import Footer from "./Footer";
import HeadProfile from "./HeadProfile";
import PrevNext from "./PrevNext";
import SalaarSlider from "./SalaarSlider";
import MovieCard from "./MovieCard";

export default function Movie_List_Page() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/cinemas")
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
      <SalaarSlider />
      <br />
      <h2>Movies near you</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.ID}
            id={movie.ID}
            title={movie.title}
            genre={movie.genre}
            languages={movie.languages}
            posterImage={movie.posterImage}
          />
        ))}
      </div>

      <br />
      <PrevNext />
      <br />
      <ComingSoon />
      <Footer />
    </div>
  );
}
