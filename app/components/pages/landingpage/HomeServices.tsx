import React, { useRef } from "react";
import { Play } from "lucide-react";
import { cardLists } from "@/app/constants";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import DMTasLogoWhite from "@/public/dmtas_assets/DMTas_Logomark_Colour.svg";

// Type definition for card list items
interface CardListItem {
  id: number;
  img_url: string;
  alt: string;
  description: string;
  bg: string;
  button_text: string;
}

const HomeServices: React.FC = () => {
  const homeServiceRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!homeServiceRef.current) return;

    // Create split text animation
    const split = new SplitText(".headerText", { type: "chars" });

    // Set initial state for split characters
    gsap.set(split.chars, {
      opacity: 0,
      x: 100,
    });

    ScrollTrigger.create({
      trigger: homeServiceRef.current,
      start: "top 85%",
      animation: gsap.timeline().to(
        split.chars,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.08, // Animate each character with a slight delay
          markers: true,
        },
        "-=0.6"
      ), // Start the text animation 0.6 seconds before container animation ends
      // toggleActions: "restart none none reverse",
    });

    // Optional: Add cards animation
    if (cardsRef.current) {
      const cards: NodeListOf<Element> =
        cardsRef.current.querySelectorAll(".card-item");

      gsap.set(cards, {
        y: 50,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 90%",
        animation: gsap.to(cards, {
          y: 0,
          opacity: 1,
          ease: "back",
          stagger: 0.5,
          markers: true,
        }),
        toggleActions: "restart none none reverse",
      });
    }

    // Cleanup function
    return () => {
      split.revert();
    };
  });

  return (
    <div
      ref={homeServiceRef}
      className="h-auto text-black w-full relative py-16 bg-[#F5F6FD]"
    >
      <div className="px-7 sm:px-10  xl:px-32 w-full mx-auto">
        <div className="w-full">
          <div className="flex flex-col justify-center items-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center  justify-center  px-4 py-2 gap-5">
                <div className="w-8 h-8">
                  <Image
                    src={DMTasLogoWhite}
                    height={200}
                    width={200}
                    alt="DMTas Logo"
                    className="object-contain w-full h-full"
                  />
                </div>
                <h2 className=" text-gray-800 text-xl font-monserrat_bold md:text-4xl lg:text-5xl font-semibold uppercase tracking-wider">
                  Home of
                </h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {/* Services Cards */}
            <div
              ref={cardsRef}
              className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {(cardLists as CardListItem[]).map(
                (cardlist: CardListItem, index: number) => (
                  <div
                    key={index}
                    className={`card-item h-[30rem] relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 
                    hover:border-transparent
                    before:absolute before:inset-0 before:rounded-2xl before:p-[2px] 
                    before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-pink-400
                    before:opacity-0 before:transition-opacity before:duration-300
                    hover:before:opacity-100
                    before:animate-pulse
                    after:absolute after:inset-[2px] after:rounded-2xl after:bg-white
                    hover:after:bg-white`}
                    style={{
                      background: "white",
                    }}
                  >
                    {/* Icon */}
                    <div className="mb-6 flex justify-between relative z-10">
                      <div className="flex justify-start items-center h-64 w-72 relative">
                        <Image
                          src={cardlist.img_url}
                          alt={cardlist.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                      {/* Large background number */}
                      <div className="absolute right-6 text-8xl font-bold text-gray-100 opacity-50 select-none">
                        0{cardlist.id}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6 relative z-10">
                      <p className="text-gray-600 font-sans leading-relaxed text-sm lg:text-base">
                        {cardlist.description}
                      </p>
                    </div>

                    {/* Read More Button */}
                    <button
                      type="button"
                      className={`flex items-center text-base font-bold font-sans gap-2 ${cardlist.bg} py-3 px-5 w-1/2 whitespace-nowrap justify-between rounded-xl text-black font-semibold group/btn relative z-10`}
                    >
                      <span>{cardlist.button_text}</span>
                      <div className="2xl:w-8 2xl:h-8 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center ">
                        <Play className="2xl:w-4 2xl:h-4 h-2 w-2 fill-current group-hover/btn:text-white" />
                      </div>
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;
