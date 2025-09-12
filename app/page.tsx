"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import HeroSection from "./components/pages/landingpage/HeroSection";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  return (
    <>
      <HeroSection />
    </>
  );
}
