import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Type definitions
interface Division {
  id: number;
  name: string;
  icon: string;
  images: string[];
  color: string;
  bgImage: string;
}

interface ScrollPatternItem {
  type: "image";
  src: string;
  divisionIndex: number;
  imageIndex: number;
  key: string;
  cycle: number;
}

const OurProducts: React.FC = () => {
  // Sample data for demonstration
  const divisions: Division[] = [
    {
      id: 1,
      name: "Web Development",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756948279/TPD_Colour_vy9wqa.svg",

      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511759/Rectangle107_iu3dcq.png",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511734/digital_ystcl7.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511758/Rectangle106_k5oe5a.png",
      ],
      color: "#3B82F6",
      bgImage: "",
    },
    {
      id: 2,
      name: "Mobile Apps",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756945661/Acrodata_Colour_wd3yn5.svg",

      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511712/bus_wjkytj.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756943676/modern-printing-press-creates-colorful-documents-indoors-generated-by-ai_188544-22624_pse6zn.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757020700/Government_Gazette_xanlov.jpg",
      ],
      color: "#8B5CF6",
      bgImage: "",
    },
    {
      id: 3,
      name: "UI/UX Design",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756948316/HS_Colour_yehdpe.svg",

      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757020700/Government_Gazette_xanlov.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367854/Pull_Up_nij5i2.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367830/Our_Products_2_sauwww.jpg",
      ],
      color: "#EF4444",
      bgImage: "",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPositionRef = useRef<number>(0);

  // Create scroll pattern - duplicate images for seamless loop
  const scrollPattern: ScrollPatternItem[] = React.useMemo(() => {
    const pattern: ScrollPatternItem[] = [];
    const cycles = 3; // Show 3 full cycles for smooth infinite scroll

    for (let cycle = 0; cycle < cycles; cycle++) {
      divisions.forEach((division, divisionIndex) => {
        division.images.forEach((image, imageIndex) => {
          pattern.push({
            type: "image",
            src: image,
            divisionIndex,
            imageIndex,
            key: `${divisionIndex}-${imageIndex}-${cycle}`,
            cycle,
          });
        });
      });
    }

    return pattern;
  }, [divisions]);

  const itemWidth = 542 + 20; // width + gap
  const totalWidth =
    itemWidth * divisions.reduce((sum, div) => sum + div.images.length, 0);

  // Calculate which division is most visible in the viewport
  const updateCurrentSlideBasedOnScroll = React.useCallback(
    (translateX: number) => {
      if (isManualNavigation) return; // Don't auto-update during manual navigation

      const containerWidth = contentContainerRef.current?.offsetWidth || 1200;
      const viewportCenter = Math.abs(translateX) + containerWidth / 2;

      // Calculate which image is in the center
      const imagesPerDivision = divisions.map((div) => div.images.length);
      const totalImagesInCycle = imagesPerDivision.reduce(
        (sum, count) => sum + count,
        0
      );

      // Get the current image index within one cycle
      const currentImageIndex =
        Math.floor(viewportCenter / itemWidth) % totalImagesInCycle;

      // Find which division this image belongs to
      let currentDivisionIndex = 0;
      let accumulatedImages = 0;

      for (let i = 0; i < divisions.length; i++) {
        if (
          currentImageIndex <
          accumulatedImages + divisions[i].images.length
        ) {
          currentDivisionIndex = i;
          break;
        }
        accumulatedImages += divisions[i].images.length;
      }

      // Update current slide if it changed
      setCurrentSlide((prevSlide) => {
        if (currentDivisionIndex !== prevSlide) {
          console.log(
            "Auto-updating slide from",
            prevSlide,
            "to",
            currentDivisionIndex
          );
          return currentDivisionIndex;
        }
        return prevSlide;
      });
    },
    [divisions, itemWidth, isManualNavigation]
  );

  // Continuous scroll animation with slide tracking
  useEffect(() => {
    let translateX = scrollPositionRef.current;
    const speed = 2; // pixels per frame

    const animate = () => {
      if (!isHovered && scrollerRef.current) {
        translateX -= speed;
        scrollPositionRef.current = translateX;

        // Reset position when we've scrolled one full cycle
        if (Math.abs(translateX) >= totalWidth) {
          translateX = 0;
          scrollPositionRef.current = 0;
        }

        scrollerRef.current.style.transform = `translateX(${translateX}px)`;

        // Update current slide based on scroll position
        updateCurrentSlideBasedOnScroll(translateX);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, totalWidth, updateCurrentSlideBasedOnScroll]);

  // Reset manual navigation flag after a delay
  useEffect(() => {
    if (isManualNavigation) {
      const timer = setTimeout(() => {
        setIsManualNavigation(false);
        console.log("Resuming auto-tracking of slides");
      }, 3000); // Resume auto-tracking after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isManualNavigation]);

  const nextSlide = () => {
    console.log("Manual navigation: next slide");
    setIsManualNavigation(true);
    setCurrentSlide((prev) => (prev + 1) % divisions.length);
  };

  const prevSlide = () => {
    console.log("Manual navigation: previous slide");
    setIsManualNavigation(true);
    setCurrentSlide((prev) => (prev - 1 + divisions.length) % divisions.length);
  };

  const navigateToSlide = (index: number) => {
    console.log("Manual navigation: navigate to slide", index);
    setIsManualNavigation(true);
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="min-h-screen relative px-7 sm:px-10 2xl:px-28 w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="text-start relative">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Interactive Slideshow Section */}
        <div className="mt-5">
          {/* Slide Content */}
          <div className="text-center" ref={contentContainerRef}>
            <div className="inline-flex mb-5 gap-10 justify-between items-center">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                title={`Previous: ${
                  divisions[
                    (currentSlide - 1 + divisions.length) % divisions.length
                  ].name
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative">
                <img
                  ref={iconRef}
                  src={divisions[currentSlide].icon}
                  alt={`${divisions[currentSlide].name} Icon`}
                  className="object-cover w-full h-full  transition-all duration-500 transform hover:scale-105"
                  // style={{
                  //   boxShadow: `0 0 30px ${divisions[currentSlide].color}40`,
                  // }}
                />
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                title={`Next: ${
                  divisions[(currentSlide + 1) % divisions.length].name
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Continuous Scrolling Images */}
            <div
              className="scroller overflow-hidden w-full relative xl:py-5 rounded-2xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                ref={scrollerRef}
                className="scroller__inner flex gap-5 rounded-xl will-change-transform"
                style={{
                  width: `${itemWidth * scrollPattern.length}px`,
                }}
              >
                {scrollPattern.map((item: ScrollPatternItem, index: number) => (
                  <div
                    key={item.key}
                    className="flex-shrink-0 w-[542px] h-[300px] relative group"
                  >
                    <img
                      src={item.src}
                      alt={`${
                        divisions[item.divisionIndex].name
                      } service image ${item.imageIndex + 1}`}
                      className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-semibold text-lg">
                          {divisions[item.divisionIndex].name}
                        </h4>
                        <p className="text-sm opacity-90">
                          Project #{item.imageIndex + 1}
                        </p>
                      </div>
                    </div>
                    {/* Visual indicator for current division's images */}
                    {item.divisionIndex === currentSlide && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Division Navigation Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {divisions.map((division: Division, index: number) => (
                <button
                  key={index}
                  onClick={() => navigateToSlide(index)}
                  className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-12 h-3 shadow-lg"
                      : "w-3 h-3 hover:w-4 hover:h-4"
                  }`}
                  style={{
                    backgroundColor:
                      index === currentSlide ? division.color : "#D1D5DB",
                  }}
                  title={`Go to ${division.name}`}
                >
                  {index === currentSlide && (
                    <div
                      className="absolute inset-0 bg-white/30 rounded-full animate-pulse"
                      style={{ animationDuration: "2s" }}
                    ></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
