'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState("John_Doe2")

  const handleLogOut = () => {
    // logout
    // navigate to home page
    router.push('/');
  }

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
          <input type="text" placeholder="Username" className="input input-md" value={user} onChange={e => setUser(e.target.value)} />
        </label>
      </div>

      <div>
        <button className="btn btn-soft btn-error" onClick={() => handleLogOut()}>Log out</button>
      </div>
    </div>
  );
}
