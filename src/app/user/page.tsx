'use client'
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Navbar from "./Navbar";
import Review from "./Review";

export type ReviewType = {
  id: number;
  longitude: number;
  latitude: number;
  title: string;
  rating: number;
  created_at: string;
  desc: string;
};

export default function User() {
  const [sortBy, setSortBy] = useState("Most Recent");
  const [myReviews, setMyReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    async function getMyReviews() {
      setMyReviews([
        {
          id: 1,
          longitude: 45.123456,
          latitude: -73.987654,
          title: "Amazing Place!",
          rating: 4.5,
          created_at: "2025-02-20T14:30:00.000Z",
          desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
        },
        {
          id: 2,
          longitude: -122.456789,
          latitude: 37.765432,
          title: "Not bad",
          rating: 3.8,
          created_at: "2025-03-05T09:15:00.000Z",
          desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
        },
        {
          id: 3,
          longitude: 90.876543,
          latitude: -45.123987,
          title: "Would visit again",
          rating: 4.9,
          created_at: "2025-02-28T18:45:00.000Z",
          desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
        },
        {
          id: 4,
          longitude: -75.432198,
          latitude: 40.876543,
          title: "Overrated",
          rating: 2.3,
          created_at: "2025-03-10T12:00:00.000Z",
          desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
        },
        {
          id: 5,
          longitude: 150.654321,
          latitude: -30.987123,
          title: "Hidden Gem",
          rating: 5.0,
          created_at: "2025-02-25T20:10:00.000Z",
          desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
        },
      ]);
    }

    getMyReviews();
  }, []);

  useEffect(() => {
    setMyReviews(revs => revs.sort((a, b) => {
      if (sortBy === "Most Recent") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "Oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === "Lowest Rated") {
        return b.rating - a.rating;
      }
      if (sortBy === "Highest Rated") {
        return a.rating - b.rating;
      }
      return 0;
    }));
  }, [sortBy]);


  return (
    <>
      <Navbar />
      <div className="w-full h-full pt-24 max-w-5xl mx-auto bg-base-100">
        <Profile />
        <div className="divider">My Reviews</div>
        <section className="mx-auto mb-24">
          <div className="filter m-2 gap-2">
            {["Most Recent", "Oldest", "Highest Rated", "Lowest Rated"].map((option) => (
              <label key={option} className={`btn ${sortBy === option ? 'bg-base-300' : 'bg-base-100'}`}>
                <input
                  type="radio"
                  name="sortBy"
                  value={option}
                  checked={sortBy === option}
                  onChange={() => setSortBy(option)}
                  className="hidden"
                  aria-label={sortBy}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="flex flex-col gap-2 place-items-center">
            {
              myReviews.map((review, i) => (
                <Review review={review} key={i} />
              ))
            }
          </div>
        </section>
      </div>
    </>
  );
}
