import React from "react";
import RatingRead from "./RatingRead";
import Link from "next/link";
export type CommentReviewType = {
  review: string;
  user: number;
  rating: number;
}

type PropsType = {
  comments: CommentReviewType[];
};

const Comments = ({ comments }: PropsType) => {

  return (
    <div className="w-full">
      <p className="text-xl text-base-content underline">Reviews</p>
      {comments.map((c, i) => (
        <div key={i} >
          <div className="divider m-2"></div>
          <div className="text-base-content">
            <div className="flex gap-2 items-center">
              <Link href="/user" className="link text-lg">User: {c.user}</Link>
              <RatingRead rating={c.rating} styles="rating-xs" />
              <div className="text-xs">({c.rating})</div>
            </div>
            <p>{c.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
