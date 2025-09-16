import React, { useRef, useState } from "react";
import { Mail, Phone, UserCircle, ChevronDown, Building2 } from "lucide-react";
import Image from "next/image";

interface FormData {
  brand: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const InquirySection: React.FC = () => {
  const inquiryRef = useRef<HTMLDivElement>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const brands: string[] = [
    "The Print Division Tasmania",
    "Acrodata",
    "Hobart Signwriters",
  ];

  const handleBrandSelect = (brand: string): void => {
    setSelectedBrand(brand);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (): void => {
    alert(`Form submitted for ${selectedBrand || "General Inquiry"}!`);
  };

  return (
    <div id="inquiry-section" ref={inquiryRef} className="min-h-screen w-full">
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
                    className="w-full border-b-2 border-gray-200 bg-transparent pb-2 text-left focus:border-black focus:outline-none transition-colors flex justify-between items-center"
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

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10">
                      {brands.map((brand: string, index: number) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleBrandSelect(brand)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md"
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
                    <span>First Name</span>
                  </label>
                  <input
                    type="text"
                    className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-black font-bold mb-2 flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    <span>Last Name</span>
                  </label>
                  <input
                    type="text"
                    className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                  />
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
                    className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-black font-bold mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="flex flex-col">
                <label className="text-black font-bold mb-2">Message</label>
                <textarea
                  rows={5}
                  className="border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project/ general enquiry..."
                />
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <button
                className="bg-black text-white w-full sm:w-52 py-3 px-8 font-bold cursor-pointer rounded-full hover:bg-gray-800 transition-colors"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquirySection;
