"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
  // Fix: Change to gsap.core.Timeline type instead of HTMLDivElement
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Animation refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756943676/modern-printing-press-creates-colorful-documents-indoors-generated-by-ai_188544-22624_pse6zn.jpg",
    "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756773389/Component_4_gynwiq.png",
    "https://res.cloudinary.com/dmz8tsndt/image/upload/v1731398200/samples/balloons.jpg",
    "https://res.cloudinary.com/dmz8tsndt/image/upload/v1731398194/samples/cloudinary-group.jpg",
  ];

  // Auto-cycle images with smooth scaling transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Handle background image transition with proper scaling effect
  useEffect(() => {
    if (backgroundRef.current) {
      // Reset to original scale and start the scaling animation for new image
      gsap.set(backgroundRef.current, { scale: 1 });

      // Smooth scale animation from 1 to 1.1 over 5 seconds
      gsap.to(backgroundRef.current, {
        scale: 1.3,
        duration: 5,
        ease: "back.out",
      });
    }
  }, [currentImageIndex]);

  useGSAP(() => {
    // Create main timeline
    const tl = gsap.timeline();

    // Initial states
    gsap.set(titleRef.current, { x: 200, opacity: 0 });
    gsap.set(paragraphRef.current, { y: 30, opacity: 0 });
    gsap.set(buttonRef.current, { y: 30, opacity: 0 });
    gsap.set(circleRef.current, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
    });

    // Set initial background state to original scale
    gsap.set(backgroundRef.current, { scale: 1, opacity: 1 });

    // Start initial scaling animation for first image
    gsap.to(backgroundRef.current, {
      scale: 1.1,
      duration: 5,
      ease: "power2.inOut",
    });

    // Circle animation - expand from center
    tl.to(circleRef.current, {
      scale: 1,
      opacity: 0.8,
      duration: 1.5,
      ease: "power3.out",
    })
      // H1 animation - slide from right to left
      .to(
        titleRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.0"
      ) // Start 1s before circle animation ends
      // Paragraph animation - slide up and fade in
      .to(
        paragraphRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      ) // Start 0.6s before the title animation ends
      // Button animation
      .to(
        buttonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      ); // Start 0.3s before paragraph animation ends

    // Store timeline for potential cleanup
    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Background Image with Smooth Transitions */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src={images[currentImageIndex]}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Expanding Circle */}
      <div
        ref={circleRef}
        className="absolute opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full 2xl:w-1/2 h-[30rem] 2xl:h-screen rounded-full bg-black/20 z-5"
      />

      {/* Content centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/10">
        <div className="max-w-4xl text-white text-center px-6">
          <h1
            ref={titleRef}
            className="text-4xl md:text-7xl font-bold mb-6 font-monserrat_bold text-white opacity-0"
          >
            Solutions for <span className="text-[#0089CF]">Every</span>{" "}
            <span className="text-[#0089CF]">Business</span> Journey
          </h1>

          <p
            ref={paragraphRef}
            className="text-base md:text-lg leading-relaxed font-sans text-gray-50 max-w-2xl mx-auto mb-8 opacity-0"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>

          {/* <div ref={buttonRef} className="opacity-0">
            <ButtonComponent className="relative w-1/3 text-white font-bold px-8 py-3 md:text-base hover:opacity-80 transition rounded-xl bg-[#0089CF] tracking-wide ease-in-out duration-300 font-sans flex items-center justify-center gap-3 mx-auto ">
              Contact Us
            </ButtonComponent>
          </div> */}
        </div>
      </div>

      {/* Image Indicator Dots (Optional) */}
      <div className="absolute bottom-10 xl:left-[12rem] left-[50%] transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
