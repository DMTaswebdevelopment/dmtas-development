"use client";

import { Division } from "@/app/model/interface/DivisionType";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
const OurWorksComponent = () => {
  const ourWorksRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const divisionRef = useRef<HTMLDivElement>(null);

  const divisions: Division[] = [
    {
      id: 1,
      name: "The Print Division",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756948279/TPD_Colour_vy9wqa.svg",
      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511759/Rectangle107_iu3dcq.png",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511734/digital_ystcl7.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511758/Rectangle106_k5oe5a.png",
      ],
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Acrodata",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756945661/Acrodata_Colour_wd3yn5.svg",
      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756773389/Component_4_gynwiq.png",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1760053797/vibrant-fabric-prints-emerging-from-large-format-printers-design-studio-colorful-textiles-textile-printing-digital-printing_r9iw1o.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757020700/Government_Gazette_xanlov.jpg",
      ],
      color: "#8B5CF6",
    },
    {
      id: 3,
      name: "Hobart Signwriters",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756948316/HS_Colour_yehdpe.svg",
      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757020700/Government_Gazette_xanlov.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367854/Pull_Up_nij5i2.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367830/Our_Products_2_sauwww.jpg",
      ],
      color: "#EF4444",
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ourWorksRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    ).fromTo(
      descRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.3"
    );

    if (divisionRef.current) {
      tl.fromTo(
        Array.from(divisionRef.current.children),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 1, ease: "power2.out" },
        "-=0.3"
      );
    }
  }, []);

  return (
    <div className="bg-gray-50 relative">
      {/* Hero Section */}
      <div className="relative w-full h-full">
        <div className="main_div flex justify-between h-64 sm:h-80 md:h-96 lg:h-[28rem] bg-[#F17E06] items-center relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute right-0 top-0 h-full w-full md:w-[70%] lg:w-[60%] xl:w-[50%]">
            <Image
              src="https://res.cloudinary.com/dmz8tsndt/image/upload/v1739945124/Group_1000001818_qo2bdi.png"
              alt="multifunction_main_image"
              className="w-full h-full object-cover object-right scale-110"
              height={1000}
              width={2000}
              priority
            />
          </div>

          {/* Hero Text */}
          <div className="text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 relative z-10 max-w-2xl">
            <h1
              ref={ourWorksRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 md:mb-4 drop-shadow-lg"
            >
              Our Works
            </h1>
            <p
              ref={descRef}
              className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 drop-shadow-md max-w-xl"
            >
              Tasmania&lsquo;s largest provider of digital multifunction
              solutions
            </p>
          </div>
        </div>
      </div>

      {/* Works Gallery Section */}
      <div className="bg-gray-50">
        <div
          ref={divisionRef}
          className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-28 py-8 sm:py-12 md:py-16 lg:py-20"
        >
          {divisions.map((division, index) => (
            <div key={index} className="mb-12 md:mb-16 lg:mb-20">
              {/* Division Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat_bold font-semibold mb-6 md:mb-8 text-gray-800">
                {division.name}
              </h3>

              {/* Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {division.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-200">
                      <Image
                        src={image}
                        alt={`${division.name} image ${imageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        loading="lazy"
                      />

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurWorksComponent;
