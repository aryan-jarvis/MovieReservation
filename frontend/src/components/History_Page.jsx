import BookedForCard from "./BookedForCard";
import Footer from "./Footer";
import HeadProfile from "./HeadProfile";
import NoHistory from "./NoHistory";
import PastMoviesCollection from "./PastMoviesCollection";
import ProfileHistory from "./ProfileHistory";

export default function History_Page() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
      <ProfileHistory />
      <NoHistory />
      <Footer />
    </div>
  );
}
