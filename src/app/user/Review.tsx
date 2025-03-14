'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { ReviewType } from "./page";

type ReviewProps = {
  review: ReviewType;
};

export default function Review({ review } : ReviewProps) {
  const router = useRouter();

  const navigate_to_review = () => {
    console.log("navigating")
    router.push(`/?toilet=${review.id}`);
  }

  return (
    <div className="card bg-base-300 w-140">
      <div className="card-body">
        <h2 className="card-title">{review.title}</h2>
        <p>{review.desc}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-primary text-primary-content" onClick={() => navigate_to_review()}>Show on map</button>
        </div>
        <div>
          <p>Rating: {review.rating}</p>
          <p>Created at: {review.created_at}e</p>
        </div>
      </div>
    </div>
  );
}
