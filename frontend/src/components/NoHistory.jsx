import Footer from "./Footer";
import HeadProfile from "./HeadProfile";
import ProfileHistory from "./ProfileHistory";

export default function NoHistory() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <ProfileHistory />
      <div style={{ padding: "5.6rem", textAlign: "center" }}>
        <img src="../src/assets/images/no_history.png" alt="alt" />
        <h2>You have no booking history !</h2>
      </div>
      <Footer />
    </div>
  );
}
