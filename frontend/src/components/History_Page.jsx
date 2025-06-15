import BookedForCard from "./BookedForCard";
import Footer from "./Footer";
import HeadProfile from "./HeadProfile";
import MovieCollection from "./MovieCollection";
import PastMoviesCollection from "./PastMoviesCollection";
import ProfileHistory from "./ProfileHistory";

export default function History_Page() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <ProfileHistory />
      <h2>Upcoming Movies</h2>
      <BookedForCard />
      <h2>Past Movies</h2>
      <PastMoviesCollection />
      <Footer />
    </div>
  );
}
