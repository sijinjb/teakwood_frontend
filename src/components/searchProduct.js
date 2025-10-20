import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./card";

const ProductSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow animate-pulse">
    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const SearchProduct = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_PORT;

      const response = await axios.get(`${baseUrl}/api/search/?search=${searchQuery}`);
      
      console.log(response)
      setProductData(response.data.product || []);
    
    } catch (error) {
      console.error("Error fetching data:", error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts and when dependencies change
  useEffect(() => {
    if(searchQuery){
    fetchData();
    }
  }, [searchQuery]);



  return (
    <div className="min-h-[screen] pt-[70px] lg:pt-[20px]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 py-12">
  <div className="w-full grid max-[400px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
    
    {loading ? (
      Array.from({ length: 8 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))
    ) : productData.length > 0 ? (
      productData.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))
    ) : (
      <p className="text-center col-span-full">No products found.</p>
    )}

  </div>
</div>

    </div>
  );
};

export default SearchProduct;