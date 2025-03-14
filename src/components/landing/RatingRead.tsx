import React from "react";

type PropsType = {
  rating: number;
  styles?: string;
};

const RatingRead = ({ rating, styles }: PropsType) => {
  const roundedRating = Math.round(rating);

  return (
    <div className={`rating ${styles}`}>
      {[...Array(5)].map((_, index) => {
        const value = (index + 1);
        return (
          <input
            key={value}
            type="radio"
            name="rating"
            className={`mask mask-star-2 bg-accent-content`}
            aria-label={`${value} star`}
            aria-current={roundedRating === value ? "true" : "false" }
            disabled
          />
        );
      })}
    </div>
  );
};

export default RatingRead;
