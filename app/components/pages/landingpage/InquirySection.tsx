"use client";

import React, { useRef, useState } from "react";
import {
  Mail,
  Phone,
  UserCircle,
  ChevronDown,
  Building2,
  Building,
} from "lucide-react";
import Image from "next/image";
import { sendEmail } from "@/app/functions/API";
import {
  ParsedData,
  RequestData,
  UserDetails,
} from "@/app/model/interface/RequestDataType";
import ToasterComponent from "../../template/ToastMessageComponent/ToastMessageComponent";
import LoaderComponent from "../../template/LoaderComponent/LoaderComponent";

interface FormData {
  brand: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const InquirySection: React.FC = () => {
  const inquiryRef = useRef<HTMLDivElement>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");

  // Form state
  const [formData, setFormData] = useState<FormData>({
    brand: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  // Form validation errors
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const brands: string[] = [
    "The Print Division Tasmania",
    "Acrodata",
    "Hobart Signwriters",
  ];
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

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.brand) newErrors.brand = "Please select a brand";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBrandSelect = (brand: string): void => {
    setSelectedBrand(brand);
    setFormData((prev) => ({ ...prev, brand: brand }));

    setIsDropdownOpen(false);

    // Clear brand error if it exists
    if (errors.brand) {
      setErrors((prev) => ({ ...prev, brand: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const formValues: UserDetails = {
        Name: formData.name,
        Company: formData.company,
        Email: formData.email,
        Phone: formData.phone,
        Message: formData.message,
        Brand: formData.brand,
      };

      // Provide parsedData - adjust these values as needed for your use case
      const parsedData: ParsedData = {
        email: formData.email,
        title: `${formData.brand}`,
      };

      const requestData: RequestData = {
        formValues,
        parsedData,
      };

      sendEmail(requestData).then((response) => {
        if (response.statusCode === 200) {
          setShowToast(true);
          setTitle("Success");
          setMessage("Your inquiry has been submitted successfully.");
          setToastType("success");
          setTimeout(() => {
            setShowToast(false);
            setIsSubmitting(false);
            // Reset form
            setFormData({
              brand: "",
              name: "",
              company: "",
              email: "",
              phone: "",
              message: "",
            });
            setSelectedBrand("");
          }, 3000);
        } else {
          setShowToast(true);
          setTitle("Error");
          setMessage(
            "There was an issue submitting the form. Please try again."
          );
          setToastType("error");
          setTimeout(() => {
            setIsSubmitting(false);
            setShowToast(false);
            // Reset form
            setFormData({
              brand: "",
              name: "",
              company: "",
              email: "",
              phone: "",
              message: "",
            });
            setSelectedBrand("");
          }, 3000);
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div id="inquiry-section" ref={inquiryRef} className="min-h-screen w-full">
      <ToasterComponent
        isOpen={showToast}
        title={title}
        message={message}
        onClose={setShowToast}
        type={toastType}
      />
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Images */}
        <div className="w-full lg:w-1/2 bg-blue-300/10 p-4 sm:p-8 flex flex-col gap-6 sm:gap-10 items-center justify-center relative min-h-[50vh] lg:min-h-screen">
          <div className="h-60 w-full sm:h-72 lg:h-96 lg:w-80 xl:w-[60%] lg:absolute lg:left-16">
            <Image
              src="https://res.cloudinary.com/dmz8tsndt/image/upload/v1757020546/geri-sakti-CYrYxz-uvE4-unsplash_rrpxcp.jpg"
              className="object-cover h-full w-full rounded-xl"
              height={400}
              width={600}
              alt="inquire_image1"
            />
          </div>

          {/* second image */}
          <div className="h-60 w-full sm:h-72 lg:h-96 lg:absolute lg:top-16 lg:left-64 xl:left-96 xl:top-12 lg:w-72 2xl:left-[70%] rounded-xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dmz8tsndt/image/upload/v1757045095/man-working-printing-house-with-paper-paints_lhheeq.jpg"
              className="object-cover h-full w-full"
              height={400}
              width={600}
              alt="inquire_image2"
            />
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="w-full lg:w-1/2 bg-gradient-to-l from-gray-50 to-white p-4 sm:p-8 lg:p-16 flex flex-col justify-center min-h-[50vh] lg:min-h-screen">
          <div className="w-full max-w-xl lg:ml-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 font-monserrat_bold">
              Let&apos;s Get in Touch
            </h2>
            <p className="text-gray-800 mb-6 sm:mb-8 font-sans">
              Your email address will not be published.
            </p>

            <div className="space-y-4 sm:space-y-6 font-sans tracking-wide">
              {/* Brand Selection Dropdown */}
              <div className="flex flex-col">
                <label className="text-black font-bold mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Select Brand</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full border-b-2 cursor-pointer ${
                      errors.brand ? "border-red-500" : "border-gray-200"
                    }  bg-transparent pb-2 text-left focus:border-black focus:outline-none transition-colors flex justify-between items-center`}
                  >
                    <span
                      className={selectedBrand ? "text-black" : "text-gray-500"}
                    >
                      {selectedBrand || "Choose a brand or division"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {errors.brand && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                  )}

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10">
                      {brands.map((brand: string, index: number) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleBrandSelect(brand)}
                          className="w-full text-left px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md"
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    className={`border-b-2 ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } bg-transparent pb-2 focus:border-black focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-black font-bold mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>Company</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`border-b-2 ${
                      errors.company ? "border-red-500" : "border-gray-200"
                    } bg-transparent pb-2 focus:border-black focus:outline-none transition-colors`}
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    className={`border-b-2 ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } bg-transparent pb-2 focus:border-black focus:outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-black font-bold mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Prevent non-numeric input
                    inputMode="numeric" // Shows numeric keypad on mobile
                    pattern="[0-9]*" // HTML5 pattern for numbers only
                    className={`border-b-2 ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    } bg-transparent pb-2 focus:border-black focus:outline-none transition-colors`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="flex flex-col">
                <label className="text-black font-bold mb-2">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`border-b-2 ${
                    errors.message ? "border-red-500" : "border-gray-200"
                  } bg-transparent pb-2 focus:border-black focus:outline-none transition-colors`}
                  placeholder="Tell us about your project/ general enquiry..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <button
                disabled={isSubmitting}
                type="submit"
                className={`bg-black text-white ${isSubmitting ? "cursor-not-allowed" : " cursor-pointer "} w-full sm:w-52 py-3 px-8 font-bold rounded-xl  shadow-lg hover:shadow-2xl hover:shadow-black/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50`}
                onClick={handleSubmit}
              >
                {isSubmitting && <LoaderComponent />}

                {!isSubmitting ? "Submit" : "Sending..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquirySection;
