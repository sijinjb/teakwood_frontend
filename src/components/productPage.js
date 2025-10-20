import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./card";

const ProductSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow animate-pulse">
    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_PORT;

      // API calls for products, category, and subcategories
      const [productsRes, categoryRes, subcategoriesRes] = await Promise.all([
        axios.post(`${baseUrl}/api/products/category/`, {
          category: selectedSubcategories.length > 0 ? null : [id],
          sub_category: selectedSubcategories.length > 0 ? selectedSubcategories : null,
        }),
        axios.get(`${baseUrl}/api/category/${id}/`),
        axios.get(`${baseUrl}/api/sub-category/category/${id}/`),
      ]);

      // Set the state with the response data
      setProductData(productsRes.data.product || []);
      setCategoryData(categoryRes.data.category || null);
      setSubcategoryData(subcategoriesRes.data.sub_category || []);
    } catch (error) {
      console.error("Error fetching data:", error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts and when dependencies change
  useEffect(() => {
    fetchData();
  }, [id, selectedSubcategories]);

  // Handle selection of subcategories
  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 py-12">
        <h1 className="text-2xl font-bold mb-2 text-gray-800 capitalize">
          {categoryData?.name || "Category"}
        </h1>
        <p className="text-gray-600 mb-8">{categoryData?.description}</p>

        {/* Filters Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Filters</h2>
          <div className="flex flex-wrap gap-4">
            {subcategoryData.map((subcategory) => (
              <button
                key={subcategory.uuid}
                onClick={() => handleSubcategorySelect(subcategory.uuid)}
                className={`px-4 py-1 rounded-lg ${
                  selectedSubcategories.includes(subcategory.uuid)
                    ? "bg-[#0E6B66] text-white"
                    : "bg-[#0E6B66]/10 text-[#0E6B66] border border-[#0E6B66]"
                }`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid max-[400px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : productData.length > 0
            ? productData.map((item) => <ProductCard key={item.id} data={item} />)
            : <p>No products found for the selected filters.</p>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductPage;