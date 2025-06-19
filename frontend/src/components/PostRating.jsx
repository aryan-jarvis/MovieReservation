import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

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
      const response = await fetch("http://localhost:8080/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ comment, rating }),
      });

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
  const [isOpen, setIsOpen] = useState(false);

  const handleReviewSubmit = (newReview) => {
    setReviews((prev) => [...prev, newReview]);
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
    // marginTop: "25rem",
    padding: "1rem 2rem",
  },
};

export default PostRating;

// import React, { useState } from "react";
// import { Rating } from "react-simple-star-rating";

// function ReviewForm({ onSubmit, onClose }) {
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in to submit a review.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/review", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({ comment, rating }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         onSubmit({ comment, rating });
//         setComment("");
//         setRating(0);
//         onClose();
//       } else {
//         alert(data.error || "Failed to submit review.");
//       }
//     } catch (err) {
//       console.error("Error submitting review:", err);
//       alert("An error occurred.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <button onClick={onClose} type="button" style={closeButtonStyle}>
//         &times;
//       </button>
//       <div style={styles.ratingContainer}>
//         <Rating
//           onClick={(value) => setRating(value / 20)}
//           initialValue={rating * 20}
//           fillColor="#f59e0b"
//           size={25}
//           allowFraction
//         />
//       </div>
//       <textarea
//         placeholder="Write your review..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         style={styles.textarea}
//         required
//       />
//       <button type="submit" style={styles.button}>
//         Submit Review
//       </button>
//     </form>
//   );
// }

// function ReviewItem({ review }) {
//   return (
//     <div style={styles.reviewItem}>
//       <Rating
//         readonly
//         initialValue={review.rating * 20}
//         fillColor="#f59e0b"
//         size={20}
//         allowFraction
//       />

//       <p style={styles.reviewComment}>{review.comment}</p>
//     </div>
//   );
// }

// function PostRating() {
//   const [reviews, setReviews] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleReviewSubmit = (newReview) => {
//     setReviews((prev) => [...prev, newReview]);
//   };

//   return (
//     <>
//       <div style={{ display: "flex", gap: "85rem" }}>
//         <h2>Ratings and Reviews</h2>
//         <button
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#ff5295",
//             color: "white",
//             fontSize: 20,
//             border: "none",
//             borderRadius: "0.5rem",
//             cursor: "pointer",
//             width: "10rem",
//           }}
//           onClick={() => setIsOpen(true)}
//         >
//           Rate Now
//         </button>
//       </div>

//       {isOpen && (
//         <div style={styles.container}>
//           <ReviewForm
//             onSubmit={handleReviewSubmit}
//             onClose={() => setIsOpen(false)}
//           />
//         </div>
//       )}

//       <div style={styles.reviewsList}>
//         {reviews.map((review, idx) => (
//           <ReviewItem key={idx} review={review} />
//         ))}
//       </div>
//     </>
//   );
// }

// const closeButtonStyle = {
//   position: "absolute",
//   top: "10px",
//   right: "15px",
//   background: "transparent",
//   border: "none",
//   fontSize: "24px",
//   cursor: "pointer",
//   color: "#333",
// };

// const styles = {
//   container: {
//     position: "fixed",
//     top: "12rem",
//     left: "40rem",
//     width: "30rem",
//     height: "23rem",
//     margin: "20px auto",
//     padding: 20,
//     border: "1px solid #ddd",
//     borderRadius: "1.5rem",
//     backgroundColor: "#fafafa",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 10,
//     boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//   },
//   form: {
//     position: "relative",
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: 30,
//   },
//   textarea: {
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     borderRadius: 4,
//     border: "1px solid #ccc",
//     resize: "vertical",
//     minHeight: 80,
//   },
//   ratingContainer: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   button: {
//     padding: "10px 20px",
//     backgroundColor: "#ff5295",
//     color: "white",
//     fontSize: 16,
//     border: "none",
//     borderRadius: "0.35rem",
//     cursor: "pointer",
//     alignSelf: "flex-start",
//   },
//   reviewItem: {
//     padding: 15,
//     marginBottom: 15,
//     border: "1px solid #ddd",
//     backgroundColor: "white",
//   },
//   reviewComment: {
//     marginTop: 8,
//     fontSize: 16,
//     color: "#555",
//   },
//   reviewsList: {
//     marginTop: "2rem", // fixed gap from 25rem to 2rem
//     padding: "1rem 2rem",
//   },
// };

// export default PostRating;
