"use client";
import React, { useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "@/app/functions/function";
import { TokenModel } from "@/app/model/interface/TokenModel";
import { jwtDecode } from "jwt-decode";
const VarietyNavigation = () => {
  const _token = getTokenFromLocalStorage() ?? "";
  const [backgroundColor, setBackgroundColor] = useState("");

  let userData: TokenModel | null = null;

  useEffect(() => {
    if (_token) {
      try {
        userData = jwtDecode<TokenModel>(_token);

        if (userData.claims.login_id === "DMTAS") {
          setBackgroundColor("bg-[#0089CF]");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        userData = null; // fallback
      }
    } else {
      console.log("No token found in localStorage");
    }
  }, [_token]);

  return (
    <nav
      className={`nav-bar ${backgroundColor} relative w-full z-20 font-montserrat flex px-10 items-center justify-between  min-h-14  4K:h-52 py-2`}
    >
      <div className="">Testing</div>
    </nav>
  );
};

export default VarietyNavigation;
