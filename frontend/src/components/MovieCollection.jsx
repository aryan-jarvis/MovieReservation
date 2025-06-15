import MovieCard from "./MovieCard";

export default function MovieCollection() {
  return (
    <div style={{ display: "flex", gap: "3rem" }}>
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
}
