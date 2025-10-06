"use client";

import React from "react";
import LoginComponent from "@/app/components/pages/varietypuzzle/login/LoginComponent";
import { useUser } from "@/app/context/authContext";

const Login = () => {
  const { isLoggedIn } = useUser();

  console.log("isLoggedIn", isLoggedIn);
  return (
    <div className="h-full relative">
      <LoginComponent />
    </div>
  );
};

export default Login;
