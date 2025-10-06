"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/authContext";

export function useAdminAuth() {
  const { isLoggedIn } = useUser();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timer); // cleanup if component unmounts
  }, [isLoggedIn]);

  console.log("userRole", isLoggedIn);
  return {
    isLoading,
    isLoggedIn,
  };
}
