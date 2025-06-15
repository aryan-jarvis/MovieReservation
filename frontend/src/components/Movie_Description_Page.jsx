import React from "react";
import HeadProfile from "./HeadProfile";
import Azaad from "./Azaad";
import MovieCollection from "./MovieCollection";
import Footer from "./Footer";
import AzaadReviews from "./AzaadReviews";
import PostRating from "./PostRating";

export default function Movie_Description_Page() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <HeadProfile />
      <div style={{ display: "flex" }}>
        <a
          href="http://localhost:5173/"
          style={{ color: "black", textDecoration: "none" }}
        >
          <p>Home</p>
        </a>
        &nbsp;
        <p> / Movie</p>
      </div>
      <Azaad />
      <PostRating />
      <h2>Ratings and Reviews</h2>
      <AzaadReviews />
      <h2>You might also like</h2>
      <MovieCollection />
      <Footer />
    </div>
  );
}
