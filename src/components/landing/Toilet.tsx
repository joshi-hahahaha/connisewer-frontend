'use client'

import React, { useState, useEffect } from "react";
import RatingRead from "./RatingRead";
import Comments, { CommentReviewType } from "./Comments";

export type ToiletType = {
  id: number;
  longitude: number;
  latitude: number;
  title: string;
  rating: number;
  created_at: string;
  desc: string;
}

type ToiletProps = {
  toilet: ToiletType | null;
  setSelectedToilet: (toilet: ToiletType | null) => void;
};


export default function Toilet({ toilet, setSelectedToilet }: ToiletProps) {
  const [comments, setComments] = useState<CommentReviewType[]>([]);

  useEffect(() => {
    // in mongoDB it is possible to just nest the comment directly in the toilet
    // might need to make another query though
    async function getComments() {
      setComments([
        {
          review: "i really like this toilet",
          user: 12093,
          rating: 4.7
        },
        {
          review: "took the fattest dump here",
          user: 321,
          rating: 3.2
        }
      ])
    }

    getComments();
  }, []);

  return (
    <>
      {
        toilet != null && (
          <div className="absolute max-w-6xl mx-auto min-h-80 bottom-4 left-4 right-4 bg-base-100 text-primary-content flex p-4 justify-between px-6 rounded-xl shadow-md z-[1000]">
            <div>
              <p className="text-4xl">{toilet.title}</p>
              <div className="flex gap-2 items-center my-1">
                <RatingRead rating={toilet.rating} />
                <p>{toilet.rating}</p>
              </div>
              <p className="">{toilet.desc}</p>
              <p>Coordinates: {toilet.latitude}, {toilet.longitude}</p>
              <Comments comments={comments} />
            </div>
            <div>
              <button className="btn rounded-full bg-accent text-accent-content" onClick={() => setSelectedToilet(null)}>x</button>
            </div>
          </div>
        )
      }
    </>

  )
}