/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Link from "next/link";
import {
  MdEmail,
  MdOutlineSupportAgent,
  MdOutlineQuestionAnswer,
  MdOutlineFeedback,
  MdOutlineFacebook,
  MdOutlineChat,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { PiInstagramLogoDuotone } from "react-icons/pi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

const SupportLine: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Support Line – Contact
      </h1>
      <p className="text-lg text-center mb-8">
        J'adore IVC Support Line - We&apos;re Here to Help!
      </p>
      <p className="text-lg text-center mb-8">
        J'adoreIVC, Prioritize your experience and satisfaction. Whether
        you&apos;re planning your next adventure in Côte d&apos;Ivoire, need
        assistance with booking a tour, or have any inquiries, our support team
        is here to assist you every step of the way.
      </p>

      <h2 className="text-2xl font-bold text-center mb-4">How to Reach Us</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
        <div className="flex flex-col items-center gap-2">
          <MdEmail size={40} className="text-emerald-600" />
          <p className="font-semibold">Email:</p>
          <a href="mailto:Support@jadoreivc.com" className="text-blue-500">
            Support@jadoreivc.com
          </a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MdOutlinePhone size={40} className="text-emerald-600" />
          <p className="font-semibold">Office Hours:</p>
          <p>24/7</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BsFillChatDotsFill size={40} className="text-emerald-600" />
          <p className="font-semibold">Chat:</p>
          <p>Available on our website</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-lg text-center mb-8">
        Before reaching out, you might find answers to your questions in our FAQ
        section. We&apos;ve compiled a list of common inquiries to help you get
        the information you need quickly.
      </p>
      <Link href="/faq" className="text-blue-500 hover:underline">
        <MdOutlineQuestionAnswer size={24} className="inline-block mr-2" />
        View FAQ
      </Link>

      <h2 className="text-2xl font-bold text-center mb-4">
        What We Can Help With
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className="flex flex-col items-center gap-2">
          <MdOutlineSupportAgent size={40} className="text-emerald-600" />
          <p className="font-semibold">Tour Bookings:</p>
          <p>Assistance with selecting and booking the perfect tour.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MdOutlineLocationOn size={40} className="text-emerald-600" />
          <p className="font-semibold">Guide Information:</p>
          <p>Details about our local guides and their specialties.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MdOutlineChat size={40} className="text-emerald-600" />
          <p className="font-semibold">Payment Issues:</p>
          <p>
            Help with payment processes or resolving any transaction concerns.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MdOutlineFeedback size={40} className="text-emerald-600" />
          <p className="font-semibold">Technical Support:</p>
          <p>Assistance with navigating the J'adore IVC platform.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MdOutlineFeedback size={40} className="text-emerald-600" />
          <p className="font-semibold">Feedback:</p>
          <p>
            We value your input! Share your experiences or suggestions for
            improving our services.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">
        Connect with Us on Social Media
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
        <div className="flex flex-col items-center gap-2">
          <MdOutlineFacebook size={40} className="text-blue-600" />
          <p className="font-semibold">Facebook:</p>
          <a
            href="https://www.facebook.com/jadoreivc"
            className="text-blue-500"
          >
            jadoreivc
          </a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <PiInstagramLogoDuotone size={40} className="text-pink-500" />
          <p className="font-semibold">Instagram:</p>
          <a
            href="https://www.instagram.com/jadoreivc"
            className="text-blue-500"
          >
            @jadoreivc
          </a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaTiktok size={40} className="text-black" />
          <p className="font-semibold">TikTok:</p>
          <a href="https://www.tiktok.com/@jadoreivc" className="text-blue-500">
            @jadoreivc
          </a>
        </div>
      </div>

      <p className="text-lg text-center mb-4">
        We’re here to make your journey as smooth and enjoyable as possible.
      </p>
      <p className="text-lg text-center mb-8">
        Don’t hesitate to reach out—we’re just a call, email, or chat away!
      </p>
    </div>
  );
};

export default SupportLine;
