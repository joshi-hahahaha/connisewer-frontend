"use client";

import dynamic from "next/dynamic";

const LandingMap = dynamic(() => import("@/components/LandingMap"), {
  ssr: false,
});

export default function Home() {
  return <LandingMap />;
}
