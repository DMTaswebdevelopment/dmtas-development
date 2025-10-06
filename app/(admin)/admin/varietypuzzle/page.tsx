"use client";

import { auth, db } from "@/app/lib/firebase";
import DMTasLogoShield from "@/public/dmtas_assets/DMTas_Logomark_Colour.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Lock, UserCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const VarietyPuzzle = () => {
  interface LoginFormDataType {
    login_id: string;
    password: string;
  }
  const [errors, setErrors] = useState<Partial<LoginFormDataType>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // form state start
  const [formData, setFormData] = useState<LoginFormDataType>({
    login_id: "",
    password: "",
  });

  console.log("formData", formData);
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

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormDataType> = {};

    if (!formData.login_id.trim()) {
      newErrors.login_id = "Login ID is required";
    } else if (formData.login_id.length < 3) {
      newErrors.login_id = "Login ID must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if login_id already exists
  const checkLoginIdExists = async (loginId: string): Promise<boolean> => {
    try {
      const q = query(
        collection(db, "users"),
        where("login_id", "==", loginId)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking login ID:", error);
      return false;
    }
  };

  const createAccountHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if login_id already exists
      const loginIdExists = await checkLoginIdExists(formData.login_id);
      if (loginIdExists) {
        setErrors({ login_id: "This Login ID is already taken" });
        setIsSubmitting(false);
        return;
      }

      // Call your signup API endpoint instead of Firebase directly
      const response = await fetch("/api/auth/variety/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id: formData.login_id,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.field) {
          setErrors({ [result.field]: result.message });
        } else {
          alert(result.message || "Failed to create account");
        }
        return;
      }

      // Success
      alert("Account created successfully!");

      // Reset form
      setFormData({ login_id: "", password: "" });

      // You can redirect to login page here
      // router.push('/login');
    } catch (error: any) {
      console.error("Account creation failed:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <Image
            alt="DMTas_logo"
            src={DMTasLogoShield}
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-10 text-center font-montserrat_bold text-2xl/9 font-bold tracking-tight text-black">
            Create An Account
          </h2>
        </div>

        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-lg font-sans">
          <form
            onSubmit={createAccountHandler}
            method="POST"
            className="space-y-10"
          >
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
                Create an Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VarietyPuzzle;
