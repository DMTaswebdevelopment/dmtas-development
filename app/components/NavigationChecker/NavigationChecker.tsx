"use client";
import React from "react";

import { usePathname } from "next/navigation";
import NavigationDMTas from "../layout/NavigationDMTas";
import VarietyNavigation from "../layout/VarietyNavigation";

const NavigationChecker = () => {
  const pathname = usePathname();

  const isPuzzle = pathname.startsWith("/puzzle/variety");

  return isPuzzle ? (
    <VarietyNavigation></VarietyNavigation>
  ) : (
    <NavigationDMTas></NavigationDMTas>
  );
};

export default NavigationChecker;
