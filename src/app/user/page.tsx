'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Profile from "./Profile";

export default function User() {
  const [sortBy, setSortBy] = useState("Most Recent");
  const [myReviews, setMyReviews] = useState([
    {
      longitude: 45.123456,
      latitude: -73.987654,
      title: "Amazing Place!",
      rating: 4.5,
      created_at: "2025-02-20T14:30:00.000Z",
      desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
    },
    {
      longitude: -122.456789,
      latitude: 37.765432,
      title: "Not bad",
      rating: 3.8,
      created_at: "2025-03-05T09:15:00.000Z",
      desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
    },
    {
      longitude: 90.876543,
      latitude: -45.123987,
      title: "Would visit again",
      rating: 4.9,
      created_at: "2025-02-28T18:45:00.000Z",
      desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
    },
    {
      longitude: -75.432198,
      latitude: 40.876543,
      title: "Overrated",
      rating: 2.3,
      created_at: "2025-03-10T12:00:00.000Z",
      desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
    },
    {
      longitude: 150.654321,
      latitude: -30.987123,
      title: "Hidden Gem",
      rating: 5.0,
      created_at: "2025-02-25T20:10:00.000Z",
      desc: "asldkjsaldksajdlsakjd lsakjdlsakdj salkdj sa;ldkjs lds"
    },
  ]);

  useEffect(() => {
    setMyReviews(myReviews.sort((a, b) => {
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
    <div className="w-full h-full">
      <div className="mx-auto">
        <Profile />
      </div>
      <div className="divider">My Reviews</div>
      <div className="filter m-2 gap-2">
        {["Most Recent", "Oldest", "Highest Rated", "Lowest Rated"].map((option) => (
          <label key={option} className={`btn ${sortBy === option ? 'bg-base-300' : ''}`}>
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
            <div className="card bg-base-300 w-140" key={i}>
              <div className="card-body">
                <h2 className="card-title">{review.title}</h2>
                <p>{review.desc}</p>
                <div className="card-actions justify-end">
                  <button className="btn bg-primary text-primary-content">Show on map</button>
                </div>
                <div>
                  <p>{review.rating}</p>
                  <p>{review.created_at}e</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
