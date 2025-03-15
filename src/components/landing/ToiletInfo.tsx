'use client'

import React, { useState, useEffect } from "react";
import { ToiletType } from "./PublicToilets";
import Review, { ReviewType } from "./Review";

type ToiletProps = {
  toilet: ToiletType | null;
  setSelectedToilet: (toilet: ToiletType | null) => void;
};

export default function ToiletInfo({ toilet, setSelectedToilet }: ToiletProps) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    async function getReviews() {
      const res = await fetch("https://connisewer.onrender.com/reviews/toiletId=" + toilet?.id);
      if (!res.ok) {
        console.log(res)
      }

      const reviews: ReviewType[] = await res.json();

      setReviews(reviews);

      const thingo = await Promise.all(reviews.map(async x => {
        const res = await fetch("https://connisewer.onrender.com/user/id=" + x.user);
        if (!res.ok) {
          console.log(res)
        }
        const userInfo = await res.json();
        console.log(userInfo);
        return {
          _id: x._id,
          text: x.text,
          rating: x.rating,
          toilet: x.toilet,
          user: userInfo.name
        };
      }));
    
      setReviews(thingo);
    }

    if (toilet !== null) {
      getReviews();
    }
  }, [toilet]);

  return (
    <>
      {
        toilet != null && (
          <div className="absolute max-w-6xl mx-auto min-h-80 bottom-4 left-4 right-4 bg-base-100 text-primary-content flex p-4 justify-between px-6 rounded-xl shadow-md z-[1000]">
            <div className="w-full">
              <p className="text-5xl">{toilet.title}</p>
              <p className="text-xs">{toilet.id}</p>
              <p className="text-sm">Coordinates: {toilet.lat}, {toilet.lon}</p>
              <p>{toilet.desc}</p>
              <div className="divider"></div>
              <p className="text-xl underline">Reviews</p>
              <div className="flex flex-col gap-4 text-sm text-base-content">
                {reviews.map((x, i) => (
                  <Review review={x} key={i} />
                ))}
              </div>
            </div>
            <button className="btn rounded-full bg-accent text-accent-content" onClick={() => setSelectedToilet(null)}>x</button>
          </div>
        )
      }
    </>

  )
}
