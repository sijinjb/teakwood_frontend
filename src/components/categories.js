import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import axios from "axios";

const Categories = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_PORT}/api/category/`)
      .then((res) => {
        console.log("res", res.data);
        setCategoryData(res?.data?.category);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="mx-auto   max-w-7xl py-32 lg:px-8 px-6  ">
        <div className="text-2xl text-[#0E6B66] font-semibold text-center ">
          Our Categories
        </div>
        <p className="text-base mx-auto mt-4 text-gray-900 text-center max-w-2xl">
          Discover a wide range of furniture options tailored to suit your style
          and needs. From contemporary pieces to timeless classics,
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-normal gap-4 mt-8">
            {Array(8)
              .fill()
              .map((_, index) => {
                return (
                  <div
                    key={index}
                    className=" w-full h-[150px] animate-pulse rounded-lg bg-gray-300"
                  ></div>
                );
              })}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-normal gap-4 mt-8">
            {categoryData?.map((item, index) => {
              return (
                <motion.div
                  key={item?.uuid}
                  className="relative w-full h-[150px] flex items-center justify-center rounded-lg cursor-pointer bg-black overflow-hidden"
                  whileHover="hover"
                  onClick={() => {
                    navigate(`/categories/${item?.uuid}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <motion.img
                    initial={{ opacity: 0.7, scale: 1 }}
                    variants={{
                      hover: {
                        opacity: 1,
                        scale: 1.1,
                      },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "linear",
                    }}
                    className="w-full h-full rounded-lg object-cover "
                    src={process.env.REACT_APP_API_PORT + item?.image}
                  />
                  <motion.p
                    className="absolute text-center font-medium text-lg text-white whitespace-normal capitalize"
                    initial={{ opacity: 1 }}
                    variants={{
                      hover: {
                        opacity: 0,
                      },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "linear",
                    }}
                  >
                    {item?.name}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
