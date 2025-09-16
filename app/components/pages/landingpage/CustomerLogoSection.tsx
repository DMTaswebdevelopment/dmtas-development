"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

// Type definitions
type ClientLogo = {
  id: number;
  name: string;
  logo: string;
};

// Custom debounce function
const debounce = (func: () => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

const CustomerLogosSection: React.FC = () => {
  // Sample client logos data
  const clientLogos: ClientLogo[] = [
    {
      id: 1,
      name: "Hazell_Bros",
      logo: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757380700/Hazell_Bros_nagbfy.png",
    },
    {
      id: 2,
      name: "Fairbrother-Logo",
      logo: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757380503/Fairbrother-Logo_ch6mdt.png",
    },
    {
      id: 3,
      name: "Tasmanian_Government",
      logo: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757380502/Tasmanian_Government_quxy9z.png",
    },
    {
      id: 4,
      name: "Tas_Network",
      logo: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757380502/Tas_Network_nrejun.png",
    },
    {
      id: 5,
      name: "Nyrstar_logo",
      logo: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757380502/Nyrstar_logo.svg_g61ji5.png",
    },
    {
      id: 6,
      name: "The_Friends_School_Logo",
      logo: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757380501/The_Friends_School_Logo_ltlyv9.png",
    },
    {
      id: 7,
      name: "Hydro_Tasmania",
      logo: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757380501/Hydro_Tasmania_zjdtyj.png",
    },
  ];

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Create enough duplicates to ensure smooth infinite scroll
  const duplicatedLogos = [
    ...clientLogos,
    ...clientLogos,
    ...clientLogos, // Triple the logos for seamless looping
  ];

  useGSAP(
    () => {
      if (!scrollerRef.current || !containerRef.current) return;

      const scroller = scrollerRef.current;
      const container = containerRef.current;

      // Function to initialize the animation
      const initAnimation = () => {
        // Kill existing animation
        if (animationRef.current) {
          animationRef.current.kill();
        }

        // Reset position
        gsap.set(scroller, { x: 0 });

        // Wait for next frame to ensure DOM is ready
        gsap.delayedCall(0.1, () => {
          // Get the width of one set of logos (original set)
          const logoItems = scroller.querySelectorAll(".logo-item");
          const originalSetSize = clientLogos.length;

          if (logoItems.length === 0) return;

          // Calculate the width of one complete set
          let oneSetWidth = 0;
          for (let i = 0; i < originalSetSize; i++) {
            const item = logoItems[i] as HTMLElement;
            const rect = item.getBoundingClientRect();
            oneSetWidth += rect.width + 32; // 32px is gap (gap-8 = 2rem = 32px)
          }

          // Create the infinite scroll animation
          animationRef.current = gsap.to(scroller, {
            x: -oneSetWidth,
            duration: 25, // Slower for smoother animation
            ease: "none",
            repeat: -1,
            repeatDelay: 0,
            force3D: true,
            // Use modifiers for perfect looping
            modifiers: {
              x: (x: string) => {
                const numValue = parseFloat(x);
                return `${numValue % oneSetWidth}px`;
              },
            },
          });
        });
      };

      // Initialize animation after images load
      const images = scroller.querySelectorAll("img");
      let loadedImages = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        initAnimation();
        return;
      }

      const checkAllImagesLoaded = () => {
        loadedImages++;
        if (loadedImages >= totalImages) {
          initAnimation();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          checkAllImagesLoaded();
        } else {
          img.addEventListener("load", checkAllImagesLoaded);
          img.addEventListener("error", checkAllImagesLoaded);
        }
      });

      // Handle window resize with custom debounce
      const handleResize = debounce(() => {
        initAnimation();
      }, 250);

      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }
        window.removeEventListener("resize", handleResize);
        images.forEach((img) => {
          img.removeEventListener("load", checkAllImagesLoaded);
          img.removeEventListener("error", checkAllImagesLoaded);
        });
      };
    },
    { scope: containerRef }
  );

  // Hover effects - Show full color only on hover
  useGSAP(
    () => {
      const logoItems = containerRef.current?.querySelectorAll(".logo-item");

      logoItems?.forEach((item) => {
        const logoElement = item as HTMLElement;
        const image = logoElement.querySelector("img") as HTMLImageElement;

        if (!image) return;

        // Set initial grayscale state
        gsap.set(image, {
          filter: "grayscale(100%)",
          scale: 1,
        });

        const handleMouseEnter = () => {
          gsap.to(image, {
            scale: 1.3,
            filter: "grayscale(0%) brightness(1.2)",
            duration: 0.3,
            rotate: 10,
            ease: "back.out(1.7)",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(image, {
            scale: 1,
            rotate: 0,
            filter: "grayscale(100%) brightness(1)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        logoElement.addEventListener("mouseenter", handleMouseEnter);
        logoElement.addEventListener("mouseleave", handleMouseLeave);
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="w-full mx-auto pb-20 px-10 xl:px-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-full">
            Trusted by Industry Leaders
          </span>
        </div>
        <h3 className="text-2xl xl:text-3xl font-bold text-white mb-4">
          Join 500+ Companies Who Trust Us
        </h3>
        <p className="text-gray-200 text-sm max-w-2xl mx-auto">
          From startups to Fortune 500 companies, we&apos;ve helped businesses
          of all sizes achieve their creative vision and business goals.
        </p>
      </div>

      {/* Logo Scroll Container */}
      <div
        ref={containerRef}
        className="overflow-hidden relative mx-auto max-w-7xl w-full py-8"
      >
        <div
          ref={scrollerRef}
          className="flex gap-8 items-center"
          style={{
            willChange: "transform",
          }}
        >
          {duplicatedLogos.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="logo-item flex-shrink-0 relative"
            >
              <div className="w-24 h-16 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={96}
                  height={64}
                  className="object-contain max-w-full max-h-full transition-all duration-300"
                  loading="eager"
                  priority={index < clientLogos.length}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default CustomerLogosSection;
