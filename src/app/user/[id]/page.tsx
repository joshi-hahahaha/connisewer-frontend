'use client';
import React, { useEffect, useState } from 'react';
import Profile from '../Profile';
import Navbar from '../Navbar';
import Review from '../Review';

import { ReviewType } from '@/components/landing/Review';
import { useParams } from 'next/navigation'; // Use useRouter from next/navigation

export default function User() {
  const { id } = useParams(); // Get the dynamic id from the URL
  const [sortBy, setSortBy] = useState('Most Recent');
  const [myReviews, setMyReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    if (!id) return; // Don't fetch until we have the id

    async function getMyReviews() {
      const res = await fetch(`https://connisewer.onrender.com/user/id=${id}/reviews`);
      if (!res.ok) {
        console.error('Failed to fetch reviews');
        return;
      }

      const reviews = await res.json();
      console.log(reviews);
      setMyReviews(reviews);
    }

    getMyReviews();
  }, [id]); // Re-run when the id changes

  useEffect(() => {
    setMyReviews((revs) =>
      [...revs].sort((a, b) => {
        if (sortBy === 'Lowest Rated') {
          return b.rating - a.rating;
        }
        if (sortBy === 'Highest Rated') {
          return a.rating - b.rating;
        }
        return 0;
      })
    );
  }, [sortBy]); // Sorting depends on the sortBy state

  return (
    <>
      <Navbar />
      <div className="w-full h-full pt-24 max-w-5xl mx-auto bg-base-100">
        <Profile id={id} />
        <div className="divider">My Reviews</div>
        <section className="mx-auto mb-24">
          <div className="filter m-2 gap-2">
            {['Highest Rated', 'Lowest Rated'].map((option) => (
              <label
                key={option}
                className={`btn ${sortBy === option ? 'bg-base-300' : 'bg-base-100'}`}
              >
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
            {myReviews.map((review, i) => (
              <Review review={review} key={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
