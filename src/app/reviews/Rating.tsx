import React, { useState } from "react";

const Rating = ({ setReview }: { setReview: (rating: number) => void }) => {
  const [rating, setRating] = useState(2); // Default rating is 2

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setReview(newRating);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name="rating"
          className="mask mask-star"
          aria-label={`${star} star`}
          checked={rating === star}
          onChange={() => handleRatingChange(star)}
        />
      ))}
    </div>
  );
};

export default Rating;
