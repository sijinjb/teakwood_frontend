// ...existing code...
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import axios from "axios";

const shimmer = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)`;

const SkeletonCard = () => (
  <div className="rounded-2xl bg-gradient-to-br from-gray-100 to-white shadow-md overflow-hidden animate-pulse">
    <div className="relative w-full h-36 bg-gray-200 overflow-hidden">
      <div
        style={{
          backgroundImage: shimmer,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.6s linear infinite",
        }}
        className="absolute inset-0"
      />
    </div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>

    <style>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  </div>
);

const CategoryCard = ({ item, onClick }) => {
  const img = item?.image ? `${process.env.REACT_APP_API_PORT}${item.image}` : "/fallback.jpg";
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative group w-full h-[150px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 p-0 bg-white focus:outline-none"
      onClick={onClick}
      aria-label={`Open category ${item?.name}`}
    >
      <div className="absolute inset-0">
        <img
          src={img}
          alt={item?.name || "category"}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/25 to-transparent transition-opacity duration-400" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="text-lg font-semibold drop-shadow-md capitalize">{item?.name}</div>
          {item?.count !== undefined && (
            <div className="mt-1 text-sm text-white/80">{item.count} items</div>
          )}
        </div>
      </div>

      <div className="absolute -bottom-8 right-4 z-20 transform rotate-12 opacity-0 group-hover:opacity-40 pointer-events-none">
        <div className="w-24 h-24 bg-white/6 rounded-xl blur-lg" />
      </div>
    </motion.button>
  );
};

const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cols, setCols] = useState(5); // responsive column hint (css grid will handle actual)
  const navigate = useNavigate();

  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(2);
      else if (w < 1024) setCols(3);
      else if (w < 1280) setCols(4);
      else setCols(5);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_PORT}/api/category/`)
      .then((res) => {
        setCategoryData(res?.data?.category || []);
      })
      .catch((error) => {
        console.error(error);
        setCategoryData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl py-20 px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E6B66]">Our Categories</h2>
          <p className="mt-3 max-w-2xl mx-auto text-gray-600">
            Discover a wide range of furniture options tailored to suit your style and needs — handcrafted pieces with timeless appeal.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white p-1 shadow">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">T</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Curated categories</div>
              <div className="text-lg font-semibold text-gray-900">{categoryData?.length || 0} collections</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-gray-700 shadow-sm hover:shadow"
            >
              Back to top
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm shadow hover:brightness-105"
            >
              View all products
            </button>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`}
          role="list"
        >
          {loading
            ? Array.from({ length: 10 }).map((_, idx) => <SkeletonCard key={idx} />)
            : categoryData?.length
            ? categoryData.map((item) => (
                <CategoryCard
                  key={item?.uuid}
                  item={item}
                  onClick={() => {
                    navigate(`/categories/${item?.uuid}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ))
            : (
              <div className="col-span-full text-center py-12">
                <div className="text-lg text-gray-600">No categories available right now.</div>
              </div>
            )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Tap a category to explore curated products. Designed for both inspiration and easy browsing.</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
// ...existing code...