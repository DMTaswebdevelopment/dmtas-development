"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

const Achievements = () => {
  const achievementsRef = useRef<HTMLDivElement>(null);

  const achievementLists = [
    {
      id: 0,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756865113/greenthrophie_qkzjz1.svg",
    },
    {
      id: 1,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756864561/image_14-removebg-preview_z7fbdj.png",
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756864561/image_13-removebg-preview_uhkmli.png",
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756864561/image_19-removebg-preview_omu1vh.png",
    },
    {
      id: 4,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756864561/image_15-removebg-preview_i82yuk.png",
    },
    {
      id: 5,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756864561/image_18-removebg-preview_qfbhz5.png",
    },
  ];

  useGSAP(() => {
    if (!achievementsRef.current) return; // safety check ✅

    const achievementItems =
      achievementsRef.current.querySelectorAll(".achievement-item");

    if (!achievementItems.length) return; // no items found, exit early ✅

    gsap.set(achievementItems, {
      y: 60,
      opacity: 0,
      scale: 0.6,
      rotation: -10,
    });

    ScrollTrigger.create({
      trigger: achievementsRef.current,
      start: "top 90%",
      animation: gsap.to(achievementItems, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: "elastic.out(1, 0.8)",
        stagger: {
          amount: 0.2,
          from: "start",
          grid: "auto",
        },
      }),
      toggleActions: "restart none none reverse",
    });

    // hover animations
    achievementItems.forEach((item) => {
      const image = item.querySelector("img");
      if (!image) return;

      const tl = gsap.timeline({ paused: true });

      tl.to(item, {
        scale: 1.15,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(1.7)",
      }).to(
        image,
        {
          filter: "grayscale(0%) brightness(1.1)",
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      item.addEventListener("mouseenter", () => tl.play());
      item.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);

  return (
    <div
      ref={achievementsRef}
      className="relative py-16 bg-[#F5F6FD] px-10 md:px-32"
    >
      <div className="max-w-7xl mx-auto w-full mb-16">
        <div className="flex flex-col items-center ">
          {/* First row - 4 items */}
          <div className="flex justify-center items-center flex-wrap gap-14 xl:gap-32">
            {achievementLists.map((achievementList, index) => (
              <div
                key={achievementList.id}
                className="achievement-item w-12 h-12 md:w-16 md:h-16 cursor-pointer"
              >
                <Image
                  src={achievementList.img}
                  className="w-full h-full object-contain grayscale"
                  height={500}
                  width={500}
                  alt={`Achievement ${index + 1}`}
                />
              </div>
            ))}
          </div>
          {/* Second row - 2 items (fixed slice to show only 2 remaining items) */}
          {/* <div className="flex w-full justify-between flex-wrap items-center xl:gap-32 mt-10">
            {achievementLists.slice(4, 6).map((achievementList, index) => (
              <div
                key={achievementList.id}
                className="achievement-item w-16 h-16 md:w-20 md:h-20 cursor-pointer"
              >
                <Image
                  src={achievementList.img}
                  className="w-full h-full object-contain grayscale"
                  height={500}
                  width={500}
                  alt={`Achievement ${index + 5}`}
                />
              </div>
            ))}
          </div> */}
        </div>
      </div>
      {/* <hr className="absolute left-0 w-full h-[2px] bg-gray-400 " /> */}
    </div>
  );
};

export default Achievements;
