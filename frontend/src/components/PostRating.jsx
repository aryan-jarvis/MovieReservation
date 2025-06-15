import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

function ReviewForm({ onSubmit, onClose }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ comment, rating });
    setComment("");
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <button onClick={onClose} type="button" style={closeButtonStyle}>
        &times;
      </button>
      <div style={styles.ratingContainer}>
        <Rating onClick={setRating} ratingValue={rating} />
      </div>
      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={styles.textarea}
        required
      />
      <button type="submit" style={styles.button}>
        Submit Review
      </button>
    </form>
  );
}

function ReviewItem({ review }) {
  return (
    <div style={styles.reviewItem}>
      <Rating ratingValue={review.rating} readonly={true} />
      <p style={styles.reviewComment}>{review.comment}</p>
    </div>
  );
}

function PostRating() {
  const [reviews, setReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div style={styles.container}>
          <h2>Ratings and Reviews</h2>
          <ReviewForm
            onSubmit={handleReviewSubmit}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
      {/* <div style={styles.reviewsList}>
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div> */}
    </>
  );
}

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "15px",
  background: "transparent",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  color: "#333",
};

const styles = {
  container: {
    position: "fixed",
    top: "12rem",
    left: "40rem",
    width: "30rem",
    height: "23rem",
    margin: "20px auto",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: "1.5rem",
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  form: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: 30,
  },
  textarea: {
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
    resize: "vertical",
    minHeight: 80,
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#ff5295",
    color: "white",
    fontSize: 16,
    border: "none",
    borderRadius: "0.35rem",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  reviewItem: {
    padding: 15,
    marginBottom: 15,
    border: "1px solid #ddd",
    backgroundColor: "white",
  },
  reviewComment: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
  reviewsList: {
    marginTop: 10,
    padding: "1rem 2rem",
  },
};

export default PostRating;
