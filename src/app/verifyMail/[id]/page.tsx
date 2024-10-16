"use client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@/src/lib/utils";
import { IoCheckmarkCircle } from "react-icons/io5";

const VerifyEmail = ({ params }: { params: { id: string } }) => {
  const email = decodeURIComponent(params.id);
  console.log(email);
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) {
      setMessage("Email not found");
    }
    try {
      const response = await axiosInstance.post("api/users/auth/verify", {
        email,
        code: verificationCode,
      });

      setMessage(response.data.message);
      setTimeout(() => {
        window.location.href = "/logIn";
      }, 2000);
    } catch (error) {
      setMessage(`Verification Server Error`);
      console.error("Verification error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          A verification code has been sent to your email. Please enter it
          below:
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="verificationCode"
              className="block text-gray-700 font-medium mb-2"
            >
              Verification Code:
            </label>
            <input
              type="text"
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          {message !== "User verified successfully" ? (
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-800 transition duration-200"
            >
              Verify
            </button>
          ) : (
            <div className="w-full flex justify-center items-center">
              <IoCheckmarkCircle
                size={50}
                className="text-emerald-600 text-5xl"
              />
            </div>
          )}
          {message && (
            <p className="text-center text-emerald-700 font-bold mt-3">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
