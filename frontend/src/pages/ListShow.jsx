import Head2 from "../components/Head2";

export default function ListShow() {
  const breadcrumbStyle = {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#555",
  };

  const headerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#fff",
    color: "#FF5295",
    border: "2px solid #FF5295",
    borderRadius: "1rem",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div>
      <Head2 />
      <div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div style={breadcrumbStyle}>
          <a href="/home" style={{ textDecoration: "none", color: "#FF5295" }}>
            <p>Home</p>
          </a>
          <p>/</p>
          <a href="/listS" style={{ textDecoration: "none", color: "#FF5295" }}>
            <p>Showtime Scheduling</p>
          </a>
        </div>

        <div style={headerContainerStyle}>
          <h1 style={titleStyle}>Scheduling Showtimes</h1>
          <button style={buttonStyle}>+ Add New Showtime</button>
        </div>
      </div>
    </div>
  );
}
