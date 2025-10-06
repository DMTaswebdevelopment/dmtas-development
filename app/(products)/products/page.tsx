"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import Apeos_4020SD from "@/public/products/Apeos_4020SD-2-removebg-preview.png";
import Apeos_C325 from "@/public/products/Apeos_C325_-1-removebg-preview.png";
import Apeos_C3061 from "@/public/products/Apeos_C3061-1-removebg-preview.png";
import Apeos_C3530_01 from "@/public/products/Apeos_C3530-1-removebg-preview.png";
import Apeos_C3530_02 from "@/public/products/Apeos_C3530-2-removebg-preview.png";
import Apeos_C3567_1 from "@/public/products/Apeos_C3567-1-removebg-preview.png";
import Apeos_C3567_2 from "@/public/products/Apeos_C3567-2-removebg-preview.png";
import Apeos_C4030 from "@/public/products/Apeos_C4030-removebg-preview.png";
import Apeos_C7071 from "@/public/products/Apeos_C7071-1-removebg-preview.png";
import ModalComponent from "@/app/components/template/ModalComponent/ModalComponent";

const Products = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  interface DetailsModel {
    full_description: string;
    print_speed: string;
    print_resolution: string;
    paper_capacity: string;
    connectivity: string;
    functions: string[];
    monthly_duty: string;
    dimensions: string;
    weight: string;
  }

  interface ProductsType {
    id: number;
    name: string;
    category: string;
    description: string;
    speed: string;
    image: string | StaticImageData; // allow both
    isNew: boolean;
    inStock: boolean;
    details?: DetailsModel;
  }

  const products: ProductsType[] = [
    {
      id: 1,
      name: "Apeos 4020SD",
      category: "lexmark",
      description: "A4 Colour Multifunction",
      speed: "Print speed: 33ppm",
      image: Apeos_4020SD,
      isNew: true,
      inStock: true,
      details: {
        full_description:
          "Compact A4 color multifunction printer designed for small to medium workgroups with high-quality output and efficient performance.",
        print_speed: "33 pages per minute (Color & B/W)",
        print_resolution: "1200 x 1200 dpi",
        paper_capacity: "550 sheets standard, 2,300 sheets maximum",
        connectivity: "USB, Ethernet, Wi-Fi",
        functions: ["Print", "Copy", "Scan", "Fax"],
        monthly_duty: "Up to 80,000 pages",
        dimensions: "450 x 550 x 600 mm",
        weight: "45 kg",
      },
    },
    {
      id: 2,
      name: "Apeos C325",
      category: "ricoh",
      description: "A3 Colour Multifunction",
      speed: "Print speed: 20ppm",
      image: Apeos_C325,
      isNew: true,
      inStock: true,
      details: {
        full_description:
          "Entry-level A3 color multifunction device perfect for small offices requiring occasional large format printing with reliable performance.",
        print_speed: "20 pages per minute (Color & B/W)",
        print_resolution: "1200 x 2400 dpi",
        paper_capacity: "650 sheets standard, 1,650 sheets maximum",
        connectivity: "USB, Ethernet, Wi-Fi, NFC",
        functions: ["Print", "Copy", "Scan", "Fax (Optional)"],
        monthly_duty: "Up to 50,000 pages",
        dimensions: "580 x 650 x 700 mm",
        weight: "65 kg",
      },
    },
    {
      id: 3,
      name: "Apeos C3061",
      category: "ricoh",
      description: "A3 Colour Multifunction",
      speed: "Print speed: 30ppm",
      image: Apeos_C3061,
      isNew: true,
      inStock: true,
      details: {
        full_description:
          "Mid-range A3 color multifunction printer offering enhanced productivity features with superior color accuracy for professional documents.",
        print_speed: "30 pages per minute (Color & B/W)",
        print_resolution: "1200 x 2400 dpi",
        paper_capacity: "1,150 sheets standard, 3,650 sheets maximum",
        connectivity: "USB, Ethernet, Wi-Fi, NFC, Cloud",
        functions: ["Print", "Copy", "Scan", "Fax"],
        monthly_duty: "Up to 100,000 pages",
        dimensions: "615 x 685 x 780 mm",
        weight: "98 kg",
      },
    },
    {
      id: 4,
      name: "Apeos C3530 v1",
      category: "ricoh",
      description: "A3 Colour Multifunction",
      speed: "Print speed: 45ppm",
      image: Apeos_C3530_01,
      isNew: false,
      inStock: false,
      details: {
        full_description:
          "Previous generation high-speed A3 color multifunction device with robust performance capabilities for demanding office environments.",
        print_speed: "45 pages per minute (Color & B/W)",
        print_resolution: "1200 x 2400 dpi",
        paper_capacity: "1,150 sheets standard, 4,700 sheets maximum",
        connectivity: "USB, Ethernet, Wi-Fi",
        functions: ["Print", "Copy", "Scan", "Fax"],
        monthly_duty: "Up to 150,000 pages",
        dimensions: "615 x 735 x 815 mm",
        weight: "125 kg",
      },
    },
    {
      id: 5,
      name: "Apeos C3530 v2",
      category: "ricoh",
      description: "A3 Colour Multifunction",
      speed: "Print speed: 45ppm",
      image: Apeos_C3530_02,
      isNew: true,
      inStock: true,
      details: {
        full_description:
          "Updated high-speed A3 color multifunction printer with enhanced cloud connectivity and improved energy efficiency for modern workplaces.",
        print_speed: "45 pages per minute (Color & B/W)",
        print_resolution: "1200 x 2400 dpi",
        paper_capacity: "1,150 sheets standard, 4,700 sheets maximum",
        connectivity: "USB, Ethernet, Wi-Fi, NFC, Cloud Services",
        functions: ["Print", "Copy", "Scan", "Fax", "Cloud Integration"],
        monthly_duty: "Up to 150,000 pages",
        dimensions: "615 x 735 x 815 mm",
        weight: "125 kg",
      },
    },
    {
      id: 6,
      name: "Apeos_C3567_1",
      category: "ricoh",
      description: "A3 Colour Multifunction",
      speed: "Print speed: 45ppm",
      image: Apeos_C3567_1,
      isNew: true,
      inStock: true,
      details: {
        full_description:
          "Professional-grade A3 color multifunction system with advanced finishing options and exceptional color reproduction for creative workflows.",
        print_speed: "45 pages per minute (Color & B/W)",
        print_resolution: "1200 x 2400 dpi",
        paper_capacity: "1,150 sheets standard, 4,700 sheets maximum",
        connectivity: "USB, Ethernet, Wi-Fi, NFC, Cloud, Mobile Print",
        functions: ["Print", "Copy", "Scan", "Fax", "Advanced Finishing"],
        monthly_duty: "Up to 180,000 pages",
        dimensions: "615 x 735 x 815 mm",
        weight: "130 kg",
      },
    },
    {
      id: 7,
      name: "Apeos_C3567_2",
      category: "ricoh",
      description: "A3 Colour Multifunction",
      speed: "Print speed: 45ppm",
      image: Apeos_C3567_2,
      isNew: true,
      inStock: true,
      details: {
        full_description:
          "Premium edition with enhanced security features and expanded paper handling for enterprises requiring maximum reliability and performance.",
        print_speed: "45 pages per minute (Color & B/W)",
        print_resolution: "1200 x 2400 dpi",
        paper_capacity: "1,150 sheets standard, 5,700 sheets maximum",
        connectivity:
          "USB, Ethernet, Wi-Fi, NFC, Cloud, Mobile Print, Security Features",
        functions: [
          "Print",
          "Copy",
          "Scan",
          "Fax",
          "Advanced Finishing",
          "Secure Print",
        ],
        monthly_duty: "Up to 200,000 pages",
        dimensions: "615 x 735 x 815 mm",
        weight: "135 kg",
      },
    },
    {
      id: 8,
      name: "Apeos_C4030",
      category: "ricoh",
      description: "A3 Colour Multifunction",
      speed: "Print speed: 45ppm",
      image: Apeos_C4030,
      isNew: true,
      inStock: true,
      details: {
        full_description:
          "High-performance A3 color multifunction printer with intelligent workflow automation and exceptional media handling capabilities.",
        print_speed: "45 pages per minute (Color & B/W)",
        print_resolution: "1200 x 2400 dpi",
        paper_capacity: "1,200 sheets standard, 5,200 sheets maximum",
        connectivity: "USB, Ethernet, Wi-Fi, NFC, Cloud Services, Mobile Print",
        functions: ["Print", "Copy", "Scan", "Fax", "Workflow Automation"],
        monthly_duty: "Up to 175,000 pages",
        dimensions: "625 x 745 x 825 mm",
        weight: "140 kg",
      },
    },
    {
      id: 9,
      name: "Apeos_C7071",
      category: "ricoh",
      description: "A3 Colour Multifunction",
      speed: "Print speed: 45ppm",
      image: Apeos_C7071,
      isNew: true,
      inStock: true,
      details: {
        full_description:
          "Premium production-level A3 color multifunction system designed for high-volume printing with professional finishing and outstanding image quality.",
        print_speed: "70 pages per minute (Color & B/W)",
        print_resolution: "1200 x 2400 dpi",
        paper_capacity: "1,500 sheets standard, 6,500 sheets maximum",
        connectivity:
          "USB, Ethernet, Wi-Fi, NFC, Cloud Services, Fiery Controller",
        functions: [
          "Print",
          "Copy",
          "Scan",
          "Fax",
          "Professional Finishing",
          "Color Management",
        ],
        monthly_duty: "Up to 300,000 pages",
        dimensions: "700 x 850 x 950 mm",
        weight: "180 kg",
      },
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<ProductsType>();
  interface DetailRowProps {
    label: string;
    value: string | React.ReactNode;
  }
  console.log("selectedProduct", selectedProduct);
  // ✅ FIX: accept a single product, not an array
  const showDetailsHandler = (product: ProductsType) => {
    console.log("product", product);
    setIsModalOpen(true);
    setSelectedProduct(product);
    // e.g., open a modal, set state, route, etc.
  };

  const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row gap-2 py-3 border-b border-gray-100 last:border-0">
      <span className="font-montserrat_bold text-gray-700 min-w-[140px]">
        {label}
      </span>
      <span className="text-gray-600 flex-1">{value}</span>
    </div>
  );

  return (
    <>
      <div className="bg-gray-50 relative">
        <div className="relative w-full h-full">
          {/* Main section with image */}
          <div className="main_div flex justify-center h-96 items-center relative overflow-hidden">
            <img
              src="https://res.cloudinary.com/dmz8tsndt/image/upload/v1739514761/AdobeStock_517386567_1_sg4b3w.png"
              alt="multifunction_main_image"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out"
            />
            {/* 
          <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}

            <div className="text-white left-[6%] top-[25%] absolute z-10 transform animate-fadeInUp">
              <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                Our Products
              </h1>
              <p className="text-sm md:text-xl opacity-90 drop-shadow-md">
                Tasmania's largest provider of digital multifunction <br />
                solutions
              </p>
            </div>
          </div>
        </div>

        <div className="px-7 sm:px-10 2xl:p-28">
          <div className="flex gap-8">
            {/* Products Grid */}
            <div className="flex-1">
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {products.map((product, index) => (
                  <div
                    onClick={() => showDetailsHandler(product)}
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out group transform hover:scale-[1.02]"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <div className="w-full h-64 p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                          height={300}
                          width={300}
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </div>

                      {product.isNew && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          NEW
                        </span>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6 relative">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {product.name}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm mb-2 font-medium">
                        {product.description}
                      </p>
                      <p className="text-gray-500 text-sm mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:bg-blue-600 transition-colors duration-300"></span>
                        {product.speed}
                      </p>
                    </div>

                    {/* Animated border effect */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }
        `}</style>
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        onCloseHandler={() => setIsModalOpen(false)}
        header={
          <div className="relative rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4">
            <h3 className="text-center font-montserrat_bold text-3xl text-white">
              Product Details
            </h3>
          </div>
        }
        body={
          <div className="overflow-y-auto p-4">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Image Section */}
              <div className="md:col-span-2 gap-10 flex flex-col">
                <div className="w-full h-64 p-6 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative">
                  <Image
                    src={selectedProduct?.image || ""}
                    alt={selectedProduct?.name || ""}
                    className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    height={300}
                    width={300}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <h4 className="text-xl font-montserrat_bold text-gray-800 text-center">
                    {selectedProduct?.name}
                  </h4>
                </div>

                {/* Description Highlight */}
                <div className="mb-6 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                  <h5 className="font-montserrat_bold text-gray-800 mb-2">
                    Description
                  </h5>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProduct?.details?.full_description}
                  </p>
                </div>
              </div>

              {/* Details Section */}
              <div className="md:col-span-3">
                <div className="bg-white rounded-xl">
                  {/* Specifications Grid */}
                  <div className="space-y-1">
                    <h5 className="font-montserrat_bold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                      Specifications
                    </h5>

                    <DetailRow
                      label="Print Speed"
                      value={selectedProduct?.details?.print_speed}
                    />
                    <DetailRow
                      label="Resolution"
                      value={selectedProduct?.details?.print_resolution}
                    />
                    <DetailRow
                      label="Paper Capacity"
                      value={selectedProduct?.details?.paper_capacity}
                    />
                    <DetailRow
                      label="Connectivity"
                      value={selectedProduct?.details?.connectivity}
                    />
                    <DetailRow
                      label="Functions"
                      value={
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct?.details?.functions.map(
                            (func: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                              >
                                {func}
                              </span>
                            )
                          )}
                        </div>
                      }
                    />
                    <DetailRow
                      label="Monthly Duty Cycle"
                      value={selectedProduct?.details?.monthly_duty}
                    />

                    {/* Physical Specs */}
                    <div className="mt-6 pt-4 border-t-2 border-gray-200">
                      <h6 className="font-montserrat_bold text-gray-700 mb-3">
                        Physical Specifications
                      </h6>
                      <DetailRow
                        label="Dimensions"
                        value={selectedProduct?.details?.dimensions}
                      />
                      <DetailRow
                        label="Weight"
                        value={selectedProduct?.details?.weight}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          // <div className="flex mt-10 space-x-10">
          //   <Image
          //     src={selectedProduct?.image || ""}
          //     alt={selectedProduct?.name || ""}
          //     className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
          //     height={300}
          //     width={300}
          //   />
          //   <div className="flex flex-col space-y-3 text-sm">
          //     <div className="">
          //       <span className="font-montserrat_bold">Name: </span>
          //       {selectedProduct?.name}
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Description: </span>
          //       {selectedProduct?.details?.full_description}
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Print Speed: </span>
          //       {selectedProduct?.details?.print_speed}
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Resolution: </span>
          //       {selectedProduct?.details?.print_resolution}
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Capacity: </span>
          //       {selectedProduct?.details?.paper_capacity}
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Connectivity: </span>
          //       {selectedProduct?.details?.connectivity}
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Functions: </span>
          //       <span>{selectedProduct?.details?.functions?.join(", ")}</span>
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Monthly Duty: </span>
          //       {selectedProduct?.details?.monthly_duty}
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Dimensions: </span>
          //       {selectedProduct?.details?.dimensions}
          //     </div>
          //     <div className="">
          //       <span className="font-montserrat_bold">Weight: </span>
          //       {selectedProduct?.details?.weight}
          //     </div>
          //   </div>
          // </div>
        }
      />
    </>
  );
};

export default Products;
