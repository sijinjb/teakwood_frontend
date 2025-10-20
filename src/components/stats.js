import React from "react";
import Image1 from "./../assets/image1.jpg";
import Kitchen from "./../assets/image2.jpg";
import RoundPattern from "./../assets/images/rounds.svg";

const Stats = () => {
  return (
    <div className="mx-auto   max-w-7xl pb-14  sm:pb-20 md:pb-36 pt-20  sm:pt-32  md:pt-44 lg:px-8 px-6 ">
      <div className="font-[poppins] w-full h-full bg-white  ">
        <div className="relative whitespace-nowrap  ">
          <img
            src={RoundPattern}
            className="absolute top-[96px] z-10 sm:-top-12 md:-top-14  -right-5 lg:-right-10 md:w-[260px]  sm:w-[200px] w-[150px] "
          />
          <div className=" flex sm:flex-row flex-col ">
            <div className="w-full  flex flex-col justify-between  gap-4  md:gap-4 sm:w-[50%]  sm:gap-3">
              <h1 className="text-[#121212] self-center pb-2 sm:pb-0 sm:self-start text-[30px] sm:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[46px] font-bold ">
                Custom design for <br />
                your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBB009] to-[#F47220] ">
                  unique
                </span>{" "}
                taste
              </h1>
              <div className=" z-30 sm:z-40 mx-auto w-full sm:w-[100%] h-[240px] sm:h-[220px] md:h-[280px] lg:h-[380px] bg-[#fbb0092e] rounded-xl sm:rounded-2xl flex justify-center items-center p-2 md:p-4 lg:p-6  ">
                <img
                  src={Image1}
                  className="w-full h-full rounded-md sm:rounded-lg object-cover "
                />
              </div>
            </div>
            <div className="z-40 sm:z-30 mx-auto  w-[90%]   flex flex-col gap-4 items-end md:w-[58%] md:gap-8 sm:w-[60%] mt-[-50px] sm:mt-0 sm:ml-[-60px] sm:gap-4 ">
              <img
                src={Kitchen}
                className="w-full h-[220px] sm:h-[200px] md:h-[280px] lg:h-[400px] border-4 sm:border-none border-white rounded-md sm:rounded-lg  object-cover  "
              />
              <div className="w-full sm:w-[75%] sm:mr-5 flex flex-row justify-between items-end md:mr-10 md:w-[72%] md:gap-2 sm:pb-2">
                <div className="flex flex-col items-center justify-center lg:mt-6">
                  <h1 className="text-[#121212] text-[30px] md:text-[32px] lg:text-[45px] font-semibold   ">
                    50+
                  </h1>
                  <p className="text-center font-medium  text-[14px] sm:text-[14px] lg:text-[20px] ">
                    {" "}
                    Years of
                    <br />
                    Excellence
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-[#121212] text-[30px] md:text-[32px] lg:text-[45px]  font-semibold   ">
                    100+
                  </h1>
                  <p className="text-center font-medium  text-[14px] sm:text-[14px] lg:text-[20px] ">
                    Experienced
                    <br />
                    Designers
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-[#121212] text-[30px] md:text-[32px] lg:text-[45px]  font-semibold ">
                    25K+
                  </h1>
                  <p className="text-center font-medium  text-[14px] sm:text-[14px] lg:text-[20px] ">
                    Esteemed
                    <br />
                    Customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
