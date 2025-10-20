import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import React, { useRef } from "react";

const YT = () => {
  const links = [
    "https://youtube.com/embed/tuTGRncdMlc?si=j4kotXInEoEkFdrq",
    "https://youtube.com/embed/IXYLbKpqb7w?si=dOjo_5ZS9q9nzgN-",
    "https://youtube.com/embed/-UmjbwYMJYk?si=FzR8XluY0Mo0NIVl",
    "https://youtube.com/embed/_7pdDf8Zrlc?si=177OLe98zagryKpX",
    "https://youtube.com/embed/n5x9o3OgeSk?si=gUYGqnT6kX0El1zb",
  ];

  const containerRef = useRef(null);
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="bg-gray-200">
      <div className="mx-auto   max-w-7xl py-20 lg:px-8 px-6 mt-32  ">
        <div className="flex justify-between">
          <h1 className="text-2xl text-[#0E6B66] font-semibold text-left pb-8">
            Watch our videos
          </h1>
          <div className="flex gap-4">
            <ChevronLeftIcon
              onClick={scrollLeft}
              className="w-8 h-8 cursor-pointer border-2 border-[#0E6B66] text-[#0E6B66] rounded-full"
            />
            <ChevronRightIcon
              onClick={scrollRight}
              className="w-8 h-8 cursor-pointer border-2 border-[#0E6B66] text-[#0E6B66] rounded-full "
            />
          </div>
        </div>
        <div
          ref={containerRef}
          className="flex flex-row overflow-x-auto gap-4 no-scroll"
        >
          {links?.map((item, index) => {
            return (
              <iframe
                width="400"
                height="250"
                src={item}
                title="youtubebe video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YT;
