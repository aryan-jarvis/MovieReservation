import React, { useState, useEffect } from "react";

function ReviewForm({ onSubmit, onClose }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to submit a review.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ comment, rating }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onSubmit({ comment, rating });
        setComment("");
        setRating(0);
        onClose();
      } else {
        alert(data.error || "Failed to submit review.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("An error occurred.");
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        onClick={() => setRating(i + 1)}
        style={{
          cursor: "pointer",
          color: i < rating ? "#f39c12" : "#ccc",
          fontSize: 25,
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <button onClick={onClose} type="button" style={closeButtonStyle}>
        &times;
      </button>
      <div style={styles.ratingContainer}>{renderStars()}</div>
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
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < review.rating ? "#f39c12" : "#ccc",
          fontSize: 20,
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <div style={styles.reviewItem}>
      <div>{renderStars()}</div>
      <p style={styles.reviewComment}>{review.comment}</p>
    </div>
  );
}

function PostRating() {
  const [reviews, setReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/review`
        );
        const result = await response.json();
        if (response.ok) {
          const sortedReviews = result.data.sort((a, b) => b.rating - a.rating);
          setReviews(sortedReviews);
        } else {
          console.error("Failed to fetch reviews:", result.error);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = (newReview) => {
    setReviews((prev) =>
      [...prev, newReview].sort((a, b) => b.rating - a.rating)
    );
  };

  return (
    <>
      <div style={{ display: "flex", gap: "85rem" }}>
        <h2>Ratings and Reviews</h2>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff5295",
            color: "white",
            fontSize: 20,
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            width: "10rem",
          }}
          onClick={() => setIsOpen(true)}
        >
          Rate Now
        </button>
      </div>

      {isOpen && (
        <div style={styles.container}>
          <ReviewForm
            onSubmit={handleReviewSubmit}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}

      <div style={styles.reviewsList}>
        {reviews.map((review, idx) => (
          <ReviewItem key={idx} review={review} />
        ))}
      </div>
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
    padding: "1.5rem",
    marginBottom: "1.5rem",
    borderRadius: "1rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "18rem",
    // transition: "transform 0.2s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "default",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  reviewComment: {
    marginTop: "1rem",
    fontSize: "1rem",
    color: "#333",
    fontStyle: "italic",
  },
  reviewsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    marginTop: "2rem",
  },
};

export default PostRating;
