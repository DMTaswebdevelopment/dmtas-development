import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Type definitions
interface Division {
  id: number;
  name: string;
  icon: string;
  description: string;
  services: string[];
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const currentPositionRef = useRef<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(true);
  const isManualNavigationRef = useRef<boolean>(false);

  // Fixed: Separate ref for GSAP ticker callback
  const tickerCallbackRef = useRef<(() => void) | null>(null);

  // Refs for animated elements
  const iconRef = useRef<HTMLImageElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const divisions: Division[] = [
    {
      id: 0,
      name: "Print Division",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756789489/TPD_Colour_vuaww0.svg",
      description: "Professional printing services for all your business needs",
      services: [
        "Business Cards",
        "Brochures",
        "Banners",
        "Flyers",
        "Catalogs",
      ],
      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367854/Pull_Up_nij5i2.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367830/Our_Products_2_sauwww.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367831/Our_Products_3_n2zfzd.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367829/Our_Products_4_tlxzxm.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757367829/Our_Products_1_xaplyu.jpg",
      ],
      color: "from-blue-500 to-blue-700",
      bgImage: "bg-[#EEFF00]",
    },
    {
      id: 1,
      name: "Acrodata",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756945661/Acrodata_Colour_wd3yn5.svg",
      description:
        "Eye-catching signage solutions to boost your brand visibility",
      services: [
        "LED Signs",
        "Neon Signs",
        "Digital Displays",
        "Outdoor Signage",
        "Way-finding",
      ],
      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757369694/modern-printing-press-produces-multi-colored-printouts-accurately-generated-by-ai_bzf40i.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757369585/man-working-printing-house-with-paper-paints_1_fixy46.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757369461/modern-manufacturing-equipment-futuristic-factory-generated-by-ai_xa7sqv.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1757369459/colorful-fabric-rolls-emerging-from-large-format-printer-showcasing-vibrant-floral-patterns_ptsctv.jpg",
      ],
      color: "from-green-500 to-green-700",
      bgImage: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      id: 2,
      name: "Hobart",
      icon: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756789666/HS_Colour_dso0qn.svg",
      description: "Transform your analog content into digital formats",
      images: [
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511759/Rectangle107_iu3dcq.png",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511759/Rectangle108_kq5wrn.png",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511758/Rectangle106_k5oe5a.png",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511734/digital_ystcl7.jpg",
        "https://res.cloudinary.com/dmz8tsndt/image/upload/v1739511712/bus_wjkytj.jpg",
      ],
      services: [
        "Document Scanning",
        "Photo Digitization",
        "Archive Solutions",
        "Data Conversion",
        "Cloud Storage",
      ],
      color: "from-purple-500 to-purple-700",
      bgImage: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
  ];

  // Create infinite scroll pattern
  const createInfiniteScrollPattern = (): ScrollPatternItem[] => {
    const pattern: ScrollPatternItem[] = [];
    const cycles = 5;

    for (let cycle = 0; cycle < cycles; cycle++) {
      divisions.forEach((division: Division, divIndex: number) => {
        division.images.forEach((image: string, imageIndex: number) => {
          pattern.push({
            type: "image",
            src: image,
            divisionIndex: divIndex,
            imageIndex: imageIndex,
            key: `image-${cycle}-${divIndex}-${imageIndex}`,
            cycle: cycle,
          });
        });
      });
    }

    return pattern;
  };

  const scrollPattern: ScrollPatternItem[] = createInfiniteScrollPattern();
  const itemWidth: number = 542 + 20; // Width + gap
  const totalImagesPerCycle: number = divisions.reduce(
    (sum: number, div: Division) => sum + div.images.length,
    0
  );
  const oneCycleDistance: number = totalImagesPerCycle * itemWidth;

  // Get active division based on current position
  const getActiveDivisionFromPosition = (currentX: number): number => {
    const positionInCycle: number = Math.abs(currentX) % oneCycleDistance;
    const imageIndexInCycle: number = Math.floor(positionInCycle / itemWidth);

    let imageCount = 0;
    for (let i = 0; i < divisions.length; i++) {
      const divisionImageCount: number = divisions[i].images.length;
      if (
        imageIndexInCycle >= imageCount &&
        imageIndexInCycle < imageCount + divisionImageCount
      ) {
        return i;
      }
      imageCount += divisionImageCount;
    }

    return 0;
  };

  // Animation function for content transition
  const animateContentTransition = (newSlideIndex: number): void => {
    const icon = iconRef.current;
    if (!icon) return;

    gsap.to(icon, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        gsap.to(icon, {
          opacity: 1,
          y: 0,
          ease: "back.out",
          duration: 0.5,
        });
      },
    });
  };

  // Auto-scroll animation using GSAP ticker
  const startAutoScroll = (): void => {
    if (!isScrolling || isManualNavigationRef.current) return;

    const animate = (): void => {
      const scroller = scrollerRef.current;
      if (!scroller || !isScrolling || isManualNavigationRef.current) return;

      const currentX: number = currentPositionRef.current;
      const newX: number = currentX - 1; // Adjust speed by changing this value

      // Reset position when we've scrolled through one cycle
      if (Math.abs(newX) >= oneCycleDistance) {
        currentPositionRef.current = 0;
        gsap.set(scroller, { x: 0 });
      } else {
        currentPositionRef.current = newX;
        gsap.set(scroller, { x: newX });
      }

      // Update active slide based on position - but only during auto scroll
      if (isScrolling && !isManualNavigationRef.current) {
        const newActiveSlide: number = getActiveDivisionFromPosition(
          currentPositionRef.current
        );
        if (newActiveSlide !== currentSlide) {
          setCurrentSlide(newActiveSlide);
        }
      }
    };

    // Fixed: Store the callback function reference properly
    tickerCallbackRef.current = animate;
    gsap.ticker.add(animate);
  };

  // useGSAP hook to handle auto-scrolling
  useGSAP(() => {
    if (isScrolling && !isManualNavigationRef.current) {
      startAutoScroll();
    } else if (tickerCallbackRef.current) {
      gsap.ticker.remove(tickerCallbackRef.current);
    }

    return () => {
      if (tickerCallbackRef.current) {
        gsap.ticker.remove(tickerCallbackRef.current);
      }
    };
  }, [isScrolling]);

  // useGSAP hook to handle content transitions
  useGSAP(() => {
    animateContentTransition(currentSlide);
  }, [currentSlide]);

  // Manual navigation functions
  const navigateToSlide = (targetSlide: number): void => {
    // Stop auto-scrolling temporarily
    isManualNavigationRef.current = true;
    setIsScrolling(false);

    // Calculate target position
    let targetImageIndex = 0;
    for (let i = 0; i < targetSlide; i++) {
      targetImageIndex += divisions[i].images.length;
    }

    // Find the best target position (always move forward)
    const currentPos: number = Math.abs(currentPositionRef.current);
    const currentCycle: number = Math.floor(currentPos / oneCycleDistance);

    const targetInCurrentCycle: number =
      currentCycle * oneCycleDistance + targetImageIndex * itemWidth;
    const targetInNextCycle: number =
      (currentCycle + 1) * oneCycleDistance + targetImageIndex * itemWidth;

    let targetPosition: number;
    if (targetInCurrentCycle > currentPos) {
      targetPosition = -targetInCurrentCycle;
    } else {
      targetPosition = -targetInNextCycle;
    }

    // Animate to target position using GSAP
    const scroller = scrollerRef.current;
    if (scroller) {
      gsap.to(currentPositionRef, {
        current: targetPosition,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          gsap.set(scroller, { x: currentPositionRef.current });
        },
        onComplete: () => {
          // Animation complete
          setCurrentSlide(targetSlide);

          // Resume auto-scrolling after a delay
          gsap.delayedCall(1, () => {
            isManualNavigationRef.current = false;
            setIsScrolling(true);
          });
        },
      });
    }
  };

  const nextSlide = (): void => {
    const newSlide: number = (currentSlide + 1) % divisions.length;
    navigateToSlide(newSlide);
  };

  const prevSlide = (): void => {
    const newSlide: number =
      (currentSlide - 1 + divisions.length) % divisions.length;
    navigateToSlide(newSlide);
  };

  // Pause/resume on hover
  const handleMouseEnter = (): void => {
    setIsScrolling(false);
  };

  const handleMouseLeave = (): void => {
    if (!isManualNavigationRef.current) {
      setIsScrolling(true);
    }
  };

  return (
    <div className="min-h-screen relative px-7 sm:px-10 2xl:px-28 w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="text-start relative">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-monserrat_bold">
            Our Products
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
                className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                title={`Previous: ${
                  divisions[
                    (currentSlide - 1 + divisions.length) % divisions.length
                  ].name
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="text-center">
                <img
                  ref={iconRef}
                  src={divisions[currentSlide].icon}
                  alt={`${divisions[currentSlide].name} Icon`}
                  className="object-contain w-64 h-auto transition-opacity duration-200"
                />
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                title={`Next: ${
                  divisions[(currentSlide + 1) % divisions.length].name
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div
              className="scroller overflow-hidden w-full relative xl:py-5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={scrollerRef}
                className="scroller__inner flex gap-5 rounded-xl"
                style={{ transform: "translateX(0px)" }}
              >
                {scrollPattern.map((item: ScrollPatternItem, index: number) => (
                  <div
                    key={item.key}
                    className="flex-shrink-0 w-[542px] h-[500px]"
                  >
                    <img
                      src={item.src}
                      alt={`${
                        divisions[item.divisionIndex].name
                      } service image ${item.imageIndex + 1}`}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Division Navigation Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {divisions.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => navigateToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  title={`Go to ${divisions[index].name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
