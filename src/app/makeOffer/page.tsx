/* eslint-disable @next/next/no-img-element */
import React, { Suspense } from "react";
import { MdOutlineMail } from "react-icons/md";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <div className="m-0 p-0 flex flex-col justify-center items-center">
        {/* <Header /> */}
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-full flex py-[2.85rem] pb-[0rem] justify-center items-center px-[1rem]">
            <h1 className="text-[2.1rem] font-semibold text-teal-900">
              Make an Offer to this Tour
            </h1>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-start md:justify-center items-center md:-mt-[1.5rem] py-[4rem] px-[1.75rem]">
            {" "}
            <div className="w-full flex md:w-fit flex-col justify-start items-center py-[1.5rem] md:py-[1.2rem] px-[0.85rem] md:px-[1.5rem] md:pr-[0.7rem] bg-slate-50">
              <div className="relative w-full gap-x-[1.3rem] md:gap-x-[11.5rem] flex justify-start items-center py-[0.85rem] pr-[2rem]">
                <div className="w-full flex justify-start items-center gap-[0.85rem] md:gap-x-[2.5rem]">
                  <div className="w-fit md:relative md:top-[0.8rem] flex justify-center items-center">
                    <img
                      src="/offerImg.png"
                      alt=""
                      width={65}
                      className="md:w-[5rem]"
                    />
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <p className="relative w-full text-start font-[500] text-[1.35rem] text-teal-950">
                      Abidjan, Ivory Coast
                    </p>
                  </div>
                </div>
                <div className="flex justify-normal items-center">
                  <MdOutlineMail size={28} className="text-teal-900" />
                </div>
              </div>
              <div className="mt-[-1rem] px-[0.25rem] md:pl-[5.75rem] w-full flex flex-col justify-start items-center gap-x-[2rem] py-[1rem] md:pt-0">
                <div className="w-full flex justify-start items-center gap-x-[2rem]">
                  <p className="w-full text-[1.1rem] md:hidden text-start text-gray-600">
                    Posted 3mins ago
                  </p>
                </div>
                <div className="w-full flex justify-start items-center gap-x-[0.75rem] py-[0.5rem] text-[1rem] text-gray-600">
                  <div>2days *</div>
                  <div>11 July - 13 July *</div>
                  <div>Just me</div>
                </div>
              </div>
              <div className="w-full flex justify-start gap-[0.75rem] md:justify-center md:gap-x-[1rem] items-center px-[0rem] md:pl-[1.5rem] md:px-[1.25rem] text-[0.85rem] font-semibold mt-[-0.5rem]">
                <div className="flex justify-center items-center">
                  <button className="p-[0.65rem] md:p-[0.8rem] py-[0.7rem] rounded-full text-[0.9rem] bg-slate-50 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white border focus:bg-emerald-600 focus:text-white border-emerald-600 text-emerald-600">
                    COUPLE
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button className="p-[0.65rem] md:p-[0.8rem] py-[0.7rem] rounded-full text-[0.9rem] bg-slate-50 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white border focus:bg-emerald-600 focus:text-white border-emerald-600 text-emerald-600">
                    SINGLE
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button className="p-[0.65rem] md:p-[0.8rem] py-[0.7rem] rounded-full text-[0.9rem] bg-slate-50 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white border focus:bg-emerald-600 focus:text-white border-emerald-600 text-emerald-600">
                    MAN
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button className="p-[0.65rem] md:p-[0.8rem] py-[0.7rem] rounded-full text-[0.9rem] bg-slate-50 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white border focus:bg-emerald-600 focus:text-white border-emerald-600 text-emerald-600">
                    WOMAN
                  </button>
                </div>
              </div>
              <div className="w-full mx-auto flex justify-center py-[1.75rem] items-center gap-x-[2rem]">
                <p className="w-full text-[1rem] md:flex justify-start pl-[5.8rem] hidden text-center text-gray-500">
                  Posted 3mins ago
                </p>
              </div>
            </div>
            <div className="w-full md:w-[45%] flex flex-col justify-center items-center px-[1.75rem] mt-[3.5rem]">
              <div className="w-full md:w-[80%] flex flex-col justify-start items-center">
                <label
                  className="w-full text-start py-[0.5rem] text-[1rem] text-slate-500"
                  htmlFor="offer"
                >
                  Hourly Rate
                </label>
                <input
                  type="number"
                  name="offer"
                  id=""
                  className="w-full p-[0.65rem] md:p-[0.8rem] shadow-sm rounded-lg border-2 hover:border-emerald-600 active:border-emerald-600 outline-emerald-600 text-[1.25rem]"
                  placeholder="$100"
                />
              </div>
              <div className="w-full md:w-[80%] flex justify-center items-center mt-[1.4rem] py-[1.25rem] px-[0.2rem] mb-[4rem]">
                {" "}
                <input
                  type="submit"
                  value="MAKE OFFER"
                  className="w-full h-full p-[0.85rem] font-[500] text-[1.5rem] text-center bg-orange-400 rounded-full text-slate-100"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Suspense>
  );
};

export default Page;
