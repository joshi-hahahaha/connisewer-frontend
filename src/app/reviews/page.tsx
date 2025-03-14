'use client'
import React, { useState } from "react";
import Rating from "./Rating";

export default function Reviews() {
  const [review, setReview] = useState({
    title: "",
    description: "",
    location: "",
    rating: 2, // Default rating
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Don't close the modal just yet
    console.log("Submit this new review to backend:", review);

    // clear the review
    setReview({
      title: "",
      description: "",
      location: "",
      rating: 2, // Default rating 
    })
    document.getElementById('review-modal')?.close(); // now close it
  };

  return (
    <div className="w-full h-full">
      <button className="btn" onClick={() => document.getElementById('review-modal')?.showModal()}>open modal</button>
      <dialog id="review-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Page details</legend>

            <label className="fieldset-label">Title</label>
            <input type="text" name="title" className="input" value={review.title} onChange={handleChange} />

            <label className="fieldset-label">Description</label>
            <input type="text" name="description" className="input" value={review.description} onChange={handleChange} />

            <label className="fieldset-label">Location</label>
            <input type="text" name="location" className="input" value={review.location} onChange={handleChange} />

            <label className="fieldset-label">Rating</label>
            <Rating setReview={(rating) => setReview(prev => ({ ...prev, rating }))} />
          </fieldset>

          <p>{JSON.stringify(review)}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
              <button className="btn" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
