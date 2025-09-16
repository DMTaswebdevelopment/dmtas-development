"use client";

import Link from "next/link";
import React, { useRef } from "react";
import Arrow from "@/public/icon/Arrow2.svg";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const OurCompanyComponent: React.FC = () => {
  const ourCompanyRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLHeadingElement>(null);
  const whoWeAreRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create main timeline
      const tl = gsap.timeline();

      tl.fromTo(
        aboutUsRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1, // Increased duration for a smoother fade
          ease: "power2.inOut", // A more common ease for a smooth fade-in
        }
      )
        .fromTo(
          whoWeAreRef.current,
          {
            x: 50,
            opacity: 0,
          },
          { x: 0, opacity: 1, ease: "back", duration: 0.5 }
        )
        .fromTo(
          descRef.current,
          {
            y: 50,
            opacity: 0,
          },
          { y: 0, opacity: 1, ease: "back", duration: 0.5 }
        )
        .fromTo(
          imageRef.current,
          {
            x: 300,
            opacity: 0,
          },
          { x: 0, opacity: 1, ease: "back", duration: 1.5 },
          0.5
        );
    },
    { scope: ourCompanyRef }
  );

  return (
    <div ref={ourCompanyRef} className="relative min-h-screen">
      <div className="h-96 bg-blue-500/10 rounded-b-[3rem] lg:rounded-b-[10rem] flex flex-col justify-center items-center">
        <h1
          ref={aboutUsRef}
          className="text-4xl md:text-7xl font-monserrat_bold font-bold"
        >
          About Us
        </h1>
        <Link href="/" className=" mt-5 font-sans text-base font-semibold">
          Home / About Us
        </Link>
      </div>

      <div className="mt-16 px-7 sm:px-10 2xl:px-28 h-auto">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-16">
          <div className="flex flex-col flex-wrap w-full">
            <div className="mb-5">
              <span className="text-sm text-gray-600 uppercase font-sans tracking-wide">
                Our Story
              </span>
            </div>
            <div className="text-start relative mb-10">
              <div className="flex gap-10 relative">
                <h2
                  ref={whoWeAreRef}
                  className="text-4xl md:text-5xl text-gray-800 mb-4 font-monserrat_bold font-bold"
                >
                  Who We Are?
                </h2>
                <Image
                  src={Arrow}
                  height={50}
                  width={50}
                  className="object-contain mt-5"
                  alt="arrow"
                />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <div
              ref={descRef}
              className="flex flex-col space-y-3 font-sans text-base text-gray-500 w-full"
            >
              <p>
                Document Management Tasmania (DMTas), previously known as
                &quot;The Fuji Xerox Business Centre, &quot;has been in business
                for over 40 years. We&apos;re recognised as Tasmania&apos;s
                trusted company for multi-function printers, prints,
                digitisation, and signage. DMTas built its legacy by supplying
                and servicing Fujifilm&apos;s printers, establishing us as the
                largest provider of multi-function printers in Tasmania—a feat
                we are proud of, and we stand by our products and quality
                service.
              </p>
              <p>
                Our commitment to growth and ability to provide a comprehensive
                service has led to a couple of strategic acquisitions to further
                strengthen our capabilities. The 2017 acquisition of Acrodata
                brought unique and specialised expertise in document
                digitisation and workflow automation. The technology enables
                businesses to access their critical data anywhere and anytime,
                with the assurance of secure archiving in our state-of-the-art
                archive. In 2020, we proudly welcomed Hobart Signwriters, a
                business with a 75-year legacy and counting. With Hobart
                Signwriters, we can enhance the visual branding for our clients.
                The Print Division on Brisbane Street, Hobart and York Street,
                Launceston, serves as DMTas&apos; retail shopfront, providing
                everything from simple prints, posters, books, and brochures to
                wide-format prints.
              </p>
              <p>
                We understand the critical challenges Tasmanian businesses face
                daily—from streamlining workflows and protecting sensitive data
                to amplifying your brand visibility. Leveraging our decades of
                expertise, cutting-edge technology, and our 360° service, DMTas
                provides a complete ecosystem of solutions that directly enhance
                your business&apos;s visibility, profitability, and control.
              </p>
              <p>
                This is our story. Partner with Document Management Tasmania
                (DMTas) and discover how our legacy of trust, commitment to our
                partners, and innovation will empower your business for years to
                come.
              </p>
            </div>
          </div>
          <div
            ref={imageRef}
            className="w-full relative overflow-hidden rounded-xl aspect-[4/3] mt-16 lg:h-auto"
          >
            <Image
              src="https://res.cloudinary.com/dmz8tsndt/image/upload/v1757542066/business-colleagues-looking-cardboard-sheet_imazpp.jpg"
              className="object-cover h-full w-full"
              alt="contact_us_image"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCompanyComponent;
