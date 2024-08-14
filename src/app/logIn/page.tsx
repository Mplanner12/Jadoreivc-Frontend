"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/utils";
import { UserContext } from "../context/UserContex";
import { useContext } from "react";

const Page = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>("TOURIST");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState<string | null>("TOURIST"); // For react-hook-form
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // const currentUser = useContext(UserContext);

  const login = async (email: string, password: string, userType: string) => {
    try {
      const { data } = await axiosInstance.post("/api/users/auth/login", {
        email,
        password,
      });
      if (data.success === true) {
        setUser((user) => user);
        window.location.href = "/";
      }
    } catch (error: any) {
      // Handle the error response from the server
      if (error?.response && error?.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      console.error("Login failed", error);
    }
  };
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.id);
    setUserType(event.target.value); // Update the value for react-hook-form
    register("userType", {
      required: true,
      value: userType, // Use roleValue for registration
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: any) => {
    try {
      login(data.email, data.password, data.userType);
      // console.log(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-emerald-600 w-full h-full flex justify-center md:justify-between">
      <div
        id="loginContainer"
        className="bg-white w-full h-full flex flex-col justify-center items-center pt-[2rem] px-[2.35rem] md:px-[5.8rem] pb-[8rem]"
      >
        <div className="h-full mb-[1.85rem] md:mb-[4.5rem] w-full flex justify-center items-center">
          <h1 className="w-full h-full text-start text-emerald-600 text-[1.3rem] font-[500]">
            Jadoreivc
          </h1>
        </div>
        <div className="w-full py-[1rem] pb-2 px-[0.25rem] flex justify-center items-center">
          <h1 className="w-full text-start ml-[0.25rem] text-teal-950 text-[1.25rem] md:text-[1.5rem] font-semibold">
            Login to your Account
          </h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-none border-0"
          >
            <div className="w-full flex justify-between gap-3 py-[0.75rem] mb-[0.5rem] pr-[1rem] md:pr-0 items-center">
              <div
                id="roleContainer"
                className="shadow-sm w-fit gap-x-[1rem] flex justify-start items-center py-[1.2rem] px-[1rem] rounded-[0.5rem] border-2 active:border-emerald-600 hover:border-emerald-600 "
              >
                <input
                  style={{ transform: "scale(1.5)" }}
                  type="radio"
                  id="TOURIST"
                  className={`w-fit mr-1 p-0${
                    selectedRole === "TOURIST" ? "border-emerald-600" : ""
                  }`}
                  checked={selectedRole === "TOURIST"}
                  value="TOURIST"
                  onChange={handleRoleChange}
                />
                <label
                  htmlFor="tourist"
                  className={`w-[5rem] md:w-[12.85rem] text-gray-700 text-[0.75rem] md:text-[0.85rem]`}
                >
                  As a Tourist
                </label>
              </div>
              <div
                id="roleContainer"
                className="shadow-sm w-fit gap-x-[1rem] flex justify-start items-center py-[1.2rem] px-[1rem] rounded-[0.5rem] border-2 active:border-emerald-600 hover:border-emerald-600 "
              >
                <input
                  style={{ transform: "scale(1.5)" }}
                  type="radio"
                  id="TOUR_GUIDE"
                  className={`w-fit mr-1 ${
                    selectedRole === "TOUR_GUIDE" ? "bg-emerald-600" : ""
                  }`}
                  checked={selectedRole === "TOUR_GUIDE"}
                  onChange={handleRoleChange}
                  value="TOUR_GUIDE"
                />
                <label
                  htmlFor="guide"
                  className={`w-[5.75rem] md:w-[12.85rem] text-gray-700 text-[0.75rem] md:text-[0.85rem]`}
                >
                  As a Tour Guide
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-y-[0.85rem]">
              <div className="w-full h-fit flex flex-col justify-between">
                <label
                  className="py-[0.35rem] text-[0.8rem] text-gray-600"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="p-[0.7rem] shadow-sm rounded-lg border-2 hover:border-emerald-600 active:border-emerald-600 outline-emerald-600 text-[0.85rem]"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {/* Extract the error message from the FieldError object */}
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {`${errors.email.message}`}
                  </p>
                )}
              </div>
              <div className="w-full mb-[1.5rem] h-fit flex flex-col justify-between relative">
                <label
                  className="py-[0.35rem] text-[0.8rem] text-gray-600"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="p-[0.7rem] shadow-sm rounded-lg border-2 hover:border-emerald-600 active:border-emerald-600 outline-emerald-600 text-[0.85rem]"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {`${errors.password.message}`}
                  </p>
                )}
                <span
                  className="absolute right-4 top-[70%] -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <LuEye size={32} className="h-6 w-6 text-gray-500" />
                  ) : (
                    <LuEyeOff size={32} className="h-6 w-6 text-gray-500" />
                  )}
                </span>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
              <div className={`w-full h-full mt-[1.2rem]`}>
                <input
                  disabled={isSubmitting}
                  type="submit"
                  value="LOGIN"
                  className="w-full h-full p-[0.75rem] font-[500] text-[1.1rem] text-center bg-orange-400 rounded-full text-white"
                />
                <div className="mt-[1.9rem] flex justify-center items-center">
                  <Link href={"/signUp"}>
                    <p className="text-[0.75rem]">
                      Dont have an account?
                      <span className="text-emerald-600 font-[500]">
                        Sign Up
                      </span>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        id="green"
        className="hidden md:flex w-full h-full bg-inherit fill-emerald-600"
      ></div>
    </div>
  );
};

export default Page;
