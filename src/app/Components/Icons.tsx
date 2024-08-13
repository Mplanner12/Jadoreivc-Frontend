import React from "react";
import { LiaHotjar } from "react-icons/lia";
import { TbBeach } from "react-icons/tb";
import { PiSailboatLight } from "react-icons/pi";
import { PiPottedPlantThin } from "react-icons/pi";
import { LiaCarSideSolid } from "react-icons/lia";
import { PiBowlSteamLight } from "react-icons/pi";
import { TbBed } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { RiHotelBedLine } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";
import { PiMusicNotesThin } from "react-icons/pi";
import { PiSwordThin } from "react-icons/pi";

import Marquee from "react-fast-marquee";

const Icons = () => {
  return (
    <div>
      <Marquee speed={100} pauseOnClick={true}>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">
            Trending
          </h1>
          <div className="mx-auto">
            <LiaHotjar />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">
            Adventure
          </h1>
          <div className="mx-auto">
            <PiSwordThin />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">Beach</h1>
          <div className="mx-auto">
            <TbBeach />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">
            Boat and Yatch
          </h1>
          <div className="mx-auto">
            <PiSailboatLight />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">
            Beauty and Spa
          </h1>
          <div className="mx-auto">
            <PiPottedPlantThin />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">
            Car and Rides
          </h1>
          <div className="mx-auto">
            <LiaCarSideSolid />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">Events</h1>
          <div className="mx-auto">
            <TbBed />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">
            Food and Resturants
          </h1>
          <div className="mx-auto">
            <PiBowlSteamLight />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">
            Health and Pharmacy
          </h1>
          <div className="mx-auto">
            <GoPlusCircle />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">Hotels</h1>
          <div className="mx-auto">
            <RiHotelBedLine />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">Museum</h1>
          <div className="mx-auto">
            <BsPencil />
          </div>
        </div>
        <div className="w-fit p-[1.5rem] flex flex-col justify-between">
          <h1 className="font-light text-xs py-[0.5rem] text-black">
            Night Life
          </h1>
          <div className="mx-auto">
            <PiMusicNotesThin />
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default Icons;
