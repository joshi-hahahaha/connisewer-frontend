import React from "react";
import RatingRead from "./RatingRead";

export type ReviewType = {
  _id: string;
  text: string;
  rating: number;
  user: string;
  toilet: number;
}

type PropsType = {
  review: ReviewType;
};

const Review = ({ review }: PropsType) => {
  return (
    <div>
      <p>User: {review.user}</p>
      <div className="flex items-center gap-2">
        <span>Rating: {review.rating}</span>
        <RatingRead rating={review.rating} styles="rating-xs" />
      </div>
      <p>{review.text}</p>
    </div>
  );
};

export default Review;
