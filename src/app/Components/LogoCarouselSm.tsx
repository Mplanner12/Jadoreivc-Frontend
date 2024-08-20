"use client";

import * as React from "react";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";

import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import Image from "next/image";

import cartAGro from "../../../public/cartagroLogo.png";
import Qredet from "../../../public/QredetLogo.png";
import Explore from "../../../public/ExploreLogo.png";
import NewCatsLogo from "../../../public/NewCatsLogo.png";

const images = [
  { src: NewCatsLogo, alt: "NewCats Logo 1", width: 200, height: 300 },
  { src: Qredet, alt: "Qredet Logo", width: 200, height: 300 },
  { src: Explore, alt: "Explore Logo", width: 50, height: 50 },
  { src: cartAGro, alt: "CartAGro Logo", width: 250, height: 350 },
  { src: NewCatsLogo, alt: "NewCats Logo 2", width: 200, height: 300 },
];

export function LogoCarousel() {
  const plugin = React.useRef<AutoplayType>(
    Autoplay({ delay: 2000, stopOnInteraction: false }) // Set stopOnInteraction to false
  );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-[2.5rem] mb-[3.85rem] py-[1.75rem] bg-emerald-50">
      <h1 className="text-4xl md:text-[3.25rem] font-bold mb-[0.7rem] text-teal-950">
        Trusted By
      </h1>
      <Carousel plugins={[plugin.current]} className="w-full px-0">
        <CarouselContent className="w-full h-fit">
          {images.map((image, index) => (
            <CarouselItem
              key={image.alt}
              className="w-full h-fit basis-[58%] md:basis-[35%] px-[1.85rem] md:px-[2.3rem]"
            >
              <div className="p-1">
                <Card className="w-full h-fit flex justify-center items-center bg-emerald-50">
                  <CardContent className="w-full h-fit flex aspect-square items-center justify-center p-6 py-1">
                    <div className="w-full h-fit mb-[1.5rem] flex flex-col justify-center items-center">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
