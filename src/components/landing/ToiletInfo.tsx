"use client";

import React, { useState, useEffect } from "react";
import { ToiletType } from "./PublicToilets";
import Review, { ReviewType } from "./Review";
import RatingRead from "./RatingRead";

type ToiletProps = {
  toilet: ToiletType | null;
  setSelectedToilet: (toilet: ToiletType | null) => void;
  setRouteFinish: (x: [number, number] | null) => void;
};

export default function ToiletInfo({
  toilet,
  setSelectedToilet,
  setRouteFinish,
}: ToiletProps) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  useEffect(() => {
    async function getReviews() {
      const res = await fetch(
        "https://connisewer.onrender.com/reviews/toiletId=" + toilet?.id
      );
      if (!res.ok) {
        console.log(res);
      }

      const data: { reviews: ReviewType[]; average: number } = await res.json();

      if (!!data.reviews) {
        console.log(data.reviews);
        setReviews(data.reviews);
        Promise.all(
          data.reviews.map(async (x) => {
            const res = await fetch(
              "https://connisewer.onrender.com/user/info/id=" + x.user
            );
            if (!res.ok) {
              console.log(res);
            }
            const userInfo = await res.json();
            return {
              _id: x._id,
              text: x.text,
              rating: x.rating,
              toilet: x.toilet,
              user: userInfo.name,
            };
          })
        )
          .then((r) => setReviews(r))
          .catch((e) => console.log(e));
      }
      if (!!data.average) {
        setAvgRating(data.average);
      }
    }

    if (toilet !== null) {
      getReviews();
    }
  }, [toilet]);

  return (
    <>
      <dialog id="add_review_modal" className="modal">
        <div className="modal-box text-primary-content">
          <h3 className="font-bold text-lg">Leave a Review!</h3>

          {/* Review Comment */}
          <div className="form-control my-4">
            <textarea
              placeholder="Write your review here..."
              className="textarea textarea-bordered w-full"
              rows={4}
              required
            ></textarea>
          </div>

          {/* Star Rating */}
          <div className="form-control my- flex flex-col">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <div className="rating rating-lg">
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-yellow-400 hover:opacity-50"
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-yellow-400 hover:opacity-50"
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-yellow-400 hover:opacity-50"
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-yellow-400 hover:opacity-50"
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-yellow-400 hover:opacity-50"
              />
            </div>
          </div>

          {/* Modal Footer with Submit */}
          <div className="modal-action">
            <button className="btn btn-primary">Submit Review</button>
            <button className="btn" method="dialog">
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {toilet != null && (
        <div className="absolute max-w-6xl mx-auto min-h-80 bottom-4 left-4 right-4 bg-base-100 text-primary-content flex p-4 justify-between px-6 rounded-xl shadow-md z-[1000]">
          <div className="w-full">
            <p className="text-5xl">{toilet.title}</p>
            <p className="text-xs">{toilet.id}</p>
            <p className="text-sm">
              Coordinates: {toilet.lat}, {toilet.lon}
            </p>
            {!avgRating ? (
              <p className="text-base-content">no reviews</p>
            ) : (
              <div className="flex items-center gap-2">
                <p>Average Rating: {avgRating.toFixed(2)}</p>
                <RatingRead rating={avgRating} />
              </div>
            )}
            <p>{toilet.desc}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-outline btn-accent text-accent-content"
                onClick={() =>
                  document.getElementById("add_review_modal").showModal()
                }
              >
                Add Review
              </button>
              <button
                className="btn btn-outline btn-primary text-primary-content"
                onClick={() => setRouteFinish([toilet.lat, toilet.lon])}
              >
                Directions
              </button>
              <button className="btn btn-outline btn-acccent">Share</button>
            </div>
            <div className="divider"></div>
            <p className="text-xl underline">Reviews</p>
            <div className="w-full max-h-48 overflow-scroll">
                <div className="flex flex-col gap-4 text-sm text-base-content">
                  {reviews.map((x, i) => (
                    <Review review={x} key={i} />
                  ))}
                </div>
              </div>
          </div>
          <button
            className="btn rounded-full bg-accent text-accent-content"
            onClick={() => setSelectedToilet(null)}
          >
            x
          </button>
        </div>
      )}
    </>
  );
}
