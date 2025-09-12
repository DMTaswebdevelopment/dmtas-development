"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

// Type definitions - Fixed interface declaration
type ClientLogo = {
  id: number;
  name: string;
  logo: string;
};

const CustomerLogosSection: React.FC = () => {
  // Sample client logos data with proper typing
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

  // Refs with proper typing
  const logoScrollRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!logoScrollRef.current) return;

      // Wait for images to load and get accurate measurements
      const initAnimation = (): void => {
        const container = logoScrollRef.current;
        if (!container) return;

        // Reset any existing transform
        gsap.set(container, { x: 0 });

        // Get the first logo element to calculate dimensions
        const firstLogo = container.querySelector(".logo-item") as HTMLElement;
        if (!firstLogo) return;

        // Calculate dimensions with more precision
        const logoWidth: number = firstLogo.getBoundingClientRect().width;
        const computedStyle = window.getComputedStyle(container);
        const gap: number = parseInt(computedStyle.gap) || 32;

        // Calculate the width of one complete set
        const oneSetWidth: number = (logoWidth + gap) * clientLogos.length;

        // Ensure container has proper width
        container.style.width = `${oneSetWidth * 2}px`;

        // Kill any existing animation
        if (animationRef.current) {
          animationRef.current.kill();
        }

        // Create the infinite scroll animation
        animationRef.current = gsap.to(container, {
          x: -oneSetWidth,
          duration: 20, // Slower for smoother animation
          ease: "none",
          repeat: -1,
          repeatDelay: 0,
          // Force hardware acceleration
          force3D: true,
          // Ensure smooth looping
          modifiers: {
            x: gsap.utils.unitize((x: string) => parseFloat(x) % oneSetWidth),
          },
        });
      };

      // Initialize after a short delay to ensure DOM is ready
      const timer: NodeJS.Timeout = setTimeout(initAnimation, 100);

      // Also initialize on window resize
      const handleResize = (): void => {
        clearTimeout(timer);
        setTimeout(initAnimation, 100);
      };

      window.addEventListener("resize", handleResize);

      // Center detection and color animation
      const containerCenter: number = window.innerWidth / 2;

      const checkCenterLogo = (): void => {
        if (!logoScrollRef.current) return;

        const logos = logoScrollRef.current.querySelectorAll(".logo-item");

        logos.forEach((logo: Element) => {
          const logoElement = logo as HTMLElement;
          const logoRect: DOMRect = logoElement.getBoundingClientRect();
          const logoCenter: number = logoRect.left + logoRect.width / 2;
          const distanceFromCenter: number = Math.abs(
            logoCenter - containerCenter
          );
          const image = logo.querySelector("img") as HTMLImageElement;
          const circle = logo.querySelector(".logo-circle") as HTMLElement;

          if (distanceFromCenter < 100) {
            // Logo is in center
            gsap.to(image, {
              filter: "grayscale(0%) brightness(1.1)",
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(circle, {
              scale: 1.1,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              duration: 0.4,
              ease: "power2.out",
            });
          } else {
            // Apply grayscale and reset scale
            gsap.to(image, {
              filter: "grayscale(100%)",
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(circle, {
              scale: 1,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });
      };

      // Use requestAnimationFrame for smoother center detection
      let rafId: number;
      const animateCenter = (): void => {
        checkCenterLogo();
        rafId = requestAnimationFrame(animateCenter);
      };

      rafId = requestAnimationFrame(animateCenter);

      // Cleanup function
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
        if (animationRef.current) {
          animationRef.current.kill();
        }
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    },
    { scope: logoScrollRef, dependencies: [clientLogos] }
  );

  // Hover effects
  useGSAP(
    () => {
      const logos = logoScrollRef.current?.querySelectorAll(".logo-item");

      logos?.forEach((logo: Element) => {
        const logoElement = logo as HTMLElement;
        const circle = logo.querySelector(".logo-circle") as HTMLElement;
        const image = logo.querySelector("img") as HTMLImageElement;

        const handleMouseEnter = (): void => {
          gsap.to(circle, {
            scale: 1.15,
            duration: 0.3,
            ease: "back.out(1.7)",
          });

          gsap.to(image, {
            filter: "grayscale(0%) brightness(1.2)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = (): void => {
          // Check if not in center before resetting
          const logoRect: DOMRect = logoElement.getBoundingClientRect();
          const logoCenter: number = logoRect.left + logoRect.width / 2;
          const containerCenter: number = window.innerWidth / 2;
          const distanceFromCenter: number = Math.abs(
            logoCenter - containerCenter
          );

          if (distanceFromCenter >= 100) {
            gsap.to(circle, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(image, {
              filter: "grayscale(100%)",
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            // If in center, maintain the center state
            gsap.to(circle, {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        logoElement.addEventListener("mouseenter", handleMouseEnter);
        logoElement.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup event listeners
        return () => {
          logoElement.removeEventListener("mouseenter", handleMouseEnter);
          logoElement.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    },
    { scope: logoScrollRef, dependencies: [clientLogos] }
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
      <div className="overflow-hidden relative mx-auto max-w-7xl w-full py-8">
        <div
          ref={logoScrollRef}
          className="flex gap-8 items-center"
          style={{
            willChange: "transform",
          }}
        >
          {/* First set of logos */}
          {clientLogos.map((client: ClientLogo, index: number) => (
            <div
              key={`first-${client.id}`}
              ref={(el: HTMLDivElement | null) => {
                logoRefs.current[index] = el;
              }}
              className="logo-item cursor-pointer transition-all duration-300 flex-shrink-0 relative"
            >
              <div className="logo-circle w-24 h-24 rounded-full border-2 border-gray-200 overflow-hidden flex items-center justify-center bg-white shadow-lg transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={80}
                  height={40}
                  className="object-contain filter grayscale transition-all duration-500"
                  loading="eager"
                  priority={index < 3}
                />
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {clientLogos.map((client: ClientLogo, index: number) => (
            <div
              key={`second-${index}`}
              className="logo-item cursor-pointer transition-all duration-300 flex-shrink-0 relative"
            >
              <div className="logo-circle w-24 h-24 rounded-full border-2 border-gray-200 overflow-hidden flex items-center justify-center bg-white shadow-lg transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={80}
                  height={40}
                  className="object-contain filter grayscale transition-all duration-500"
                  loading="eager"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Optional fade edges for better visual effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default CustomerLogosSection;
