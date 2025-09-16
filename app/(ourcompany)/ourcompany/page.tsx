"use client";

import React from "react";
import MissionVisionComponent from "@/app/components/pages/ourcompany/MissionVisionComponent";
import OurCompanyComponent from "@/app/components/pages/ourcompany/OurCompanyComponent";
import OurCultureComponent from "@/app/components/pages/ourcompany/OurCultureComponent";
import OurTeamComponent from "@/app/components/pages/ourcompany/OurTeamComponent";

const page = () => {
  return (
    <>
      <OurCompanyComponent />
      <MissionVisionComponent />
      <OurTeamComponent />
      <OurCultureComponent />
    </>
  );
};

export default page;
