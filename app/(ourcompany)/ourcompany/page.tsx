"use client";

import React, { useEffect } from "react";
import MissionVisionComponent from "@/app/components/pages/ourcompany/MissionVisionComponent";
import OurCompanyComponent from "@/app/components/pages/ourcompany/OurCompanyComponent";
import OurCultureComponent from "@/app/components/pages/ourcompany/OurCultureComponent";
import OurTeamComponent from "@/app/components/pages/ourcompany/OurTeamComponent";

const OurCompany = () => {
  // ✅ Handle deep-link via #hash
  useEffect(() => {
    const hash = window.location.hash?.slice(1); // e.g., 'aboutus'
    if (!hash) return;

    // Small delay to ensure layout is ready
    const t = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Clean the URL (remove the #hash)
        const { pathname, search } = window.location;
        window.history.replaceState({}, "", pathname + search);
      }
    });

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <OurCompanyComponent />
      <MissionVisionComponent />
      <OurTeamComponent />
      <OurCultureComponent />
    </>
  );
};

export default OurCompany;
