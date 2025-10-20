import React, { useEffect, useState } from "react";
import ProductCard from "./card";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import ProductDetails from "./productDetails";
import axios from "axios";

const Featured = () => {
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [featuredData, setFeaturedData] = useState([]);
  const [clickedData, setClickedData] = useState(null);

  const fetchFeaturedProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PORT}/api/product/`
      );

      // Filter products where is_featured is true
      const featured = response.data.products.filter(
        (product) => product.is_featured
      );
      setFeaturedData(featured);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProduct();
  }, []);

  const displayedData = more ? featuredData : featuredData.slice(0, 8);



  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl pb-20 lg:px-8 px-6">
        <div className="text-2xl text-[#0E6B66] font-semibold text-left pb-8">
          Featured Products
        </div>
        <div className="w-full grid grid-cols-1 min-[650px]:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedData.map((item, index) => {
            return (
              <ProductCard
                key={index}
                data={item}
              />
            );
          })}
        </div>
   

        {/* Conditionally render the See More/See Less button */}
        {featuredData.length > 8 && (
          <button
            onClick={() => {
              setMore(!more);
            }}
            className="min-w-[150px] justify-center mt-12 w-max mx-auto text-center rounded-md text-base px-6 py-2 font-medium text-white shadow-sm gradient flex items-center gap-[2px] cursor-pointer"
          >
            <p>{more ? "See less" : "See more"} </p>
            {more ? (
              <ChevronUpIcon className="w-6 h-6 pt-[2px]" />
            ) : (
              <ChevronDownIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Featured;
