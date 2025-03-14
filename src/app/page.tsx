"use client";

import Navbar from "@/components/navbar/Navbar";
import dynamic from "next/dynamic";

const LandingMap = dynamic(() => import("@/components/landing/LandingMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-screen h-screen relative">
      <Navbar />
      <LandingMap />
    </div>
  );
}
