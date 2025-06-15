export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        gap: "13rem",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem",
        backgroundColor: "#F9F9F9",
      }}
    >
      <div>
        <img
          className="logo"
          src="../src/assets/images/logo.png"
          alt="Company Logo"
        />
      </div>
      <div>
        <p>Terms and Conditions</p>
      </div>
      <div>
        <p>Privacy Policy</p>
      </div>
      <div>
        <p>Contact us</p>
      </div>
      <div>
        <p>List your events</p>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-solid fa-envelope"></i>
        <i class="fa-brands fa-square-instagram"></i>
      </div>
    </div>
  );
}
