"use client";

import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Rectangle157 from "@/public/Rectangle157.png";

//zustand
import { event } from "@/app/lib/fpixel";

//DMTas Logo
import DMTasLogoShield from "@/public/dmtas_assets/DMTas_Logomark_Colour.svg";
import DMTasLogoWhiteShield from "@/public/dmtas_assets/DMTas_Logomark_Mono_Reverse.svg";

import {
  ArrowRightCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Building,
  CheckCircle,
  ChevronDown,
  Cpu,
  Gauge,
  Mail,
  Phone,
  PuzzleIcon,
  UserCircle,
} from "lucide-react";
import { productsMenu } from "@/app/constants";
import gsap from "gsap";

import UnderAnimationComponent from "../template/UnderAnimationComponent/UnderAnimationComponent";
import ButtonComponent from "../template/ButtonComponent/ButtonComponent";
import useWidthHook from "@/app/hooks/useWidthHooks";
import ModalComponent from "../template/ModalComponent/ModalComponent";
import RemoteSupportComponent from "../template/RemoteSupportComponent/RemoteSupportComponent";
import {
  sendMeterReadEmail,
  sendServiceRequestEmail,
} from "@/app/functions/API";
import {
  ParsedData,
  RequestData,
  UserDetails,
} from "@/app/model/interface/RequestDataType";
import { FormData } from "@/app/model/interface/FormDataType";
import ToasterComponent from "../template/ToastMessageComponent/ToastMessageComponent";
import LoaderComponent from "../template/LoaderComponent/LoaderComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getModalOpenState,
  getSelectedMenu,
  setModalOpenState,
  setSelectedMenu,
} from "@/redux/storageSlice";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useUser } from "@/app/context/authContext";

// Define interfaces for better type safety

// Separate component that uses useSearchParams
const SearchParamsHandler: React.FC<{
  onScrollTo: (scrollTo: string | null) => void;
}> = ({ onScrollTo }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    onScrollTo(scrollTo);
  }, [searchParams, onScrollTo]);

  return null;
};

