"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ReviewType } from "./[slug]";
import RatingRead from "@/components/landing/RatingRead";

type ReviewProps = {
  review: ReviewType;
};

export default function Review({ review }: ReviewProps) {
  const router = useRouter();

  const navigate_to_review = () => {
    console.log("navigating");
    router.push(`/?toilet=${review.toilet}`);
  };

  return (
    <div className="card bg-base-300 w-140">
      <div className="card-body">
        <h2 className="card-title text-base-content">Toilet: {review.toilet}</h2>
        <p className="text-base-content">{review.text}</p>
        <div className="card-actions justify-end">
          <button
            className="btn bg-primary text-primary-content"
            onClick={() => navigate_to_review()}
          >
            Show on map
          </button>
        </div>
        <div>
          <div className="flex gap-2">
            <span className="text-primary-content">
              Rating: {review.rating}
            </span>
            <RatingRead rating={review.rating} styles="rating-sm" />
          </div>
          <p className="text-primary-content">
            Created at: {review.date}
          </p>
        </div>
      </div>
    </div>
  );
}
