"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { teamMembers } from "@/app/constants";

const OurTeamComponent: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="ourteam"
      className="h-auto bg-gray-200/10 py-16 px-7 sm:px-10 2xl:px-28  overflow-hidden"
    >
      <div className="w-full mx-auto text-center">
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

        <div ref={scrollRef} className="flex flex-col space-y-8 w-full">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full ">
              {/* Title should appear once per group */}
              <h3 className="text-2xl text-start font-bold text-black mb-10">
                {member.title}
              </h3>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                {member.teams.map((team, idx) => (
                  <div
                    key={idx}
                    className="flex min-w-[250px] items-center justify-center"
                  >
                    <div className="  flex flex-col items-center flex-shrink-0 ">
                      {/* Profile Image */}
                      <div className="w-40 h-40 mb-6">
                        <Image
                          src={team.image}
                          alt={team.name}
                          height={160}
                          width={160}
                          className="w-full h-full rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                        />
                      </div>

                      {/* Member Info */}
                      <h3 className="text-xl font-semibold text-black mb-2 tracking-wide">
                        {team.name}
                      </h3>
                      <p className="text-gray-600 mb-4 text-base">
                        {team.role}
                      </p>

                      {/* Optional hover underline */}
                      <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
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
  );
};

export default OurTeamComponent;
