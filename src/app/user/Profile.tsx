"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// userID should be pass
export default function Profile({ id } : { id : string }) {
  const router = useRouter();
  const [user, setUser] = useState("loading");
  const [email, setEmail] = useState("loading@loading.com");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const getUserInfo = async function() {
      console.log(`getting info of user: id = ${id}`)
      if (!id) return;
      const res = await fetch("https://connisewer.onrender.com/user/info/id=" + id)
      if (!!res.ok) {
        const user = await res.json();
        setUser(user.name)
        setEmail(user.email)
      }
    }

    getUserInfo();
  }, [id]);

  const handleLogOut = () => {
    // logout
    // navigate to home page
    router.push("/");
  };

  const handleEdit = () => {
    if (!isDisabled) {
      // send a put request to update the user's information
    }
    setIsDisabled((x) => !x);
  };

  return (
    <div className="md:flex justify-between mx-auto p-2">
      <div className="flex">
        <div className="avatar">
          <div className="w-24 rounded">
            {/* <Image
              height={24}
              width={24}
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt=""
            /> */}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4 w-100">
          <label className="floating-label">
            <span>Username</span>
            <input
              type="text"
              // placeholder="Username"
              className="input input-lg w-full"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              disabled={isDisabled}
            />
          </label>
          <label className="floating-label">
            <span>Email</span>
            <input
              type="text"
              // placeholder="Username"
              className="input input-lg w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isDisabled}
            />
          </label>
        </div>
        <button className="btn mt-6" onClick={handleEdit}>
          {isDisabled ? "Edit" : "Save"}
        </button>
      </div>

      <div>
        <button
          className="btn btn-soft btn-error mt-4"
          onClick={() => handleLogOut()}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
