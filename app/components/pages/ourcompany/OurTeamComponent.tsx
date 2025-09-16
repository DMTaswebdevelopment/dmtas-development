"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const OurTeamComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const teamMembers: TeamMember[] = [
    {
      name: "Whitney Francis",
      role: "Copywriter",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Leonard Krasner",
      role: "Senior Designer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Floyd Miles",
      role: "Principal Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Floyd Miles",
      role: "Principal Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Floyd Miles",
      role: "Principal Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Floyd Miles",
      role: "Principal Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Floyd Miles",
      role: "Principal Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
  ];

  // Create multiple copies for seamless loop
  const duplicatedMembers: TeamMember[] = [
    ...teamMembers,
    ...teamMembers,
    ...teamMembers,
    ...teamMembers,
  ];

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;

    if (!container || !scrollContainer) return;

    // Calculate the width of one set of team members
    const memberWidth: number = 320; // Approximate width including gap
    const totalWidth: number = teamMembers.length * memberWidth;

    // Set up the infinite scroll animation
    const tl = gsap.timeline({ repeat: -1 });

    // Animate from 0 to negative totalWidth to create seamless loop
    tl.to(scrollContainer, {
      x: -totalWidth,
      duration: 20, // Adjust speed here
      ease: "none",
    });

    // Reset position when animation completes one cycle
    tl.set(scrollContainer, { x: 0 });

    return () => {
      tl.kill();
    };
  }, [teamMembers.length]);

  return (
    <div className="h-auto bg-gray-200/10 py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-16">
          <div className="text-center flex flex-col items-center relative mb-10">
            <h2 className="text-4xl md:text-5xl text-gray-800 mb-4 font-monserrat_bold font-bold">
              Meet Our Team
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-monserrat_bold font-bold text-black mb-6"></h2>
          <p className="text-base font-sans text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a dynamic group of individuals who are passionate about
            what we do and dedicated to delivering the best results for our
            clients.
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div ref={containerRef} className="overflow-hidden w-full relative">
          <div ref={scrollRef} className="flex gap-8 w-max">
            {duplicatedMembers.map((member: TeamMember, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[300px] flex-shrink-0"
              >
                {/* Profile Image */}
                <div className="w-48 h-48 mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-semibold text-black mb-2 tracking-wide">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4 text-base">{member.role}</p>

                {/* Optional: Add hover effects */}
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Add pause on hover */}
        <style jsx>{`
          .overflow-hidden:hover .flex {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </div>
  );
};

export default OurTeamComponent;
