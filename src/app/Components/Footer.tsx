import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { PiInstagramLogo } from "react-icons/pi";
import { IoLogoTiktok } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-full bg-emerald-600 flex flex-col justify-between items-center py-[2.75rem] px-[2.25rem] md:px-[5.5rem] md:py-[3rem]">
      <div className="w-full h-full flex flex-col md:flex-row justify-center md:justify-between md:items-center gap-y-[3.25rem] md:gap-y-0">
        <h1 className="text-start text-white text-2xl font-bold">Jadoreivc</h1>
        <div className="w-fit flex justify-center items-center mt-[1rem] gap-x-[1.85rem] pl-[1rem] md:pl-0">
          {/* Responsive Social Media Icons */}
          <div className="bg-orange-400 rounded-full relative">
            <FaFacebook
              size={20}
              color="white"
              className="w-full h-full px-[0.25rem] py-[0.25rem] rounded-full" // Reduced padding for smaller screens
            />
          </div>
          <Link
            href={"https://www.instagram.com/jadoreivc/?locale=undefined"}
            className="bg-orange-400 rounded-full relative"
          >
            <PiInstagramLogo
              size={20}
              color="white"
              className="w-full h-full px-[0.25rem] py-[0.25rem] rounded-full" // Reduced padding for smaller screens
            />
          </Link>
          <Link
            href={
              "https://www.tiktok.com/@jadoreivc?is_from_webapp=1&sender_device=pc"
            }
            className="bg-orange-400 rounded-full relative"
          >
            <IoLogoTiktok
              size={20}
              color="white"
              className="w-full h-full px-[0.25rem] py-[0.25rem] rounded-full" // Reduced padding for smaller screens
            />
          </Link>
          <div className="bg-orange-400 rounded-full relative">
            <FaTwitter
              size={20}
              color="white"
              className="w-full h-full px-[0.25rem] py-[0.25rem] rounded-full" // Reduced padding for smaller screens
            />
          </div>
          {/* <div className="bg-orange-400 rounded-full relative">
            <GrLinkedin
              size={20}
              color="white"
              className="w-full h-full px-[0.25rem] py-[0.25rem] rounded-full" // Reduced padding for smaller screens
            />
          </div> */}
        </div>
      </div>
      <div className="w-full h-full border-t-[1px] border-white my-[2rem]"></div>
      <div className="w-full flex flex-col md:flex-row md:gap-x-[27rem] justify-between items-center">
        <div className="w-full flex flex-col justify-start items-start gap-y-[0.85rem] md:gap-y-[1.5rem] ">
          <h1 className="text-white text-lg font-semibold">Company</h1>
          <div className="w-full text-sm font-[300] text-white text-start flex flex-col md:flex-row md:gap-x-[1.75rem] gap-y-[0.75rem]">
            {/* <Link href={""} className="w-fit cursor-pointer py-[0.5rem]">
              <p className="w-full">About Us</p>
            </Link> */}
            <Link
              href={"/SupportLine"}
              className="w-fit cursor-pointer py-[0.5rem]"
            >
              <p className="w-full cursor-pointer">Support</p>
            </Link>
            <Link href={"/Terms"} className="w-fit cursor-pointer py-[0.5rem]">
              <p className="w-full cursor-pointer">Terms of Service</p>
            </Link>
            <Link
              href={"/PrivacyPolicy"}
              className="w-fit cursor-pointer py-[0.5rem]"
            >
              <p className="w-full cursor-pointer">Privacy policy</p>
            </Link>
          </div>
        </div>

        {/* <div className="md:justify-end w-full flex flex-col justify-start items-start mt-[3rem] md:mt-0 gap-y-[0.85rem] md:gap-y-[1.5rem] ">
          <h1 className="text-white text-lg font-semibold">Download the App</h1>
          <div className="text-sm font-[300] text-white text-start flex flex-col md:flex-row md:gap-x-[2.85rem] gap-y-[0.75rem]">
            <Link href={""}>
              <Image alt="" src={AStore} width={100} height={100} />
            </Link>
            <Link href={""}>
              <Image alt="" src={GStore} width={120} height={160} />
            </Link>
          </div>
        </div> */}
      </div>
      <div className="w-full pb-[3rem] md:pb-[0.5rem] md:mt-[-2rem] md:relative md:top-[0.8rem] pt-[4.5rem] flex justify-start md:justify-center items-start md:items-center">
        <p className="text-white text-sm font-[300]">
          All Rights Reserved - Jadoreivc @2024
        </p>
      </div>
    </div>
  );
};

export default Footer;
