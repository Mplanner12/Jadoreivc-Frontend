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
import Abijan from "../../../public/Abijan.jpg";
import Bouake from "../../../public/Bouaké.jpeg";
import Daloa from "../../../public/Daloa.jpg";
import SanPedro from "../../../public/San-Pédro.jpg";
import Yamoussoukro from "../../../public/Yamoussoukro2.jpg";
import Man from "../../../public/Man.jpg";
import Gagnoa from "../../../public/Gagnoa.jpg";
import Abengourou from "../../../public/Abengourou.jpg";
import Odienné from "../../../public/Odienné.jpg";
import Korhogo from "../../../public/Korhogo.jpg";

const NewsUpdate = [
  {
    text: "Abidjan - The economic capital and largest city, known for its modern infrastructure, vibrant economy, and cultural diversity.",
    src: Abijan,
    alt: "News1",
    width: 400,
    height: 270,
  },
  {
    text: "Bouaké - The second-largest city, located in the central part of the country, known for its trade and agricultural activities.",
    src: Bouake,
    alt: "News1",
    width: 400,
    height: 270,
  },
  {
    text: "Daloa - A major city in the west-central region, known as a hub for cocoa and coffee production",
    src: Daloa,
    alt: "News2",
    width: 400,
    height: 270,
  },
  {
    text: "San-Pédro - A port city in the southwest, important for its port facilities and connection to the cocoa export industry",
    src: SanPedro,
    alt: "News3",
    width: 400,
    height: 270,
  },
  {
    text: "Yamoussoukro - The political and administrative capital, famous for the Basilica of Our Lady of Peace, one of the largest churches in the world",
    src: Yamoussoukro,
    alt: "News4",
    width: 400,
    height: 270,
  },
  {
    text: "Korhogo - A city in the northern part of the country, known for its cultural heritage and traditional crafts.",
    src: Korhogo,
    alt: "News5",
    width: 400,
    height: 270,
  },
  {
    text: "Man - Located in the mountainous western region, Man is known for its scenic beauty, waterfalls, and the rich cultural traditions of the Dan people",
    src: Man,
    alt: "News5",
    width: 400,
    height: 270,
  },
  {
    text: "Gagnoa - A city in the central-western region, known for its agricultural activities and vibrant local markets",
    src: Gagnoa,
    alt: "News5",
    width: 400,
    height: 270,
  },
  {
    text: "Abengourou - A city in the eastern part of the country, known for its role in the cocoa industry and its proximity to the Ghanaian border",
    src: Abengourou,
    alt: "News5",
    width: 400,
    height: 270,
  },
  {
    text: "Odienné - Located in the northwestern part of the country, known for its cultural diversity and proximity to the borders with Mali and Guinea",
    src: Odienné,
    alt: "News5",
    width: 400,
    height: 270,
  },
];
const NewsAndUpdate = () => {
  const plugin = React.useRef<AutoplayType>(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="p-[2rem] md:px-[3.25rem] pt-[1rem] md:pt-[2rem] pb-[1rem] w-full flex flex-col justify-center mb-[3rem] md:mb-[3rem]">
      <div className="w-full flex justify-between items-center md:mb-[1.5rem] mb-[0.5rem]">
        <div className="py-[1.25rem]">
          <h1
            id="mini-header"
            className="font-semibold text-[1.35rem] tracking-wide md:text-lg"
          >
            News and Updates
          </h1>
        </div>
        <button
          id="viewMore"
          className="md:relative md:-left-[1.75rem] h-fit text-white text-[1rem] md:text-sm tracking-wider font-extralight bg-orange-400 uppercase rounded-[2rem] -gap-y-3 px-[1rem] md:px-[1.75rem] py-[0.75rem] md:py-[1.25rem]"
        >
          View More
        </button>
      </div>
      <div className="">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full py-[1.75rem]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="w-full h-full flex">
            {NewsUpdate.map((news, index) => (
              <CarouselItem
                key={news.alt}
                className="w-full h-full flex-none basis-[83%] md:basis-[23%] flex justify-center items-center"
              >
                <div className="w-full h-full flex justify-center items-center">
                  <Card className="w-full h-full flex justify-center items-center">
                    <CardContent className="w-full h-full flex flex-col items-center justify-center p-2 py-1">
                      <div className="w-full h-[325px] flex justify-center items-center mb-[1.5rem]">
                        <Image
                          className="rounded-3xl w-full h-full object-cover px-[0.5rem]"
                          src={news.src}
                          alt={news.alt}
                        />
                      </div>
                      <div className="w-full px-[1.5rem]">
                        <p className="w-full text-teal-950 text-[1.1rem] font-semibold tracking-wide text-start">
                          {news.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
  <CarouselNext /> */}
        </Carousel>
      </div>
    </div>
  );
};

export default NewsAndUpdate;
