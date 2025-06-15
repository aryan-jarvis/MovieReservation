import React, { useState } from "react";

import salaarImage from "../assets/images/salaar.png";
import sikandarImage from "../assets/images/sikandar.png";
import moanaImage from "../assets/images/moana.png";

const textStyle = {
  position: "absolute",
  top: "15rem",
  left: "6rem",
  color: "white",
  padding: "1rem",
  borderRadius: "1rem",
  fontWeight: "bold",
};

const buttonStyle = {
  fontSize: "1.6rem",
  position: "absolute",
  top: "34rem",
  left: "8rem",
  padding: "1rem",
  borderRadius: "0.8rem",
  fontWeight: "bold",
  backgroundColor: "#ff5295",
  color: "white",
  height: "5rem",
  width: "12rem",
};

const searchStyle = {
  display: "flex",
  position: "absolute",
  backgroundColor: "#ffffff",
  height: "3rem",
  width: "60rem",
  top: "6rem",
  right: "2rem",
  borderBottomLeftRadius: "2rem",
  padding: "0.8rem",
};

const baseThumbStyle = {
  position: "absolute",
  bottom: "2rem",
  padding: "1rem",
  display: "block",
  objectFit: "cover",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  border: "2px solid transparent",
};

export default function SalaarSlider() {
  const [mainImage, setMainImage] = useState(salaarImage);

  const getImageStyle = (image, position) => {
    const isSelected = mainImage === image;
    return {
      ...baseThumbStyle,
      right: position,
      height: isSelected ? "20rem" : "12rem",
      width: isSelected ? "26rem" : "12rem",
      zIndex: isSelected ? 2 : 1,
    };
  };

  return (
    <div>
      <img
        src={mainImage}
        alt="Main"
        style={{
          overflow: "hidden",
          maxHeight: "51.8rem",
          width: "100%",
          objectFit: "cover",
        }}
      />

      <div className="search-bar-main-container" style={searchStyle}>
        <input
          type="search"
          placeholder="Search"
          style={{
            width: "60rem",
            padding: "1rem",
            borderRadius: "1.6rem",
          }}
        />
      </div>

      <div style={textStyle}>
        <h1 style={{ fontSize: "5rem" }}>Redefined Movie Experience !</h1>
        <h2 style={{ fontSize: "2rem" }}>At PVR Superplex Mall of India</h2>
      </div>
      <a href="http://localhost:5173/description">
        <button style={buttonStyle}>Book Now</button>
      </a>
      <img
        src={salaarImage}
        alt="Salaar"
        style={getImageStyle(salaarImage, "30rem")}
        onClick={() => setMainImage(salaarImage)}
      />
      <img
        src={sikandarImage}
        alt="Sikandar"
        style={getImageStyle(sikandarImage, "16rem")}
        onClick={() => setMainImage(sikandarImage)}
      />
      <img
        src={moanaImage}
        alt="Moana"
        style={getImageStyle(moanaImage, "2rem")}
        onClick={() => setMainImage(moanaImage)}
      />
    </div>
  );
}
