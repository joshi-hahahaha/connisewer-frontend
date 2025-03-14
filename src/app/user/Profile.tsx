'use client'
import React, { useState } from "react";
export default function Profile() {
  const [user, setUser] = useState("John_Doe2")

  return (
    <div className="flex mx-auto p-2">
      <div className="avatar">
        <div className="w-24 rounded">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="p-4">
        <label className="floating-label">
          <span>Username</span>
          <input type="text" placeholder="Username" className="input input-md" value={user} onChange={e => setUser(e.target.value)}/>
        </label>
      </div>
    </div>
  );
}
