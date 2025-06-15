import SearchDropDown from "./SearchDropDown";

export default function HeadProfile() {
  return (
    <div
      className="Header Profile Section"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="Left-Profile-Section"
        style={{ display: "flex", gap: "3rem" }}
      >
        <a href="http://localhost:5173/">
          <img
            className="logo"
            src="../src/assets/images/logo.png"
            alt="Company Logo"
          />
        </a>
      </div>
      <div
        className="Right-Profile-Section"
        style={{ display: "flex", gap: "1rem" }}
      >
        <div>
          <SearchDropDown />
        </div>
        <img
          className="logo"
          src="../src/assets/images/user_logo.png"
          alt="User Profile Logo"
        />
        <p>Hi, Guest</p>
      </div>
    </div>
  );
}