const NavigationDMTas: React.FC = () => {
  const { isLoggedIn } = useUser();

  // const _token = getTokenFromLocalStorage() ?? "";
  // let userData: TokenModel | null = null;

  // if (_token) {
  //   try {
  //     userData = jwtDecode<TokenModel>(_token);
  //     console.log("Decoded userData:", userData);
  //   } catch (err) {
  //     console.error("Invalid token:", err);
  //     userData = null; // fallback
  //   }
  // } else {
  //   console.log("No token found in localStorage");
  // }

  const width = useWidthHook();
  const router = useRouter();
  const dispatch = useDispatch();
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isModalOpen = useSelector(getModalOpenState);
  const selectedMenu = useSelector(getSelectedMenu);

  const navRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const serviceFieldsRef = useRef<HTMLDivElement>(null);
  const meterFieldsRef = useRef<HTMLDivElement>(null);
  const removeFieldsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef(null);

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

  // read the current modal state from redux
  const modalOpenState = useAppSelector(
    (state: RootState) => state.reduxStorage.modalOpenState
  );

  const [showToast, setShowToast] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [toastType, setToastType] = useState<string>("");

  // send email service request (start) ============================================================>
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // Form validation errors
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    machine_id: "",
    error_code: "",
    serial_number: "",
    meter_1: "",
    meter_2: "",
    meter_3: "",
    meter_4: "",
    meter_5: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  // send email service request (start) ============================================================>

  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false); // Track click state

  // modal (start) =================================================>
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);
  // modal (end) =================================================>

  // 1. Add this type definition at the top with your other interfaces
  type HardwareSupportMenuItem =
    | "Service Request"
    | "Meter Read"
    | "Remote Support"
    | "Drivers and Support"
    | "";

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

  // 2. Update your menuItems array to be properly typed
  const menuItems: HardwareSupportMenuItem[] = [
    "Service Request",
    "Meter Read",
    "Remote Support",
    "Drivers and Support",
  ];

  const [menuLists, setMenuLists] =
    useState<HardwareSupportMenuItem>("Service Request");
  // const [selectedMenu, setSelectedMenu] = useState<string>("Service Request");

  const handleClick = (): void => {
    // setIsModalOpen((prev) => !prev);
    dispatch(setModalOpenState(!modalOpenState)); // toggle

    // router.push("/support"); // Navigate to "/support"
    // event("Hardware Support", {
    //   info: "User's clicked the button Hardware Support",
    // });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  const handleItemClick = (item: string) => {
    if (item === selectedMenu) return;

    if (item === "Drivers and Support") {
      window.open(
        "https://support-fb.fujifilm.com/setupSupport.do?cid=2&ctry_code=AU&lang_code=en",
        "_blank"
      );

      // Analytics tracking
      event("Hardware Support Item Selected", {
        info: `User selected: ${item} - Opened external link`,
      });

      return;
    }

    // GSAP transition animation
    if (formContainerRef.current) {
      const tl = gsap.timeline();

      // Fade out current form fields
      tl.to(
        [
          serviceFieldsRef.current,
          meterFieldsRef.current,
          removeFieldsRef.current,
        ],
        {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.out",
        }
      )
        .set(
          [
            serviceFieldsRef.current,
            meterFieldsRef.current,
            removeFieldsRef.current,
          ],
          {
            display: "none",
          }
        )
        .call(() => {
          // Update the state after fade out
          switch (item) {
            case "Service Request":
              setMenuLists("Service Request");
              dispatch(setSelectedMenu("Service Request"));
              // setSelectedMenu("Service Request");
              break;
            case "Meter Read":
              setMenuLists("Meter Read");
              dispatch(setSelectedMenu("Meter Read"));

              break;
            case "Remote Support":
              setMenuLists("Remote Support");
              dispatch(setSelectedMenu("Remove Support"));
              break;
            case "Drivers and Support":
              break;
            default:
              break;
          }
          setIsSupportModalOpen(false);
        })
        .call(() => {
          // Show the new form fields
          let targetRef = null;
          switch (item) {
            case "Service Request":
              targetRef = serviceFieldsRef.current;
              break;
            case "Meter Read":
              targetRef = meterFieldsRef.current;
              break;
            case "Remove Support":
              targetRef = removeFieldsRef.current;
              break;
            default:
              break;
          }

          if (targetRef) {
            gsap.set(targetRef, { display: "contents" });
            gsap.fromTo(
              targetRef.children,
              {
                opacity: 0,
                y: 40,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.4)",
                stagger: 0.08,
              }
            );
          }
        });
    } else {
      // Fallback for when refs aren't available
      switch (item) {
        case "Service Request":
          setMenuLists("Service Request");
          dispatch(setSelectedMenu("Service Request"));
          break;
        case "Meter Read":
          setMenuLists("Meter Read");
          dispatch(setSelectedMenu("Meter Read"));

          break;
        case "Remote Support":
          setMenuLists("Remote Support");
          dispatch(setSelectedMenu("Remove Support"));
          break;
        case "Drivers and Support":
          break;
        default:
          break;
      }
      setIsSupportModalOpen(false);
    }

    // Analytics tracking
    event("Hardware Support Item Selected", {
      info: `User selected: ${item}`,
    });
  };

  const handlePuzzleClick = (): void => {
    if (!isLoggedIn) {
      setMobileMenuOpen(false);
      router.push("/puzzle/login"); // Navigate to "/support"
      event("Variety Puzzle", {
        info: "User's clicked the button Hardware Support",
      });
    } else {
      setMobileMenuOpen(false);
      router.push("/puzzle/variety"); // Navigate to "/support"
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmitHander = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let formValues: UserDetails;
      let parsedData: ParsedData;
      let requestData: RequestData;

      if (menuLists === "Service Request") {
        formValues = {
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          BusinessName: formData.business_name || "",
          MachineId: formData.machine_id || "",
          ErrorCode: formData.error_code,
          Message: formData.message,
        };

        // Provide parsedData - adjust these values as needed for your use case
        parsedData = {
          email: formData.email,
          title: `${formData.business_name}`,
        };

        requestData = {
          formValues,
          parsedData,
        };

        sendServiceRequestEmail(requestData).then((response) => {
          if (response.statusCode === 200) {
            setShowToast(true);
            setTitle("Success");
            setMessage("Your service request has been submitted successfully.");
            setToastType("success");
            setTimeout(() => {
              setShowToast(false);
              setIsSubmitting(false);
              // Reset form
              setFormData({
                name: "",
                email: "",
                phone: "",
                business_name: "",
                machine_id: "",
                error_code: "",
                serial_number: "",
                meter_1: "",
                meter_2: "",
                meter_3: "",
                meter_4: "",
                meter_5: "",
                message: "",
              });
            }, 3000);
          } else {
            setShowToast(true);
            setTitle("Error");
            setMessage(
              "Your Service Request has not been submitted successfully."
            );
            setToastType("error");
            setTimeout(() => {
              setShowToast(false);
              setIsSubmitting(false);
              // Reset form
              setFormData({
                name: "",
                email: "",
                phone: "",
                business_name: "",
                machine_id: "",
                error_code: "",
                serial_number: "",
                meter_1: "",
                meter_2: "",
                meter_3: "",
                meter_4: "",
                meter_5: "",
                message: "",
              });
            }, 3000);
          }
        });
      } else if (menuLists === "Meter Read") {
        formValues = {
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          IDSN: formData.serial_number,
          Meter1: formData.meter_1,
          Meter2: formData.meter_2,
          Meter3: formData.meter_3,
          Meter4: formData.meter_4,
          Meter5: formData.meter_5,
        };

        // Provide parsedData - adjust these values as needed for your use case
        parsedData = {
          email: formData.email,
          title: `${formData.serial_number}`,
        };

        requestData = {
          formValues,
          parsedData,
        };

        sendMeterReadEmail(requestData).then((response) => {
          if (response.statusCode === 200) {
            setShowToast(true);
            setTitle("Success");
            setMessage("Your Meter Read has been submitted successfully.");
            setToastType("success");
            setTimeout(() => {
              setShowToast(false);
              setIsSubmitting(false);
              // Reset form
              setFormData({
                name: "",
                email: "",
                phone: "",
                business_name: "",
                machine_id: "",
                error_code: "",
                serial_number: "",
                meter_1: "",
                meter_2: "",
                meter_3: "",
                meter_4: "",
                meter_5: "",
                message: "",
              });
            }, 3000);
          } else {
            setShowToast(true);
            setTitle("Error");
            setMessage("Your Meter Read has not been submitted successfully.");
            setToastType("error");
            setTimeout(() => {
              setShowToast(false);
              // Reset form
              setFormData({
                name: "",
                email: "",
                phone: "",
                business_name: "",
                machine_id: "",
                error_code: "",
                serial_number: "",
                meter_1: "",
                meter_2: "",
                meter_3: "",
                meter_4: "",
                meter_5: "",
                message: "",
              });
              setIsSubmitting(false);
            }, 3000);
          }
        });
      } else {
        return;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pathname = usePathname();

  const contactUsHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (pathname === "/") {
      document.getElementById("inquiry-section")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      router.push("/?scrollTo=inquiry-section");
    }
  };

  const handleScrollTo = (scrollTo: string | null) => {
    if (scrollTo === "inquiry-section") {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        document.getElementById("inquiry-section")?.scrollIntoView({
          behavior: "smooth",
        });

        // Clean up the URL parameter after scrolling
        const url = new URL(window.location.href);
        url.searchParams.delete("scrollTo");
        window.history.replaceState({}, "", url.pathname + url.search);
      }, 100);

      return () => clearTimeout(timer);
    }
  };

  return (
    <>
      <Suspense fallback={<div />}>
        <SearchParamsHandler onScrollTo={handleScrollTo} />
      </Suspense>

      <ToasterComponent
        isOpen={showToast}
        title={title}
        message={message}
        onClose={setShowToast}
        type={toastType}
      />
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
              }  items-center 4K:text-4xl  z-10 tracking-wider font-sans font-semibold whitespace-nowrap`}
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
                  href={"/products"}
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
                  href={"/ourworks/"}
                  onMouseEnter={blogsHover}
                  onMouseLeave={() => setIsBlogsHover(false)}
                >
                  <div className="relative">
                    <span className="cursor-pointer hover:opacity-80">
                      Our Works
                    </span>
                    <UnderAnimationComponent isHover={isBlogsHover} />
                  </div>
                </Link>

                <Link
                  href="/"
                  scroll={false} // prevent default scroll
                  onClick={contactUsHandler}
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
                  } font-semibold text-sm border p-2 px-1 md:px-2.5 cursor-pointer rounded-xl hover:bg-red-600 hover:text-white transition duration-300 ease-out lg:px-5 2xl:px-8 border-red-600 tracking-normal lg:text-base xl:text-lg font-montserrat_bold flex items-center justify-center gap-1`}
                  onClick={handlePuzzleClick}
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

              <div className="" ref={dropdownRef} onMouseEnter={puzzleHover}>
                <button
                  className={`
                  bg-[#007EC6] text-white cursor-pointer font-bold px-1 md:px-2.5 rounded-xl lg:px-5 2xl:px-8 
                  tracking-wide text-sm lg:text-base font-montserrat_bold flex items-center justify-center whitespace-nowrap
                  relative overflow-hidden py-3
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
                  <span className="mr-2">Hardware Support</span>
                </button>
              </div>
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
                        className="flex font-semibold justify-between w-full"
                        onClick={() => setIsServicesOpen((prev) => !prev)}
                      >
                        Our Brands{" "}
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

                  <Link href={"/products"}>
                    <div className="relative px-5">
                      <p className="w-full font-semibold">Product </p>

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

                  <Link href={"/ourcompany"}>
                    <div className="relative px-5">
                      <p className="w-full font-semibold">Our Company </p>

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

                  <Link href={"/ourworks/"}>
                    <div className="relative px-5">
                      <p className="w-full font-semibold">Our Works</p>

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

                  <Link
                    href="/"
                    scroll={false} // prevent default scroll
                    onClick={contactUsHandler}
                    onMouseEnter={contactsHover}
                    onMouseLeave={() => setIsContactHover(false)}
                  >
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

                  <div className="w-full border-t-2 mb-2"></div>
                  <div className="mt-5 px-5 flex flex-col gap-4">
                    <div className="relative w-full" onMouseEnter={puzzleHover}>
                      <ButtonComponent
                        className={`group relative ${
                          isFixed ? "text-red-600" : "text-[#252324]"
                        } font-semibold border w-full p-4 px-1 md:px-2.5 cursor-pointer rounded-xl hover:bg-red-600 hover:text-white transition duration-300 ease-out lg:px-5 2xl:px-8 border-red-600 tracking-normal text-base xl:text-lg font-montserrat_bold flex items-center justify-center gap-1`}
                        onClick={handlePuzzleClick}
                      >
                        <PuzzleIcon
                          className={`w-4 h-4 xl:w-5 xl:h-5  ${
                            isFixed
                              ? "text-red-600"
                              : "text-[#252324] group-hover:text-white"
                          }`}
                        />
                        <span> Puzzles</span>
                      </ButtonComponent>
                    </div>

                    <ButtonComponent
                      className=" bg-black text-white font-bold p-4 md:text-base hover:opacity-80 transition w-full tracking-wide ease-in-out font-montserrat_bold duration-300 flex items-center justify-center gap-3"
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

      <ModalComponent
        isOpen={isModalOpen}
        onCloseHandler={() => {
          // setIsModalOpen(false);
          dispatch(setModalOpenState(!modalOpenState));
        }}
        header={
          <div className="relative flex-1 mb-5">
            <button
              onClick={() => setIsSupportModalOpen((prev) => !prev)}
              className="flex items-center gap-3 cursor-pointer px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200 group"
            >
              <span className="font-semibold text-gray-700">
                {selectedMenu}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isSupportModalOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSupportModalOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    disabled={item === selectedMenu}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      item === selectedMenu
                        ? "bg-blue-50 text-blue-600 cursor-not-allowed"
                        : "hover:bg-gray-50 text-gray-700 cursor-pointer"
                    } ${
                      index !== menuItems.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    {/* {getMenuIcon(item)} */}
                    <span className="font-medium">{item}</span>
                    {item === selectedMenu && (
                      <CheckCircle className="w-4 h-4 ml-auto text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        }
        body={
          <div className="space-y-8">
            {selectedMenu === "Service Request" ||
            selectedMenu === "Meter Read" ? (
              <>
                {/* Personal Information Section */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-10">
                  <div className="flex flex-col">
                    <label className="text-black font-bold mb-2 flex items-center gap-2">
                      <UserCircle className="w-4 h-4" />
                      <span>Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-black font-bold mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-black font-bold mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown} // Prevent non-numeric input
                      inputMode="numeric" // Shows numeric keypad on mobile
                      pattern="[0-9]*" // HTML5 pattern for numbers only
                      className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Service Request Fields */}
                  <div
                    ref={serviceFieldsRef}
                    style={{
                      display:
                        selectedMenu === "Service Request"
                          ? "contents"
                          : "none",
                    }}
                  >
                    <div className="flex flex-col form-field">
                      <label className="text-black font-bold mb-2 flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>Business Name</span>
                      </label>
                      <input
                        type="text"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleInputChange}
                        className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-all duration-300 hover:border-blue-400"
                      />
                    </div>

                    <div className="flex flex-col form-field">
                      <label className="text-black font-bold mb-2 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span>Machine ID</span>
                      </label>
                      <input
                        type="text"
                        name="machine_id"
                        value={formData.machine_id}
                        onChange={handleInputChange}
                        className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-all duration-300 hover:border-blue-400"
                      />
                    </div>

                    <div className="flex flex-col form-field">
                      <label className="text-black font-bold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Error Code</span>
                      </label>
                      <input
                        type="text"
                        name="error_code"
                        value={formData.error_code}
                        onChange={handleInputChange}
                        className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-all duration-300 hover:border-blue-400"
                      />
                    </div>
                  </div>
                  {selectedMenu === "Meter Read" && (
                    <div className="flex flex-col">
                      <label className="text-black font-bold mb-2 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span>ID Number/Serial Number</span>
                      </label>
                      <input
                        type="text"
                        name="serial_number"
                        value={formData.serial_number}
                        onChange={handleInputChange}
                        className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* Meter Read Fields */}
                {selectedMenu === "Meter Read" && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                      Meter Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                      <div className="flex flex-col">
                        <label className="text-black font-bold mb-2 flex items-center gap-2">
                          <Gauge className="w-4 h-4" />
                          <span>Meter 1</span>
                        </label>
                        <input
                          type="text"
                          name="meter_1"
                          value={formData.meter_1}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-black font-bold mb-2 flex items-center gap-2">
                          <Gauge className="w-4 h-4" />
                          <span>Meter 2</span>
                        </label>
                        <input
                          type="text"
                          name="meter_2"
                          value={formData.meter_2}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-black font-bold mb-2 flex items-center gap-2">
                          <Gauge className="w-4 h-4" />
                          <span>Meter 3</span>
                        </label>
                        <input
                          type="text"
                          name="meter_3"
                          value={formData.meter_3}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-black font-bold mb-2 flex items-center gap-2">
                          <Gauge className="w-4 h-4" />
                          <span>Meter 4</span>
                        </label>
                        <input
                          type="text"
                          name="meter_4"
                          value={formData.meter_4}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-black font-bold mb-2 flex items-center gap-2">
                          <Gauge className="w-4 h-4" />
                          <span>Meter 5</span>
                        </label>
                        <input
                          type="text"
                          name="meter_5"
                          value={formData.meter_5}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Message Field */}
                {selectedMenu === "Service Request" && (
                  <div className="flex flex-col">
                    <label className="text-black font-bold mb-2">Message</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project/ general enquiry..."
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <RemoteSupportComponent />
              </>
            )}
          </div>
        }
        footer={
          <div>
            {(selectedMenu === "Service Request" ||
              selectedMenu === "Meter Read") && (
              <div className="pt-10 ">
                <div className="w-full flex justify-end">
                  <button
                    disabled={isSubmitting}
                    className={` w-full lg:w-1/3 px-10 ${isSubmitting ? "cursor-not-allowed" : "cursor-allowed"} py-3 rounded-xl  bg-black text-white font-medium shadow-lg hover:shadow-2xl hover:shadow-black/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50`}
                    onClick={handleSubmitHander}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoaderComponent />
                        Sending...
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />
    </>
  );
};

export default NavigationDMTas;
