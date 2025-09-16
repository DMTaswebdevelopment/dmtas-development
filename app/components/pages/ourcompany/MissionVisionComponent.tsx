"use client";

import { missionLists } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

// Type definition for mission list item
interface MissionListItem {
  icon?: React.ComponentType<{ className?: string }>;
  header: string;
  desc: string;
}

const MissionVisionComponent: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /**
       * uncomment this to show scrolltrigger
       * gsap.registerPlugin(ScrollTrigger);
       */

      gsap.registerPlugin(ScrollTrigger);

      // Animation for the cards using fromTo and ScrollTrigger
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          {
            // FROM state
            opacity: 0,
            y: 50,
          },
          {
            // TO state
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: cardsRef }
  );

  return (
    <div className="py-32 px-7 sm:px-10 2xl:px-28">
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        {/* Services Cards */}
        <div
          ref={cardsRef}
          className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2  gap-6"
        >
          {(missionLists as MissionListItem[]).map(
            (missionlist: MissionListItem, index: number) => (
              <div
                key={index}
                className={`card-item h-auto relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 
            hover:border-transparent
            before:absolute before:inset-0 before:rounded-2xl before:p-[2px] 
            before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-pink-400
            before:opacity-0 before:transition-opacity before:duration-300
            hover:before:opacity-100
            before:animate-pulse
            after:absolute after:inset-[2px] after:rounded-2xl after:bg-white
            hover:after:bg-white`}
                style={{
                  background: "white",
                }}
              >
                {/* Icon */}
                <div className="mb-6 relative z-10">
                  <h3 className="flex uppercase justify-center items-center gap-2 relative text-2xl font-bold font-monserrat_bold">
                    {/* Conditional rendering for the icon */}
                    {missionlist.icon && (
                      <missionlist.icon className="w-8 h-8" />
                    )}
                    {missionlist.header}
                  </h3>
                </div>

                {/* Content */}
                <div className="mb-6 relative z-10">
                  <p className="text-gray-500 leading-relaxed font-sans text-base text-center tracking-wide">
                    {missionlist.desc}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionVisionComponent;
