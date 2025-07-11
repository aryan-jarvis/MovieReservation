import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

import salaarImage from "/images/salaar.png";
import sikandarImage from "/images/sikandar.png";
import moanaImage from "/images/moana.png";

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
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const imageMap = {
    Salaar: salaarImage,
    Sikandar: sikandarImage,
    Moana: moanaImage,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/movies`
        );
        setMovies(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(
          "Failed to load movies:",
          err.response?.data || err.message || err
        );
      }
    };
    fetchMovies();
  }, []);

  const movieOptions = movies.map((movie) => ({
    value: movie.movie_id.toString(),
    label: movie.title || movie.movie_name,
  }));

  const handleMovieSelect = (selectedOption) => {
    if (!selectedOption) return;
    const movieId = selectedOption.value;
    const movie = movies.find((m) => m.movie_id.toString() === movieId);
    if (movie) {
      const title = movie.title || movie.movie_name;
      if (imageMap[title]) {
        setMainImage(imageMap[title]);
      } else {
        setMainImage("");
      }
      navigate(`/description/${movieId}`);
    }
  };

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
        <Select
          name="movie_id"
          options={movieOptions}
          placeholder="Select Movie..."
          onChange={handleMovieSelect}
          isSearchable
          styles={{
            control: (base, state) => ({
              ...base,
              height: "2.5rem",
              borderRadius: "1.6rem",
              width: "60rem",
              fontSize: "1.2rem",
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: "200px",
            }),
          }}
        />
      </div>

      <div style={textStyle}>
        <h1 style={{ fontSize: "5rem" }}>Redefined Movie Experience!</h1>
        <h2 style={{ fontSize: "2rem" }}>At PVR Superplex Mall of India</h2>
      </div>

      <button style={buttonStyle}>Book Now</button>

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
