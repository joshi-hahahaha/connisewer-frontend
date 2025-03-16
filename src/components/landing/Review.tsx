import React from "react";
import RatingRead from "./RatingRead";
import { useRouter } from "next/navigation";

export type ReviewType = {
  _id: string;
  text: string;
  rating: number;
  user: string;
  toilet: number;
  username?: string;
}

type PropsType = {
  review: ReviewType;
};

const Review = ({ review }: PropsType) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/user/" + review.user);
  }
  return (
    <button onClick={handleClick}>
      <div className="flex flex-col items-start">
        <p>User: {!review.username ? review.user : review.username}</p>
        <div className="flex items-center gap-2">
          <span>Rating: {review.rating}</span>
          <RatingRead rating={review.rating} styles="rating-xs" />
        </div>
        <p>{review.text}</p>
      </div>
    </button>
  );
};

export default Review;
