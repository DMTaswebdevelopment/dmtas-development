"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import HeroSection from "./components/pages/landingpage/HeroSection";
import HomeServices from "./components/pages/landingpage/HomeServices";
import Achievements from "./components/pages/landingpage/Achievements";
import OurProducts from "./components/pages/landingpage/OurProducts";
import FeedbackSection from "./components/pages/landingpage/Feedback";
import InquirySection from "./components/pages/landingpage/InquirySection";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  return (
    <>
      <HeroSection />
      <HomeServices />
      <Achievements />
      <OurProducts />
      <FeedbackSection />
      <InquirySection />
    </>
  );
}
