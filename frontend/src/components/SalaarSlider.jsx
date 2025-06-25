import React, { useState } from "react";

import salaarImage from "../assets/images/salaar.png";
import sikandarImage from "../assets/images/sikandar.png";
import moanaImage from "../assets/images/moana.png";

const styles = {
  container: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    maxHeight: "52rem",
    objectFit: "cover",
  },
  textContainer: {
    position: "absolute",
    top: "12rem",
    left: "5rem",
    color: "white",
    zIndex: 3,
  },
  heading: {
    fontSize: "4.5rem",
    margin: 0,
  },
  subheading: {
    fontSize: "2rem",
    margin: "1rem 0",
  },
  button: {
    fontSize: "1.6rem",
    marginTop: "2rem",
    padding: "1rem 2rem",
    borderRadius: "0.8rem",
    fontWeight: "bold",
    backgroundColor: "#ff5295",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#e04683",
  },
  searchBar: {
    position: "absolute",
    top: "3rem",
    right: "4rem",
    zIndex: 3,
  },
  input: {
    width: "40rem",
    height: "3.5rem",
    borderRadius: "2rem",
    padding: "0 1.5rem",
    fontSize: "1.2rem",
    border: "none",
  },
  thumbnailsContainer: {
    position: "absolute",
    bottom: "1rem",
    right: "2rem",
    display: "flex",
    gap: "1.5rem",
    zIndex: 3,
  },
  thumbnail: (isSelected) => ({
    height: isSelected ? "16rem" : "10rem",
    width: isSelected ? "24rem" : "12rem",
    objectFit: "cover",
    borderRadius: "0.6rem",
    // border: isSelected ? "3px solid #ff5295" : "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  }),
};

export default function SalaarSlider() {
  const [mainImage, setMainImage] = useState(salaarImage);
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <img src={mainImage} alt="Main" style={styles.mainImage} />

      <div style={styles.searchBar}>
        <input type="search" placeholder="Search..." style={styles.input} />
      </div>

      <div style={styles.textContainer}>
        <h1 style={styles.heading}>Redefined Movie Experience!</h1>
        <h2 style={styles.subheading}>At PVR Superplex Mall of India</h2>
        <a href="http://localhost:5173/description">
          <button
            style={{
              ...styles.button,
              ...(hover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Book Now
          </button>
        </a>
      </div>

      <div style={styles.thumbnailsContainer}>
        {[salaarImage, sikandarImage, moanaImage].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => setMainImage(image)}
            style={styles.thumbnail(mainImage === image)}
          />
        ))}
      </div>
    </div>
  );
}
