"use client";
import React from "react";
import { motion } from "framer-motion";

interface UnderAnimationComponentProps {
  isHover: boolean;
}

const UnderAnimationComponent: React.FC<UnderAnimationComponentProps> = ({
  isHover,
}) => {
  return (
    <motion.hr
      className="absolute bg-black h-1 rounded-full"
      animate={{
        width: isHover ? "100%" : "0%",
        opacity: isHover ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  );
};

export default UnderAnimationComponent;
