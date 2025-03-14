'use client'
import React, { useState } from "react";
export default function Review({ review }) {
  const [user, setUser] = useState("John_Doe2")

  const navigate_to_review = () => {
    console.log("navigating")  
  }

  return (
    <div className="card bg-base-300 w-140">
      <div className="card-body">
        <h2 className="card-title">{review.title}</h2>
        <p>{review.desc}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-primary text-primary-content" onClick={() => navigate_to_review}>Show on map</button>
        </div>
        <div>
          <p>{review.rating}</p>
          <p>{review.created_at}e</p>
        </div>
      </div>
    </div>
  );
}
