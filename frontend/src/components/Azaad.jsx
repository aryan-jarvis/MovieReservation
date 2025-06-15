export default function Azaad() {
  return (
    <>
      <div className="Azaad" style={{ display: "flex" }}>
        <div>
          <img src="../src/assets/images/azaad.png" alt="Company Logo" />
        </div>
        <div style={{ margin: "100px" }}>
          <h1>Azaad</h1>
          <p>4.2 ★★★★☆</p>
          <p>2h 49m Drama, Action | UA13+ | English, Hindi</p>
          <h3>About the Movie</h3>
          <p>
            Set in 1920s India, the story follows Govind, a young stable boy who
            forms a deep bond with a spirited horse named Azaad. Amidst the
            backdrop of rebellion and tyranny, his quest to ride the majestic
            animal becomes a journey of courage, awakening him to his own power
            amidst the country's fight for freedom.
          </p>
          <a href="http://localhost:5173/theatre">
            <button
              style={{
                margin: "5px",
                width: "12rem",
                height: "3rem",
                padding: "10px 20px",
                fontSize: "1.3rem",
                cursor: "pointer",
                backgroundColor: "#FF5295",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Book Now
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
