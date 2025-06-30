import { useNavigate } from "react-router-dom";

export default function ProfileHistory() {
  const navigate = useNavigate();
  const nP = () => {
    navigate("/profile");
  };
  const nH = () => {
    navigate("/history");
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        backgroundColor: "#E2E0E0",
        height: "2rem",
        alignItems: "center",
      }}
    >
      &nbsp;
      <p style={{ cursor: "pointer" }} onClick={nP}>
        Profile
      </p>
      <p style={{ cursor: "pointer" }} onClick={nH}>
        History
      </p>
    </div>
  );
}
