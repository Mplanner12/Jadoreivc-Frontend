import Image from "next/image";
import React from "react";

import cartAGro from "../../../public/cartagroLogo.png";
import Qredet from "../../../public/QredetLogo.png";
import Explore from "../../../public/ExploreLogo.png";
import NewCatsLogo from "../../../public/NewCatsLogo.png";

const images = [
  { src: NewCatsLogo, alt: "NewCats Logo 1", width: 150, height: 200 },
  { src: Qredet, alt: "Qredet Logo", width: 150, height: 200 },
  { src: Explore, alt: "Explore Logo", width: 50, height: 50 },
  { src: cartAGro, alt: "CartAGro Logo", width: 200, height: 300 },
  // { src: NewCatsLogo, alt: "NewCats Logo 2", width: 150, height: 200 },
];

const LogoCarouselMd = () => {
  return (
    <div className="hidden md:flex W-full h-fit md:flex-col justify-between items-center mb-[5.85rem] py-[3.75rem] bg-emerald-50 border-y-[1px] border-emerald-300">
      <h1 className="text-2xl font-semibold mb-[0.7rem] text-teal-950">
        Trusted By
      </h1>
      <div className="flex W-full h-fit py-[1.5rem] px-[1rem] justify-between items-center gap-x-[3.5rem]">
        {images.map((image, index) => (
          <div key={index} className="flex justify-between items-center">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarouselMd;
