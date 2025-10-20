import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Testimonials = () => {
  const testimonialData = [
    {
      review:
        "Teakwood factory is a good place for any teakwood furniture requirements you have at a reasonable price. We got a swing made by them and it has come out well as per our requirement and within the time frame committed by them. Even the delivery and installation was very professional. I also visited their work shop and was satisfied with the quality of work and the teak used.",
      rating: 5,
      reviewer: "Guruprasad V",
    },
    {
      review:
        "They offer teak furnitures and cushioning service. Got a cot of queen size for my room. The quality of the wood is very nice. They have their factory in thalghatpura which can be visited after speaking to the executives. They have standard design available which will be delivered with in a week. If you have a custom design it will be delivered based on the complexity but usually a month. The teak wood used is nilambur teak from kerala, personally liked the quality.",
      rating: 5,
      reviewer: "S Namratha",
    },

    {
      review:
        "We got a custom made teak wood dining table through teakwood factory. We are impressed with the workmanship. If you are little flexible with delivery date, you can get best product from Teakwood Factory. A place for authentic teak wood furniture. The picture below will speak for itself. Amazing furniture store. The husband and wife (owners) are very good people to do business with.",
      rating: 5,
      reviewer: "George Joseph",
    },
    {
      review:
        "We were in search of a teapoy for our house and wanted something simple without many compartments. This shop offered a variety of tables, allowing us to select the one that suited our preferences. The teak wood table we chose has been a hit with everyone in the family, and guests often inquire about it. Moreover, it was reasonably priced and conveniently delivered to our door. I highly recommend this shop to anyone in search of quality wooden furniture.",
      rating: 5,
      reviewer: "Shruthi Karanam",
    },
  ];

  const sliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl  py-12 sm:py-24 lg:px-8 px-6">
 
        <div className="relative ">
        <h2 className=" w-full  md:max-w-2xl mx-auto text-2xl text-[#0E6B66] font-semibold text-center pb-12 ">
          Read trusted reviews from our customers
        </h2>
        
          <Slider {...settings} ref={sliderRef}>
            {testimonialData?.map((item, index) => (
              <div key={index} className=" relative w-full   h-content flex self-center">
                <div className="max-w-4xl mx-auto  flex flex-col gap-4 items-center justify-center">
                  <p className="text-center text-lg">{item?.review}</p>

                  <div className="flex gap-0.5 text-[#e8cc50]">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>

                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>

                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>

                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>

                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>


                  <h3 className="text-xl font-semibold">{item?.reviewer}</h3>
                </div>

               
              </div>
            ))}
          </Slider>
          <a target="_blank" href="https://www.google.com/search?q=Teak+Wood+Factory+reviews#lrd=0x3bae15b03ec4509f:0x54d1312d9f5e79bc,1,,,," className=" min-w-[150px] justify-center mt-12 w-max mx-auto text-center rounded-md text-base  px-6 py-2  font-medium text-white shadow-sm gradient flex items-center gap-[2px] cursor-pointer">
          Read all reviews
        </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
