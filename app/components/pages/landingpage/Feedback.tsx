"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import CustomerLogosSection from "./CustomerLogoSection";

// Type definitions
interface Testimonial {
  id: number;
  image: string;
  text: string;
  name: string;
  position: string;
}

interface RefElement extends HTMLElement {}

const FeedbackSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [animationsComplete, setAnimationsComplete] = useState<boolean>(false);
  const [counterValue, setCounterValue] = useState<number>(0);

  // Refs with proper typing
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTestimonials = useRef<HTMLDivElement>(null);
  const rightTestimonials = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757023073/main-removebg-preview_ofvqqy.png",
      text: "On the other hand, we denounce with right us indignation and dis men who are so beguiled and dem course material",
      name: "Hard Brown",
      position: "Designer",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757023073/main-removebg-preview_ofvqqy.png",
      text: "Working with this team has been an absolute pleasure. Their creativity and attention to detail exceeded all our expectations.",
      name: "Sarah Johnson",
      position: "Marketing Director",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757023073/main-removebg-preview_ofvqqy.png",
      text: "The innovative solutions provided helped transform our business completely. Highly recommend their professional services.",
      name: "Michael Chen",
      position: "CEO",
    },
  ];

  // GSAP animations using useGSAP hook
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Text split animation
      const split = new SplitText("h2", { type: "chars" });

      gsap.set(split.chars, {
        opacity: 0,
        x: 100,
      });

      // Initial setup - hide everything
      const validImageRefs = imageRefs.current.filter(
        (ref): ref is HTMLDivElement => ref !== null
      );
      const validTestimonialRefs = testimonialRefs.current.filter(
        (ref): ref is HTMLDivElement => ref !== null
      );

      if (validImageRefs.length > 0) {
        gsap.set(validImageRefs, {
          opacity: 0,
          scale: 0.8,
          y: 50,
        });
      }

      if (validTestimonialRefs.length > 0) {
        gsap.set(validTestimonialRefs, { opacity: 0, x: 100 });
      }
      gsap.set(leftTestimonials.current, { opacity: 0, y: 30 });
      gsap.set(rightTestimonials.current, { opacity: 0, y: 30 });

      // Main timeline for all animations - OPTIMIZED TRIGGER
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Changed from 90% to 70% for earlier trigger
          toggleActions: "play none none none",
        },
      });

      // Add text animation to timeline - FASTER TIMING
      mainTl
        .to(
          split.chars,
          {
            opacity: 1,
            x: 0,
            duration: 0.2, // Reduced from 0.2
            ease: "back.out(1.7)",
            stagger: 0.06, // Reduced from 0.08
          },
          0.2
        )

        // Animate containers - FASTER TIMING
        .to(
          leftTestimonials.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6, // Reduced from 0.8
            ease: "power2.out",
          },
          0.2 // Reduced overlap from -0.5
        )

        .to(
          rightTestimonials.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6, // Reduced from 0.8
            ease: "power2.out",
          },
          0.2 // Reduced overlap from -0.4
        )

        // Add counter animation to the timeline - FASTER TIMING
        .to(
          {},
          {
            duration: 2.0, // Reduced from 2.5
            ease: "power2.out",
            onUpdate: function (this: gsap.core.Tween) {
              // Calculate current progress (0 to 1)
              const progress = this.progress();
              // Convert to counter value (0 to 99)
              const currentValue = Math.round(progress * 99);
              setCounterValue(currentValue);
            },
            onComplete: () => {
              // Final bounce effect when counter reaches 99
              if (counterRef.current) {
                gsap.to(counterRef.current, {
                  scale: 1.2,
                  duration: 0.15, // Reduced from 0.2
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.inOut",
                });
              }
            },
          },
          0.25 // Start counter animation earlier (from -1.5)
        )

        // Show first slide - FASTER TIMING
        .call(
          () => {
            if (imageRefs.current[0]) {
              gsap.to(imageRefs.current[0], {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5, // Reduced from 0.6
                ease: "back.out(1.7)",
              });
            }
            if (testimonialRefs.current[0]) {
              gsap.to(testimonialRefs.current[0], {
                opacity: 1,
                x: 0,
                duration: 0.5, // Reduced from 0.6
                ease: "power2.out",
              });
            }
            setAnimationsComplete(true);
          },
          undefined,
          0.5 // Reduced overlap from -0.2
        );
    },
    { scope: containerRef }
  );

  // Function to animate slide transitions - OPTIMIZED
  const animateSlide = (newIndex: number, oldIndex: number): void => {
    if (!animationsComplete) return;

    const tl = gsap.timeline();

    // Animate out current slide - FASTER
    if (imageRefs.current[oldIndex]) {
      tl.to(
        imageRefs.current[oldIndex],
        {
          opacity: 0,
          scale: 0.8,
          y: -50,
          duration: 0.3, // Reduced from 0.4
          ease: "power2.in",
        },
        0
      );
    }

    if (testimonialRefs.current[oldIndex]) {
      tl.to(
        testimonialRefs.current[oldIndex],
        {
          opacity: 0,
          x: -100,
          duration: 0.3, // Reduced from 0.4
          ease: "back.in",
        },
        0
      );
    }

    // Animate in new slide - FASTER
    if (imageRefs.current[newIndex]) {
      tl.fromTo(
        imageRefs.current[newIndex],
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1.1,
          y: 0,
          duration: 0.5, // Reduced from 0.6
          ease: "back.out(1.7)",
          onComplete: () => {
            // Floating animation
            if (imageRefs.current[newIndex]) {
              gsap.to(imageRefs.current[newIndex], {
                y: -10,
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: "sine.inOut",
              });
            }
          },
        },
        0.2 // Reduced from 0.3
      );
    }

    if (testimonialRefs.current[newIndex]) {
      tl.fromTo(
        testimonialRefs.current[newIndex],
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5, // Reduced from 0.6
          ease: "power2.out",
        },
        0.25 // Reduced from 0.4
      );
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!animationsComplete) return;

    const interval = setInterval(() => {
      setActiveSlide((prev: number) => {
        const newIndex = (prev + 1) % testimonials.length;
        animateSlide(newIndex, prev);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, animationsComplete]);

  const goToSlide = (index: number): void => {
    if (!animationsComplete || index === activeSlide) return;

    const oldIndex = activeSlide;
    setActiveSlide(index);
    animateSlide(index, oldIndex);
  };

  return (
    <div
      ref={containerRef}
      className="h-auto w-full bg-blue-300 relative overflow-hidden flex flex-col items-center px-7 gap-5 sm:px-10 2xl:px-28"
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-orange-500 rounded-full"></div>
      <div className="absolute bottom-40 left-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-70"></div>
      <div className="absolute top-1/2 right-10 w-8 h-8 bg-pink-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-20"></div>
      <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-30"></div>

      {/* Main Feedback Section */}
      <div className="w-full mx-auto h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between py-20 xl:px-10">
        <div className="block lg:hidden justify-center items-center">
          {/* Left Content */}
          <div
            ref={leftTestimonials}
            className="flex flex-col items-center justify-between w-full mb-10"
          >
            <div className="text-center">
              <div className="inline-block">
                <span className="bg-[#0089CF] text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider">
                  Testimonials
                </span>
              </div>

              <h2 className="text-3xl xl:text-5xl font-bold text-white leading-tight mb-5 font-monserrat_bold mt-5 xl:mt-0">
                Trusted By Creative
                <br />
                Peoples
              </h2>

              <p className="mb-8 text-gray-600 text-sm font-sans font-light leading-relaxed">
                Turn your ideas into premium products for that
                <br />
                experience immpression. Join 5 million
              </p>
            </div>

            <div className="flex items-center gap-4 xl:gap-8">
              <h3
                ref={counterRef}
                className="text-7xl font-bold text-white tabular-nums"
              >
                {counterValue}%
              </h3>
              <div className="w-12 xl:flex-1 h-px bg-gray-400"></div>
              <span className="text-gray-600 text-sm xl:text-base font-light leading-relaxed">
                We always try to
                <br />
                give satisfaction
              </span>
            </div>
          </div>

          <div
            ref={rightTestimonials}
            className="relative max-w-3xl w-full mx-auto flex flex-col justify-center items-center gap-5"
          >
            {/* Slider Container */}
            <div
              ref={sliderRef}
              id="slider_image"
              className="relative h-80 bg-blue-100 overflow-hidden w-full flex"
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {testimonials.map((testimonial: Testimonial, index: number) => (
                  <div
                    key={testimonial.id}
                    className="min-w-full flex overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="w-2/5 bg-blue-100 flex items-center justify-center">
                      <div
                        ref={(el) => {
                          imageRefs.current[index] = el;
                        }}
                      >
                        <Image
                          src={testimonial.image}
                          className="w-full h-full object-contain scale-100 transition-transform duration-700"
                          height={200}
                          width={200}
                          alt={`Professional ${testimonial.name}`}
                        />
                      </div>
                    </div>

                    {/* Testimonial Section */}
                    <div
                      ref={(el) => {
                        testimonialRefs.current[index] = el;
                      }}
                      className="bg-white w-3/5 h-full flex justify-center p-8 flex-col relative"
                    >
                      <Star className="w-8 h-8 text-yellow-400 mb-4" />
                      <p className="my-8 tracking-wider text-gray-500 leading-relaxed">
                        {testimonial.text}
                      </p>

                      <h4 className="text-2xl font-bold">{testimonial.name}</h4>
                      <span className="tracking-wider text-gray-500 mt-1">
                        {testimonial.position}
                      </span>

                      <div className="absolute -bottom-3 -right-4 w-24 h-24">
                        <img
                          src="https://res.cloudinary.com/dmz8tsndt/image/upload/v1757024729/testimonial-4-shape_r6j9wh.png"
                          alt="feedback decoration"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center items-center gap-5">
              {testimonials.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={!animationsComplete}
                  className={`w-3 h-3 xl:w-4 xl:h-4 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    activeSlide === index
                      ? "bg-red-500 text-white scale-110"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  } ${
                    !animationsComplete
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-between">
          {/* Left Content */}
          <div
            ref={leftTestimonials}
            className="flex flex-col justify-between w-full xl:w-1/2 max-w-lg"
          >
            <div className="">
              <div className="inline-block">
                <span className="bg-[#0089CF] text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider">
                  CLIENTS FEEDBACK
                </span>
              </div>

              <h2 className="text-3xl xl:text-5xl font-bold text-white leading-tight mb-5 font-monserrat_bold mt-5">
                Trusted By Creative
                <br />
                People
              </h2>

              <p className="mb-8 text-gray-600 text-sm font-sans font-normal leading-relaxed tracking-wide">
                Turn your ideas into premium products for that
                <br />
                experience immpression. Join 5 million
              </p>
            </div>

            <div className="flex items-center gap-4 xl:gap-8">
              <h3
                ref={counterRef}
                className="text-7xl font-bold text-white tabular-nums"
              >
                {counterValue}%
              </h3>
              <div className="w-12 xl:flex-1 h-px bg-gray-400"></div>
              <span className="text-gray-600 text-sm xl:text-base font-normal tracking-wide font-sans leading-relaxed">
                We always try to
                <br />
                give satisfaction
              </span>
            </div>
          </div>

          {/* Right Content - Woman Image and Testimonial */}
          <div
            ref={rightTestimonials}
            className="relative w-full xl:w-1/2 flex justify-end items-end gap-5 xl:gap-10"
          >
            {/* Navigation Dots */}
            <div className="flex flex-col justify-center items-center gap-5">
              {testimonials.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={!animationsComplete}
                  className={`w-3 h-3 xl:w-4 xl:h-4 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    activeSlide === index
                      ? "bg-red-500 text-white scale-110"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  } ${
                    !animationsComplete
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                ></button>
              ))}
            </div>

            {/* Slider Container */}
            <div
              ref={sliderRef}
              id="slider_image"
              className="relative h-80 bg-blue-100 overflow-hidden w-full flex rounded-xl"
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {testimonials.map((testimonial: Testimonial, index: number) => (
                  <div
                    key={testimonial.id}
                    className="min-w-full flex overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="w-2/5 bg-blue-100 flex items-center justify-center">
                      <div
                        ref={(el) => {
                          imageRefs.current[index] = el;
                        }}
                        className="h-72"
                      >
                        <Image
                          src={testimonial.image}
                          className="w-full h-full object-cover transition-transform duration-700"
                          height={300}
                          width={300}
                          alt={`Professional ${testimonial.name}`}
                        />
                      </div>
                    </div>

                    {/* Testimonial Section */}
                    <div
                      ref={(el) => {
                        testimonialRefs.current[index] = el;
                      }}
                      className="bg-white w-3/5 h-full flex justify-center p-8 flex-col relative"
                    >
                      <Star className="w-6 h-6 text-yellow-400 mb-4" />
                      <p className="my-8 tracking-wider text-gray-500 leading-relaxed">
                        {testimonial.text}
                      </p>

                      <h4 className="text-xl font-bold">{testimonial.name}</h4>
                      <span className="tracking-wider text-gray-500 mt-1">
                        {testimonial.position}
                      </span>

                      <div className="absolute -bottom-3 -right-4 w-24 h-24">
                        <img
                          src="https://res.cloudinary.com/dmz8tsndt/image/upload/v1757024729/testimonial-4-shape_r6j9wh.png"
                          alt="feedback decoration"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerLogosSection />
    </div>
  );
};

export default FeedbackSection;
