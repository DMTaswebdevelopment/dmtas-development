"use client";
import React from "react";

import { usePathname } from "next/navigation";
import VarietyFooter from "../layout/VarietyFooter";
import FooterDMTas from "../layout/FooterDMTas";

const FooterChecker = () => {
  const pathname = usePathname();
  const current = pathname.split("/").pop();
  return current == "variety" || current == "VarietyPuzzleMyPic" ? (
    <VarietyFooter></VarietyFooter>
  ) : (
    <FooterDMTas></FooterDMTas>
  );
};

export default FooterChecker;
