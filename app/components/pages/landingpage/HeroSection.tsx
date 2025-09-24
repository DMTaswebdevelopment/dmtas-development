"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
  // Fix: Change to gsap.core.Timeline type instead of HTMLDivElement
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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

  // Dynamic content for each image
  const contentData = [
    {
      title: "Solutions for Every Business Journey",
      highlightWords: ["Every", "Business"],
      description:
        "Transform your printing and publishing processes with our state-of-the-art technology. From concept to creation, we deliver professional results that elevate your brand and exceed expectations.",
    },
    {
      title: "Innovation Meets Excellence",
      highlightWords: ["Innovation", "Excellence"],
      description:
        "Discover cutting-edge solutions designed to streamline your workflow and maximize efficiency. Our comprehensive platform empowers businesses to achieve remarkable results through intelligent automation.",
    },
    {
      title: "Celebrate Success Together",
      highlightWords: ["Celebrate", "Success"],
      description:
        "Join thousands of satisfied customers who have transformed their business operations with our innovative solutions. Experience the joy of seamless processes and exceptional outcomes.",
    },
    {
      title: "Building Stronger Connections",
      highlightWords: ["Building", "Connections"],
      description:
        "Foster meaningful relationships and drive collaborative growth with our comprehensive business solutions. Connect, engage, and succeed with tools designed for the modern workplace.",
    },
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

  // Animate content changes when image index changes (skip for initial load)
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip animation on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    if (titleRef.current && paragraphRef.current && circleRef.current) {
      // Create a timeline for content transition
      const contentTl = gsap.timeline();

      // fade out simultaneously but with their own properties
      contentTl
        .to(titleRef.current, {
          opacity: 0,
          x: -100,
          duration: 0.4,
          ease: "power2.in",
        })
        .to(
          paragraphRef.current,
          { opacity: 0, y: 20, duration: 0.4, ease: "power2.in" },
          "<"
        )
        .to(
          circleRef.current,
          { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" },
          "-=0.2"
        )
        // resets
        .set(titleRef.current, { x: 200, opacity: 0 })
        .set(paragraphRef.current, { x: 0, y: 30, opacity: 0 }) // x explicitly 0
        .set(circleRef.current, { scale: 0, opacity: 0 })
        // fade in
        .to(circleRef.current, {
          scale: 1,
          opacity: 0.8,
          duration: 1.5,
          ease: "power3.out",
        })
        .to(
          titleRef.current,
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1.0"
        )
        .to(
          paragraphRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
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

  // Function to render title with highlighted words
  const renderTitle = (title: string, highlightWords: string[]) => {
    const words = title.split(" ");
    return words.map((word, index) => {
      const cleanWord = word.replace(/[^\w]/g, ""); // Remove punctuation for comparison
      const isHighlighted = highlightWords.includes(cleanWord);
      return (
        <span key={index}>
          {isHighlighted ? (
            <span className="text-[#0089CF]">{word}</span>
          ) : (
            word
          )}
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  const currentContent = contentData[currentImageIndex];

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
            className="text-4xl md:text-7xl font-bold mb-10 font-monserrat_bold text-white opacity-0"
          >
            {renderTitle(currentContent.title, currentContent.highlightWords)}
          </h1>

          <p
            ref={paragraphRef}
            className="text-base md:text-lg leading-relaxed font-sans text-gray-50 max-w-2xl mx-auto mb-8 opacity-0"
          >
            {currentContent.description}
          </p>
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
