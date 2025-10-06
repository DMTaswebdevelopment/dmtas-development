"use client";

import { useUser } from "@/app/context/authContext";
import {
  createVarietyPuzzleAccount,
  loginVarietyPuzzleAccount,
} from "@/app/functions/API";
import { LoginResponseType } from "@/app/model/interface/LoginResponseType";
import DMTasLogoShield from "@/public/dmtas_assets/DMTas_Logomark_Colour.svg";
import { Lock, UserCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const { login, isLoggedIn } = useUser();

  interface LoginFormDataType {
    login_id: string;
    password: string;
  }
  const router = useRouter();

  const [errors, setErrors] = useState<Partial<LoginFormDataType>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // form state start
  const [formData, setFormData] = useState<LoginFormDataType>({
    login_id: "",
    password: "",
  });

  // Redirects to /puzzle/variety if the user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/puzzle/variety");
    }
  }, [isLoggedIn]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof LoginFormDataType]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Basic validation
    const newErrors: Partial<LoginFormDataType> = {};

    if (!formData.login_id.trim()) {
      newErrors.login_id = "Login ID is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const data = {
        login_id: formData.login_id,
        password: formData.password,
      };

      const response = await loginVarietyPuzzleAccount(data);

      const result = response;
      console.log("response", response);

      const User = {
        user_role: "dmtas_user",
      };
      if (response.statusCode === 200) {
        if (response.customToken) {
          localStorage.setItem("auth_token", response.customToken);
        }

        login(User);

        setTimeout(() => {
          router.push("/puzzle/variety");
        }, 3000);
      } else {
        // Handle different error types

        setErrors({ login_id: result.message || "Login failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        login_id: "An error occurred during login. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col items-center  bg justify-center px-6 py-12 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <Image
            alt="DMTas_logo"
            src={DMTasLogoShield}
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-10 text-center font-montserrat_bold text-2xl/9 font-bold tracking-tight text-black">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-lg font-sans">
          <form onSubmit={loginHandler} method="POST" className="space-y-10">
            <div className="flex flex-col">
              <label className="text-black font-bold mb-2 flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                <span>Login ID:</span>
              </label>
              <input
                type="text"
                name="login_id"
                value={formData.login_id}
                onChange={handleInputChange}
                className={`border-b-2 ${
                  errors.login_id ? "border-red-500" : "border-gray-200"
                } bg-transparent pb-2 focus:border-black focus:outline-none transition-colors`}
              />
              {errors.login_id && (
                <p className="text-red-500 text-sm mt-1">{errors.login_id}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-black font-bold mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Password:</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`border-b-2 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } bg-transparent pb-2 focus:border-black focus:outline-none transition-colors`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                // onClick={loginHandler}
                className={`bg-black text-white ${isSubmitting ? "cursor-not-allowed" : " cursor-pointer "} w-full py-3 px-8 font-bold rounded-xl  shadow-lg hover:shadow-2xl hover:shadow-black/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50`}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
