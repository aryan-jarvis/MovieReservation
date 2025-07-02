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
      <div style={{ padding: "5.6rem", textAlign: "center" }}>
        <img src="/images/no_history.png" alt="alt" />
        <h2>You have no booking history !</h2>
      </div>
      <Footer />
    </div>
  );
}
