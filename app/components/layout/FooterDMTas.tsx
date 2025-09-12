"use client";
import React, { useState } from "react";
import Logo from "@/public/dmtas_assets/DMTas_Horizontal_Mono_Reverse.svg";
import Image from "next/image";
import Link from "next/link.js";
import { AnimatePresence, motion } from "framer-motion";

//icons - Fixed import
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

//ISO
import iso9001 from "@/public/ISO9001_Logo.svg";
import iso27001 from "@/public/ISO27001_Logo.svg";
import useWidthHook from "@/app/hooks/useWidthHooks";

const FooterDMTas = () => {
  const width = useWidthHook();
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const socialLinks = [
    {
      icon: Facebook,
      link: "https://www.facebook.com/DMTas.2021",
      label: "Facebook",
    },
    {
      icon: Instagram,
      link: "https://www.instagram.com/dmtas.2021/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      link: "https://www.linkedin.com/company/document-management-tasmania/",
      label: "LinkedIn",
    },
    {
      icon: Youtube,
      link: "https://www.youtube.com/channel/UCe9YGPz1bQerzhmw_kbhjBw",
      label: "YouTube",
    },
  ];

  const footerLinks = [
    {
      title: "Our Brands",
      subTitle: [
        {
          name: "The Print Division Tasmania",
          links: "/services/multifunctionPrinters/about#top",
        },
        {
          name: "Acrodata",
          links: "/services/digitalPrint/about#top",
        },
        {
          name: "Hobart Signwriters",
          links: "/services/digitisation/about#top",
        },
      ],
    },
    {
      title: "Hardware Support",
      subTitle: [
        {
          name: "Service Request",
          links: "/support/serviceRequest",
        },
        {
          name: "Meter Read",
          links: "/support/meterRead",
        },
        {
          name: "Remote Support",
          links: "/support/remoteSupport",
        },
        {
          name: "Driver and Support",
          links:
            "https://support-fb.fujifilm.com/setupSupport.do?cid=2&ctry_code=AU&lang_code=en",
        },
      ],
    },
    {
      title: "Contacts",
      subTitle: [
        {
          name: "1300 141 100",
          links: "tel:1300141100",
        },
        {
          name: "enquiries@dmtas.com.au",
          links: "mailto:enquiries@dmtas.com.au",
        },
        {
          name: "16 Ruthwell Street, Montrose TAS 7010",
          links:
            "https://www.google.com/maps?q=16+Ruthwell+Street,+Montrose+TAS+7010",
        },
      ],
    },
    {
      title: "Legal",
      subTitle: [
        {
          name: "Privacy Policy",
          links: "/support/privacyPolicy",
        },
        {
          name: "Terms of Service",
          links: "/support/termsOfService",
        },
        {
          name: "ABN: 52 629 796 103",
          links: null,
        },
      ],
    },
  ];

  const DesktopFooter = () => (
    <footer className="bg-black py-8 w-full relative">
      <div className="flex w-full justify-center lg:gap-11 xl:gap-[100px] 2xl:gap-[300px] px-16 xl:px-[60px]">
        {/* Logo and Social Section */}
        <div className="flex flex-col gap-7">
          <Image
            src={Logo}
            alt="DMTas Logo"
            className="cursor-pointer w-[261px] h-auto"
            priority={true}
          />
          <div className="text-white">
            <p className="text-base font-normal font-aktiv tracking-wider">
              Solution for every Business Journey.
            </p>
            <p className="text-sm font-light tracking-wider mt-2">
              © Document Management Tasmania Pty Ltd 2025
            </p>
          </div>
          <ul className="flex gap-[21px]">
            {socialLinks.map(({ icon: Icon, link, label }, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block"
                >
                  <Icon
                    className="text-white hover:text-gray-300 transition-colors"
                    size={32}
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Footer Links */}
        <div className="flex gap-10 2xl:gap-16">
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-8">
              <h6 className="text-white text-base font-semibold font-brigoli">
                {section.title}
              </h6>
              <ul className="space-y-4">
                {section.subTitle.map((item, i) => (
                  <li key={i}>
                    {item.links ? (
                      <a
                        href={item.links}
                        className="text-gray-300 text-sm font-normal hover:text-white hover:underline font-aktiv tracking-wide transition-colors"
                        target={
                          item.links.startsWith("http") ? "_blank" : "_self"
                        }
                        rel={
                          item.links.startsWith("http")
                            ? "noopener noreferrer"
                            : ""
                        }
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="text-gray-300 text-sm font-normal font-aktiv tracking-wide">
                        {item.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ISO Certifications */}
      <div className="hidden md:block px-16 xl:px-[200px] mt-8">
        <div className="flex justify-end gap-[21px]">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={iso9001}
              alt="ISO 9001 Certification"
              className="w-[74px] h-[74px]"
              priority={true}
            />
          </motion.div>
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={iso27001}
              alt="ISO 27001 Certification"
              className="w-[74px] h-[74px]"
              priority={true}
            />
          </motion.div>
        </div>
      </div>

      <hr className="my-6 border-gray-600 w-full" />

      {/* Copyright */}
      <div className="px-16 xl:px-[200px]">
        <p className="text-gray-400 text-xs font-monserrat">
          <a href="/login" className="hover:text-white transition-colors">
            @
          </a>{" "}
          2025 Document Management Tasmania Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );

  const MobileFooter = () => (
    <footer className="bg-black py-8 relative">
      <div className="px-7">
        <div className="mx-auto grid sm:grid-cols-2 gap-8">
          {/* Logo and Info */}
          <div className="flex flex-col gap-9">
            <Image
              src={Logo}
              alt="DMTas Logo"
              className="cursor-pointer w-[261px] h-auto"
              priority={true}
            />
            <div className="text-white">
              <p className="text-base font-normal font-aktiv tracking-wider">
                Solution for every Business Journey.
              </p>
              <p className="text-sm font-light mt-2">
                © Document Management Tasmania Pty Ltd 2025
              </p>
            </div>
            {/* Fixed: Use Lucide icons as JSX components, not Image sources */}
            <ul className="flex gap-[21px]">
              {socialLinks.map(({ icon: Icon, link, label }, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="block"
                  >
                    <Icon
                      className="text-white hover:text-gray-300 transition-colors"
                      size={32}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ISO Certifications for tablet */}
          <div className="gap-[21px] px-7 hidden sm:flex justify-end place-items-end">
            <Image
              src={iso9001}
              alt="ISO 9001 Certification"
              className="w-16 h-16"
              priority={true}
            />
            <Image
              src={iso27001}
              alt="ISO 27001 Certification"
              className="w-16 h-16"
              priority={true}
            />
          </div>
        </div>
      </div>

      {/* ISO Certifications for mobile */}
      <div className="flex justify-start my-10 gap-[21px] px-7 sm:hidden">
        <Image
          src={iso9001}
          alt="ISO 9001 Certification"
          className="w-12 h-12"
          priority={true}
        />
        <Image
          src={iso27001}
          alt="ISO 27001 Certification"
          className="w-12 h-12"
          priority={true}
        />
      </div>

      <hr className="my-6 border-gray-600" />

      {/* Collapsible Sections */}
      <div className="flex flex-col space-y-6">
        {footerLinks.map((section, index) => (
          <div key={index} className="relative space-y-2 pb-5">
            <div
              className="flex justify-between items-center px-7 cursor-pointer py-2"
              onClick={() => toggleSection(index)}
            >
              <h6 className="text-white text-base font-semibold">
                {section.title}
              </h6>
              <ChevronRight
                className={`w-6 h-6 text-white transition-transform duration-300 ${
                  openSections[index] ? "rotate-90" : "rotate-0"
                }`}
              />
            </div>

            <AnimatePresence>
              {openSections[index] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <ul className="px-7 space-y-3 mt-2 pb-4">
                    {section.subTitle.map((item, i) => (
                      <li key={i}>
                        {item.links ? (
                          <a
                            href={item.links}
                            className="text-white text-sm font-normal block hover:text-gray-300 transition-colors"
                            target={
                              item.links.startsWith("http") ? "_blank" : "_self"
                            }
                            rel={
                              item.links.startsWith("http")
                                ? "noopener noreferrer"
                                : ""
                            }
                          >
                            {item.name}
                          </a>
                        ) : (
                          <span className="text-white text-sm font-normal block">
                            {item.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            <hr className="absolute bottom-0 left-0 w-full border-gray-600" />
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="mt-[60px] mb-[40px] text-center">
        <p className="text-gray-400 text-xs font-monserrat">
          <a href="/login" className="hover:text-white transition-colors">
            @
          </a>{" "}
          2025 Document Management Tasmania Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );

  return width > 1023 ? <DesktopFooter /> : <MobileFooter />;
};

export default FooterDMTas;
