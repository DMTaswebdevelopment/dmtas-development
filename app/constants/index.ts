//assets
import Multifunction_Printers_Panel from "@/public/home_page/Multifunction_Printers_Panel_v3 (1).png";
import Digitisation_Panel from "@/public/home_page/Digitisation_Panel_v3.png";
import Digital_Print_Panel from "@/public/home_page/Digital_Print_Panel_v3.png";
import Signage_Panel from "@/public/home_page/Signage_Panel_v3.png";
import Embedded_Partnerships_Panel from "@/public/home_page/Embedded_Partnerships_Panel_v3.png";
import Just_Say_Cheese_Print_Panel from "@/public/home_page/Just_Say_Cheese_Print_Panel.png";
import { BookOpenText, Globe, Printer, LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import { ProductsMenuItem } from "../model/interface/ProductionsMenuItemType";

// Type definitions
interface DataItem {
  Header: string;
  path: string;
  subNavValue: string;
  text: string;
  hoveredText: string;
  textColor: string;
  Image: StaticImageData;
}

interface CardListItem {
  id: number;
  img_url: string;
  bg: string;
  description: string;
  icon?: LucideIcon;
  button_text: string;
  alt: string;
}

interface MissionListItem {
  header: string;
  desc: string;
  icon: LucideIcon;
}

// Data arrays with proper typing
const data: DataItem[] = [
  {
    Header: "Multifunction Printers",
    path: "/services/multifunctionPrinters/about/#top",
    subNavValue: "About Our Printers",
    text: "Reviewing designs has always been a challenge for Matt's business. The installation of a new wide format printer has seen his team producing high-quality, large-scale plans whenever are were required!",
    hoveredText:
      "Tasmania's largest provider of digital multifunction solutions.",
    textColor: "#0172B9",
    Image: Multifunction_Printers_Panel,
  },
  {
    Header: "Digitisation",
    path: "/services/digitisation/about/#top",
    subNavValue: "About Digitisation",
    text: "Boxes of unorganised business documents made Emma's day-to-day processes tedious and inefficient. Thanks to Acrodata, she now has access to everything in a digital format, right at her fingertips!",
    hoveredText:
      "Digitise your physical files, automate your workflow, and access your data from anywhere.",
    textColor: "#D40F14",
    Image: Digitisation_Panel,
  },
  {
    Header: "Digital Print",
    path: "/services/digitalPrint/about/#top",
    subNavValue: "About Digital Print",
    text: "Mia's in the zone coming up with another wild idea. Luckily for her, the team at The Print Division love the challenge of bringing her ideas to life, from design through to print!",
    hoveredText:
      "Business cards, books, posters, pull-up banners, brochures, flyers, graphic design and more!",
    textColor: "#EF6A0C",
    Image: Digital_Print_Panel,
  },
  {
    Header: "Signage",
    path: "/services/signage/about/#top",
    subNavValue: "About Our Signage",
    text: "Jacob's stunning vehicle wrap from Hobart Signwriters is sure to make an impact in his local market. If you didn't already know about his new business, you will soon!",
    hoveredText:
      "Vehicle wraps, digital signage indoor and outdoor signage, stickers, custom cutting and more!",
    textColor: "#2DAD39",
    Image: Signage_Panel,
  },
  {
    Header: "Embedded Partnerships",
    path: "/services/embeddedPartnerships/about/#top",
    subNavValue: "About Embedded Partnerships",
    text: "As an agricultural consultant, Daniel's passion is to assist farmers to achieve the maximum yield from their crops. The Embedded Partnership program has allowed him to get out of the office and back into his community!",
    hoveredText:
      "The strategic edge your business needs. Partial process integration to complete end-to-end solutions.",
    textColor: "#989B9A",
    Image: Embedded_Partnerships_Panel,
  },
  {
    Header: "LifesSize Jigsaws",
    path: "/services/lifeSizeJigsaw/about/#top",
    subNavValue: "About LifeSize Jigsaws",
    text: "Custom Jigsaw Puzzles Fun for all Ages!",
    hoveredText: "Custom Jigsaw Puzzles Fun for all Ages!",
    textColor: "#989B9A",
    Image: Just_Say_Cheese_Print_Panel,
  },
];

const productsMenu: ProductsMenuItem[] = [
  {
    id: 3,
    Header: "The Print Division Tasmania",
    subMenu: [
      {
        Header: "About Digital Print",
        path: "/services/digitalPrint/about/#top",
        subNavValue: "About Digital Print",
      },
      {
        Header: "Our Products",
        path: "/services/digitalPrint/products/#top",
        subNavValue: "Our Products",
      },
      {
        Header: "Self Serve Printing",
        path: "/services/digitalPrint/selfServePrinting/#top",
        subNavValue: "Self Serve Printing",
      },
    ],
    links: "/services/digitalPrint/about/#top",
  },
  {
    id: 0,
    Header: "Acrodata",
    subMenu: [
      {
        Header: "About Digitisation",
        path: "/services/digitisation/about",
        subNavValue: "About Digitisation",
      },
      {
        Header: "Our Services",
        path: "/services/digitisation/ourServices",
        subNavValue: "Our Services",
      },
      {
        Header: "Government Gazette",
        path: "/services/digitisation/governmentGazette/",
        subNavValue: "Government Gazette",
      },
      {
        Header: "Printed Legislation",
        path: "/services/digitisation/printedLegislation/#top",
        subNavValue: "Printed Legislation",
      },
    ],
    links: "/services/digitisation/about/#top",
  },
  {
    id: 4,
    Header: "Hobart Signwriters",
    subMenu: [
      {
        Header: "About Our Signage",
        path: "/services/signage/about/#top",
        subNavValue: "About Our Signage",
      },
      {
        Header: "Outdoor Signage",
        path: "/services/signage/outdoor/#top",
        subNavValue: "Outdoor Signage",
      },
      {
        Header: "Indoor Signage",
        path: "/services/signage/indoor/#top",
        subNavValue: "Indoor Signage",
      },
      {
        Header: "Vehicle Signage",
        path: "/services/signage/vehicle/#top",
        subNavValue: "Vehicle Signage",
      },
      {
        Header: "Digital Signage",
        path: "/services/signage/digital/#top",
        subNavValue: "Digital Signage",
      },
    ],
    links: "/services/signage/about/#top",
  },
];

const cardLists: CardListItem[] = [
  {
    id: 0,
    img_url:
      "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756789489/TPD_Colour_vuaww0.svg",
    bg: "bg-[#EEFF00]",
    description:
      "Through a unique combination of construction and design disciplines expertise, Concor and delivers world class",
    icon: Printer,
    button_text: "Shop Now",
    alt: "printdivision",
  },
  {
    id: 1,
    img_url:
      "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756945661/Acrodata_Colour_wd3yn5.svg",
    bg: "bg-[#F3070B]",
    button_text: "Learn More",
    description:
      "Through a unique combination of construction and design disciplines expertise, Concor and delivers world class",
    alt: "acrodata",
  },
  {
    id: 2,
    img_url:
      "https://res.cloudinary.com/dmz8tsndt/image/upload/v1756789666/HS_Colour_dso0qn.svg",
    description:
      "Through a unique combination of construction and design disciplines expertise, Concor and delivers world class",
    button_text: "Shop Now",
    bg: "bg-[#00D928]",
    alt: "hobart",
  },
];

const missionLists: MissionListItem[] = [
  {
    header: "Mission",
    desc: "To deliver innovative, smart, scalable and measurable value outcomes to Tasmanian businesses via a combination of our people, products, services and systems.",
    icon: Globe,
  },
  {
    header: "Vision",
    desc: "To become the single biggest supplier of business solutions, products, branding and services to the Tasmanian market across all sectors. To be the ONLY business partner, enabling our clients to have both economic, visual and strategic advantage.",
    icon: BookOpenText,
  },
];

export { data, productsMenu, cardLists, missionLists };

// Export types for use in other components
export type { DataItem, ProductsMenuItem, CardListItem, MissionListItem };
