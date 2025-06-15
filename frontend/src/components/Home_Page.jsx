import BookingSteps from "./BookingSteps";
import ComingSoon from "./ComingSoon";
import Footer from "./Footer";
import HeadProfile from "./HeadProfile";
import LoginPopUp from "./LoginPopUp";
import MovieCollection from "./MovieCollection";
import SalaarSlider from "./SalaarSlider";
import SearchDropDown from "./SearchDropDown";
import React from "react";

export default function Home_Page() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <br />
      <SalaarSlider />
      <br />
      <LoginPopUp />
      <div style={{ display: "flex", gap: "92rem" }}>
        <h2>Watch Latest Movie</h2>
        <a href="http://localhost:5173/movies">
          <p>See All</p>
        </a>
      </div>
      <MovieCollection />
      <br />
      <div style={{ display: "flex", gap: "89rem" }}>
        <h2>Now Showing in Theatres</h2>
        <a href="http://localhost:5173/movies">
          <p>See All</p>
        </a>
      </div>
      <MovieCollection />
      <br />
      <BookingSteps />
      <br />
      <div style={{ display: "flex", gap: "92rem" }}>
        <h2>Bollywood Trending</h2>
        <a href="http://localhost:5173/movies">
          <p>See All</p>
        </a>
      </div>
      <MovieCollection />
      <br />
      <br />
      <ComingSoon />
      <Footer />
    </div>
  );
}
