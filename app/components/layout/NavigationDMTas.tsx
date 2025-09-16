"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Rectangle157 from "@/public/Rectangle157.png";

//zustand
import { event } from "@/app/lib/fpixel";

//hook

//DMTas Logo
// import DMTasLogo from "@/public/dmtas_assets/DMTas_Horizontal_Colour.svg";
// import DMTasLogoWhite from "@/public/dmtas_assets/DMTas_Horizontal_Mono_Reverse.svg";
import DMTasLogoShield from "@/public/dmtas_assets/DMTas_Logomark_Colour.svg";
import DMTasLogoWhiteShield from "@/public/dmtas_assets/DMTas_Logomark_Mono_Reverse.svg";

import {
  ArrowRightCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import { PuzzleIcon } from "lucide-react";
import { productsMenu } from "@/app/constants";
import gsap from "gsap";

import UnderAnimationComponent from "../template/UnderAnimationComponent/UnderAnimationComponent";
import ButtonComponent from "../template/ButtonComponent/ButtonComponent";
import useWidthHook from "@/app/hooks/useWidthHooks";

// Define interfaces for better type safety

const NavigationDMTas: React.FC = () => {
  const width = useWidthHook();
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState<boolean>(false);

  const [isContactHover, setIsContactHover] = useState<boolean>(false);
  const [isProductHover, setIsProductHover] = useState<boolean>(false);
  const [isBlogsHover, setIsBlogsHover] = useState<boolean>(false);
  const [hoverServices, setHoverServices] = useState<string>(
    "Multifunction Printers"
  );

  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false); // Track click state

  // const updateSelectedSubNav = useSubGlobalNavigation(
  //   (state) => state.setSubGlobalNavigation
  // );

  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    if (width > 1023) {
      setMobileMenuOpen(false);
    }
  }, [width]);

  useEffect(() => {
    const handleScroll = (): void => {
      const shouldBeFixed = window.scrollY > 50;

      if (shouldBeFixed !== isFixed) {
        setIsFixed(shouldBeFixed);

        if (navRef.current) {
          if (shouldBeFixed) {
            // Animate to fixed position with shadow
            gsap.fromTo(
              navRef.current,
              {
                y: -200,
                // opacity: 0,
                onComplete: () => {
                  // Ensure the class is updated after animation
                  if (navRef.current) {
                    navRef.current.classList.add("fixed");
                    navRef.current.classList.remove("relative");
                  }
                },
              },
              {
                position: "fixed",
                y: 0,
                // opacity: 1,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                duration: 0.5,
                ease: "none",
                onComplete: () => {
                  // Ensure the class is updated after animation
                  if (navRef.current) {
                    navRef.current.classList.add("fixed");
                    navRef.current.classList.remove("relative");
                  }
                },
              }
            );
          } else {
            // Animate back to relative position
            gsap.fromTo(
              navRef.current,
              {
                position: "relative",
                y: 50,
                // opacity: 0,
                onComplete: () => {
                  // Ensure the class is updated after animation
                  if (navRef.current) {
                    navRef.current.classList.add("relative");
                    navRef.current.classList.remove("fixed");
                  }
                },
              },
              {
                position: "relative",
                y: 0,
                opacity: 1,
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                duration: 0.5,
                ease: "none",
                onComplete: () => {
                  // Ensure the class is updated after animation
                  if (navRef.current) {
                    navRef.current.classList.add("relative");
                    navRef.current.classList.remove("fixed");
                  }
                },
              }
            );
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed, width]);

  // Initial GSAP setup
  useEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, {
        y: 0,
        opacity: 1,
      });
    }
  }, []);

  // const onClickSubMenu = (e: ProductsMenuItem): void => {
  //   updateSelectedSubNav(e.Header);
  //   setIsMenuOpen(false);
  // };

  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      const target = event.target as HTMLElement;
      if (!target.closest("#navbar__dropdown")) {
        setIsMenuOpen(false);
        setIsMenuClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const handleClick = (): void => {
    router.push("/support"); // Navigate to "/support"
    event("Hardware Support", {
      info: "User's clicked the button Hardware Support",
    });
  };

  const contactsHover = (): void => {
    setIsContactHover(true);
    setIsCompanyOpen(false);
    setIsMenuOpen(false);
    setIsProductHover(false);
  };

  const blogsHover = (): void => {
    setIsBlogsHover(true);
    setIsContactHover(false);
    setIsCompanyOpen(false);
    setIsMenuOpen(false);
    setIsProductHover(false);
  };

  const productHover = (): void => {
    setIsProductHover(true);
    setIsContactHover(false);
    setIsCompanyOpen(false);
    setIsMenuOpen(false);
  };

  const puzzleHover = (): void => {
    setIsProductHover(false);
    setIsContactHover(false);
    setIsCompanyOpen(false);
    setIsMenuOpen(false);
  };

  const productsHover = (): void => {
    // Only update hover state if NOT clicked
    setIsMenuOpen(true);
    setIsCompanyOpen(false);
  };

  const companyHover = (): void => {
    setIsCompanyOpen(true);
    setIsMenuOpen(false);
    setIsProductHover(false);
  };

  const headerClickHandler = (title: string): void => {
    setIsMenuClicked((prev) => !prev); // Toggle click state

    if (title === "product") {
      setIsMenuOpen((prev) => !prev);
    } else if (title === "company") {
      setIsCompanyOpen((prev) => !prev);
    }
  };

  const onMouseLeaveHandler = (): void => {
    if (!isMenuClicked) {
      // Prevent closing if it was clicked
      setIsMenuOpen(false);
      setIsCompanyOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest("#navbar__dropdown")) {
        setIsMenuOpen(false);
        setIsMenuClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`z-50 w-full ${
          isFixed ? "fixed shadow-lg bg-black/70" : "relative bg-white"
        } custom-class`}
        style={{ top: isFixed ? 0 : "auto" }}
      >
        <header className=" flex px-7 gap-5 sm:px-10 2xl:px-28 justify-between min-h-16 items-center py-6 overflow-x-hidden shadow-md">
          <div key="logo" className="flex items-center gap-10">
            <Link href={"/"}>
              <Image
                src={isFixed ? DMTasLogoWhiteShield : DMTasLogoShield}
                alt="Logo Image"
                className="cursor-pointer "
                priority={true}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              />
            </Link>

            <div
              onMouseLeave={onMouseLeaveHandler}
              className={`gap-12 hidden lg:block ${
                isFixed ? "text-white" : "text-[#252324]"
              }  items-center 4K:text-4xl z-10 tracking-wider font-sans font-semibold whitespace-nowrap`}
            >
              <div className="w-full flex lg:gap-4 xl:gap-5 text-sm lg:text-base xl:text-lg items-center tracking-normal">
                {/* <div>
              <Image
                src={isFixed ? DMTasLogoWhiteShield : DMTasLogoShield}
                alt="Logo Image"
                className="2xl:w-20 h-8 2xl:h-10"
                priority={true}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              />
            </div> */}
                <motion.div
                  id="navbar__dropdown"
                  className={`cursor-pointer custom-class flex relative`}
                  onMouseEnter={productsHover}
                >
                  <button
                    className="w-full cursor-pointer"
                    onClick={() => headerClickHandler("product")}
                  >
                    <div className="flex lg:gap-2 items-center">
                      Our Brands{" "}
                      <motion.span
                        animate={{ rotate: isMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <ChevronDownIcon
                          className={`w-5 h-5 xl:w-6 xl:h-6 font-bold `}
                        />
                      </motion.span>
                    </div>
                    <motion.hr
                      className="absolute bg-black h-1 rounded-full"
                      animate={{
                        width: isMenuOpen ? "100%" : "0%",
                        opacity: isMenuOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </button>
                </motion.div>

                <Link
                  href={"/services/contact/about#top"}
                  onMouseEnter={productHover}
                  onMouseLeave={() => setIsProductHover(false)}
                >
                  <div className="relative">
                    <span className="cursor-pointer hover:opacity-80 ">
                      Products
                    </span>

                    <UnderAnimationComponent isHover={isProductHover} />
                  </div>
                </Link>

                <Link
                  href={"/ourcompany/"}
                  onMouseEnter={companyHover}
                  onMouseLeave={() => setIsCompanyOpen(false)}
                >
                  <div className="relative">
                    <span className="cursor-pointer hover:opacity-80 ">
                      Our Company
                    </span>

                    <UnderAnimationComponent isHover={isCompanyOpen} />
                  </div>
                </Link>

                <Link
                  href={"/services/contact/about"}
                  onMouseEnter={blogsHover}
                  onMouseLeave={() => setIsBlogsHover(false)}
                >
                  <div className="relative">
                    <span className="cursor-pointer hover:opacity-80">
                      Blogs
                    </span>
                    <UnderAnimationComponent isHover={isBlogsHover} />
                  </div>
                </Link>

                <Link
                  href="/#inquiry-section"
                  onMouseEnter={contactsHover}
                  onMouseLeave={() => setIsContactHover(false)}
                >
                  <div className="relative">
                    <span className="cursor-pointer hover:opacity-80">
                      Contact Us
                    </span>

                    <UnderAnimationComponent isHover={isContactHover} />
                  </div>
                </Link>
              </div>

              {isMenuOpen && (
                <AnimatePresence>
                  <motion.div
                    id="navbar__dropdown"
                    className="absolute left-48 top-[65%] z-[1001] w-full"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="relative shadow-xl mt-14 flex w-[850px] h-[22rem] bg-white rounded-lg font-sans">
                      {/* Left Panel */}
                      <div className="w-96 p-8">
                        <h3 className="text-xs text-[#252324]/50 mb-6 font-light">
                          Brands
                        </h3>
                        <div className="space-y-7">
                          {productsMenu.map((product) => {
                            const isActive = hoverServices === product.Header;
                            return (
                              <Link
                                key={product.id}
                                href={product.links}
                                className={`flex items-center cursor-pointer transition-colors duration-200 relative tracking-wide ${
                                  isActive
                                    ? "text-blue-600 font-medium"
                                    : "text-gray-800 hover:text-blue-600"
                                }`}
                                onMouseEnter={() =>
                                  setHoverServices(product.Header)
                                }
                              >
                                <span className="text-lg font-medium text-[#252324]">
                                  {product.Header}
                                </span>
                                {isActive && (
                                  <ArrowRightCircleIcon className="w-6 h-6 ml-4" />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Panel */}
                      <motion.div
                        key={hoverServices} // Re-mounts when hoverProduct changes
                        className="w-2/3 p-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <div className="bg-[#EAF1F7] p-7 h-80 rounded-md relative">
                          <div className="mb-2">
                            <h2 className="text-base font-bold mb-2 text-[#252324]/50 font-sans">
                              OVERVIEW
                            </h2>
                            <span className="text-gray-600 font-normal tracking-normal font-monserrat">
                              {
                                productsMenu.find(
                                  (p) => p.Header === hoverServices
                                )?.overview
                              }
                            </span>
                          </div>

                          <div className="relative h-44 bg-white rounded-lg shadow-sm overflow-hidden">
                            <Image
                              src={Rectangle157}
                              alt="Office setup"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* button */}
          <div className="hidden lg:block ">
            {/* <Link href="/support" onClick={() => setIsMenuOpen(false)}> */}
            <div className="flex items-center justify-end gap-3 xl:gap-5">
              <div className="relative" onMouseEnter={puzzleHover}>
                <ButtonComponent
                  className={`group relative ${
                    isFixed ? "text-white" : "text-[#252324]"
                  } font-semibold text-sm border p-2 px-1 md:px-2.5 cursor-pointer rounded-xl hover:bg-red-600 hover:text-white transition duration-300 ease-out lg:px-5 2xl:px-8 border-red-600 tracking-normal lg:text-base xl:text-lg font-sans flex items-center justify-center gap-1`}
                  onClick={handleClick}
                >
                  <PuzzleIcon
                    className={`w-4 h-4 xl:w-5 xl:h-5  ${
                      isFixed
                        ? "text-white"
                        : "text-[#252324] group-hover:text-white"
                    }`}
                  />
                  <span> Puzzles</span>
                </ButtonComponent>
              </div>

              <ButtonComponent
                className={`
                 bg-[#007EC6] text-white cursor-pointer font-bold p-2 px-1 md:px-2.5 rounded-xl lg:px-5 2xl:px-8 
                 tracking-wide text-sm lg:text-base font-sans flex items-center justify-center whitespace-nowrap
                 relative overflow-hidden
                 transition-all ease-in-out duration-300
                 hover:bg-[#0056b3] hover:scale-105 hover:shadow-lg hover:shadow-[#007EC6]/30
                 hover:-translate-y-1 hover:brightness-110
                 active:scale-95 active:translate-y-0
                 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                 before:translate-x-[-100%] before:transition-transform before:duration-700
                 hover:before:translate-x-[100%]
                `}
                onClick={handleClick}
              >
                Hardware Support
              </ButtonComponent>
            </div>

            {/* </Link> */}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
            }} // Toggle state
          >
            <motion.div
              key={mobileMenuOpen ? "close" : "open"} // Adding key to animate between the two icons
              initial={{ opacity: 0, rotate: 180 }} // Start with the opposite of the current state
              animate={{ opacity: 1, rotate: 0 }} // Final state when visible
              exit={{ opacity: 0, rotate: -180 }} // When exiting, rotate back and fade out
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {mobileMenuOpen ? (
                <XMarkIcon
                  className={`w-8 h-8 ${isFixed ? "text-white" : "text-black"}`}
                />
              ) : (
                <Bars3Icon
                  className={`w-8 h-8 ${isFixed ? "text-white" : "text-black"}`}
                />
              )}
            </motion.div>
          </button>
        </header>

        {/* Mobile Navigation Menu (start) =========================================================> */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative w-full h-screen max-h-screen py-2 bg-white text-black flex flex-col gap-4 overflow-hidden"
            >
              <div className="h-[40rem] overflow-y-auto py-5">
                <div className=" w-full flex flex-col gap-6 lg:gap-8 text-base font-sans">
                  <motion.div
                    className={`cursor-pointer custom-class flex relative`}
                  >
                    <div className="w-full px-5">
                      <button
                        className="flex font-semibold justify-between w-full px-2"
                        onClick={() => setIsServicesOpen((prev) => !prev)}
                      >
                        Our Services{" "}
                        <motion.span
                          animate={{ rotate: isServicesOpen ? 90 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ChevronRightIcon className={`w-6 h-6 font-bold `} />
                        </motion.span>
                      </button>
                    </div>
                  </motion.div>

                  {isServicesOpen && (
                    <>
                      <motion.div
                        className="relative h-auto"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: isServicesOpen ? "auto" : 0,
                          opacity: isServicesOpen ? 1 : 0,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <div className="w-full bg-[#EAF1F7] h-72 overflow-visible">
                          <div className="flex flex-col p-4">
                            <div className="mb-2">
                              <h3 className="text-base font-bold mb-2 text-[#252324]/50 font-sans">
                                OVERVIEW
                              </h3>
                              <p className="text-gray-600 font-normal tracking-normal text-sm font-monserrat">
                                Document Management Tasmania is your one-stop
                                destination for a comprehensive suite.
                              </p>
                            </div>
                            <div className="relative h-44 bg-white rounded-lg shadow-sm overflow-hidden">
                              <Image
                                src={Rectangle157}
                                alt="Office setup"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <h2 className="font-sans ml-5 my-5 tracking-wide font-light text-base text-[#868686]">
                          Products and Services
                        </h2>
                        <div className="flex flex-col items-start">
                          {productsMenu.map((product) => (
                            <div
                              key={product.Header}
                              className={`cursor-pointer transition-colors duration-200 border-b w-full border-gray-300 last:border-b-0 py-3`}
                              onClick={() => {
                                setHoverServices(product.Header);

                                // setIsLogoText(true); // Change logo to text
                              }}
                            >
                              <Link
                                href={product.links}
                                className="flex ml-10 items-center"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="text-lg font-xs text-[#252324] font-sans tracking-wider">
                                  {product.Header}
                                </span>
                                {/* {hoverProduct === product.Header && (
                              <ArrowRightCircleIcon className="w-4 h-4 ml-2" />
                            )} */}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}

                  <div className="border-b border-gray-300 my-2" />

                  <Link href={"/services/contact/about#top"}>
                    <div className="relative px-5">
                      <p className="w-full font-semibold">Product (MFP/D) </p>

                      <motion.hr
                        className="absolute bg-black h-1 rounded-full"
                        animate={{
                          width: isContactHover ? "100%" : "0%",
                          opacity: isContactHover ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </div>
                  </Link>

                  <div className="border-b border-gray-300 my-2" />

                  <motion.div
                    className={`cursor-pointer custom-class flex relative`}
                  >
                    <div className="w-full px-5">
                      <button
                        className="flex font-semibold justify-between w-full px-2"
                        onClick={() => setIsCompanyOpen((prev) => !prev)}
                      >
                        Our Company{" "}
                        <motion.span
                          animate={{ rotate: isCompanyOpen ? 90 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ChevronRightIcon className={`w-6 h-6 font-bold `} />
                        </motion.span>
                      </button>
                    </div>
                  </motion.div>

                  {isCompanyOpen && (
                    <>
                      <motion.div
                        className="relative h-auto"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: isCompanyOpen ? "auto" : 0,
                          opacity: isCompanyOpen ? 1 : 0,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <div className="w-full bg-[#EAF1F7] h-72 overflow-visible">
                          <div className="flex flex-col p-4">
                            <div className="mb-2">
                              <h3 className="text-base font-bold mb-2 text-[#252324]/50 font-sans">
                                OVERVIEW
                              </h3>
                              <p className="text-gray-600 font-normal tracking-normal text-sm font-monserrat">
                                Document Management Tasmania is your one-stop
                                destination for a comprehensive suite.
                              </p>
                            </div>
                            <div className="relative h-44 bg-white rounded-lg shadow-sm overflow-hidden">
                              <Image
                                src={Rectangle157}
                                alt="Office setup"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <h2 className="font-sans ml-5 my-5 tracking-wide font-light text-base text-[#868686]">
                          Products and Services
                        </h2>
                        <div className="flex flex-col items-start">
                          {productsMenu.map((product) => (
                            <div
                              key={product.Header}
                              className={`cursor-pointer transition-colors duration-200 border-b w-full border-gray-300 last:border-b-0 py-3`}
                              onClick={() => {
                                setHoverServices(product.Header);

                                // setIsLogoText(true); // Change logo to text
                              }}
                            >
                              <Link
                                href={product.links}
                                className="flex ml-10 items-center"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="text-lg font-xs text-[#252324] font-sans tracking-wider">
                                  {product.Header}
                                </span>
                                {/* {hoverProduct === product.Header && (
                              <ArrowRightCircleIcon className="w-4 h-4 ml-2" />
                            )} */}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}

                  {/* Border separator */}
                  <div className="border-b border-gray-300 my-2" />

                  <Link href={"/services/contact/about#top"}>
                    <div className="relative px-5">
                      <p className="w-full font-semibold">Contact Us</p>

                      <motion.hr
                        className="absolute bg-black h-1 rounded-full"
                        animate={{
                          width: isContactHover ? "100%" : "0%",
                          opacity: isContactHover ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </div>
                  </Link>

                  {/* Border separator */}
                  <div className="border-b border-gray-300 my-2" />

                  <Link href={"/services/contact/about#top"}>
                    <div className="relative px-5">
                      <p className="w-full font-semibold">Blogs</p>

                      <motion.hr
                        className="absolute bg-black h-1 rounded-full"
                        animate={{
                          width: isContactHover ? "100%" : "0%",
                          opacity: isContactHover ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </div>
                  </Link>

                  <div className="w-full border-t-2 mb-2"></div>
                  <div className="mt-5 px-5">
                    <ButtonComponent
                      className=" bg-black text-white font-bold p-4 md:text-base hover:opacity-80 transition w-full tracking-wide ease-in-out duration-300 font-sans flex items-center justify-center gap-3"
                      onClick={handleClick}
                    >
                      Hardware Support
                    </ButtonComponent>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Mobile Navigation Menu (end) =========================================================> */}
      </nav>
    </>
  );
};

export default NavigationDMTas;
