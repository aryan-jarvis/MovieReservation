import Head2 from "../components/Head2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseExit = () => {
    setHoveredCardIndex(null);
  };

  const styles = {
    cardCollection: {
      display: "flex",
      justifyContent: "center",
      gap: "5rem",
      marginTop: "8rem",
    },
    card: {
      border: "1px solid #B1B1B166",
      borderRadius: "1rem",
      padding: "2rem",
      width: "25rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxSizing: "border-box",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1,
      width: "20rem",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
      marginBottom: "0.5rem",
    },
    spacer: {
      flexGrow: 1,
      width: "100%",
    },
    heading: {
      margin: "0.5rem 0 0.5rem",
      fontSize: "1.5rem",
    },
    paragraph: {
      fontSize: "1.05rem",
      textAlign: "center",
      margin: "0.5rem 0",
    },
    buttonContainer: {
      marginTop: "2rem",
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    primaryButton: {
      height: "3rem",
      width: "10rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      backgroundColor: "#FF5295",
      color: "white",
      fontSize: "1rem",
    },
  };

  const cardData = [
    {
      img: "/images/img1.png",
      alt: "Movie Management",
      title: "Movie Management",
      desc: "Add or update movies, posters and metadata",
      btn: "Go to Movies",
      path: "/listM",
    },
    {
      img: "/images/img2.png",
      alt: "Theatre Management",
      title: "Theatre Management",
      desc: "Manage theatre details, screens and locations",
      btn: "Manage Theatres",
      path: "/listT",
    },
    {
      img: "/images/img3.png",
      alt: "Showtime Scheduling",
      title: "Showtime Scheduling",
      desc: "Assign movies to screens and schedule showtimes.",
      btn: "Schedule Shows",
      path: "/listS",
    },
  ];

  return (
    <div>
      <Head2 />
      <div style={styles.cardCollection}>
        {cardData.map((card, idx) => (
          <div
            key={idx}
            style={{
              ...styles.card,
              backgroundColor: hoveredCardIndex === idx ? "#FFEFF5" : "#fff",
            }}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseExit}
          >
            <div style={styles.contentWrapper}>
              <img src={card.img} alt={card.alt} style={styles.image} />
              <div style={styles.spacer}></div>
              <h3 style={styles.heading}>{card.title}</h3>
              <p style={styles.paragraph}>{card.desc}</p>
            </div>
            <div style={styles.buttonContainer}>
              <button
                style={styles.primaryButton}
                onClick={() => navigate(card.path)}
              >
                {card.btn}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
