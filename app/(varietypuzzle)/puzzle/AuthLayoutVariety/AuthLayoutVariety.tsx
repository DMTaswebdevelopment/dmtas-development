"use client";

import { useAdminAuth } from "@/app/auth/authVariety";
import RedirectComponent from "@/app/components/routes/RedirectComponent/RedirectComponent";
import FullPageLoaderComp from "@/app/components/ui/FullPageLoaderComp/FullPageLoaderComp";

interface AuthLayoutVarietyProps {
  children: React.ReactNode;
}

export default function AuthLayoutVariety({
  children,
}: AuthLayoutVarietyProps) {
  const { isLoggedIn, isLoading } = useAdminAuth();

  console.log("isUserLogin", isLoggedIn);

  // if (isLoading) {
  //   return <FullPageLoaderComp />;
  // }

  // // If not logged in → show RedirectComponent
  // if (!isLoggedIn) {
  //   return <RedirectComponent />;
  // }

  // If logged in → render protected content
  return <>{children}</>;
}
