import { useEffect, useState } from "react";
import Banner1 from "./../assets/pngwing3.png";

export default function Hero() {
  return (
    <main className="bg-[#0E6B66] ">
      <div className="mx-auto   max-w-7xl pb-14  px-6 sm:px-8  sm:pb-32 pt-[180px]  lg:pt-[170px]">
        <div className="mx-auto relative gap-8 lg:gap-12 flex-col lg:flex-row lg:mx-0 flex lg:max-w-none lg:items-center ">
          <div className="  w-full mx-auto max-w-2xl  lg:shrink-0 lg:max-w-[50%] text-center lg:text-left flex flex-col items-center  lg:items-start">
            <h1
              style={{ lineHeight: 1.2 }}
              className="text-4xl font-bold text-white sm:text-[54px] font_poppins"
            >
              <span>Explore bespoke furniture magic at Teak Woods.</span>
            </h1>

            <p className="mt-6 text-xl leading-8 text-white ">
              Transform your living space with the timeless elegance of Teak
              Woods furniture, where craftsmanship meets sophistication to
              create an ambiance of unparalleled beauty and comfort.
            </p>
            <div className="mt-10 flex items-center gap-x-6 w-[fit-content] ">
              <a
                href="tel:+918904088131"
                target="blank"
                className="min-w-[150px] text-center rounded-md gradient px-3.5 py-3 text-lg font-medium text-white shadow-sm hover:bg-[#A91CDB] "
              >
                Call now
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-xl lg:w-[50%]">
            <img
              src={Banner1}
              alt="Slider Image 1"
              loading="lazy"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </main>
  );
}
