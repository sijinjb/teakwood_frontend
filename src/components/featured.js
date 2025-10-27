// ...existing code...
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import ProductCard from "./card";
import ProductDetails from "./productDetails";
import axios from "axios";

const LoadingTile = () => (
  <div className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-full flex flex-col">
    <div className="bg-gray-100 rounded-lg h-52 mb-4" />
    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-100 rounded w-1/2" />
  </div>
);

const Tile = ({ item }) => {
  const imageSrc = item?.image_one ? `${process.env.REACT_APP_API_PORT}${item.image_one}` : "/fallback.jpg";
  return (
    <article className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition h-full flex flex-col">
      {/* Fixed image box so every tile has the same visual size.
          img uses object-contain and max-h/full to avoid upscaling small images. */}
      <Link to={`/product/${item?.uuid}`} className="block shrink-0">
        <div className="w-full h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={item?.name}
            className="max-h-full max-w-full object-contain"
            decoding="async"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/product/${item?.uuid}`} className="block">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">{item?.name}</h3>
          </Link>
          <div className="mt-2 text-sm text-gray-500">{item?.brand || "Teakwood"}</div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">₹</span>
            <span className="text-lg font-semibold text-gray-900">{item?.price}</span>
          </div>

          <div className="ml-auto flex gap-2">
            <a
              href={`https://wa.me/918904088131?text=${encodeURIComponent(`I'm interested in ${item?.name} - https://www.teakwoodfactory.com/product/${item?.uuid}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2 text-white text-sm font-semibold shadow"
            >
              Buy now
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

const Featured = () => {
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [featuredData, setFeaturedData] = useState([]);
  const [filter, setFilter] = useState("all"); // all | new | bestseller

  const fetchFeaturedProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PORT}/api/product/`);
      const featured = (response.data.products || []).filter((product) => product.is_featured);
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

  const filtered = featuredData.filter((p) => {
    if (filter === "all") return true;
    if (filter === "new") return !!p.is_new;
    if (filter === "bestseller") return !!p.is_bestseller;
    return true;
  });

  const displayedData = more ? filtered : filtered.slice(0, 8);

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0E6B66]">Featured Products</h2>
            <p className="mt-1 text-gray-600 max-w-xl">
              Handpicked items — curated for quality and craftsmanship. Click an image to view product details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <nav className="inline-flex rounded-full bg-white p-[4px] shadow-sm border border-gray-100">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-sm ${filter === "all" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("new")}
                className={`px-4 py-2 rounded-full text-sm ${filter === "new" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                New
              </button>
              <button
                onClick={() => setFilter("bestseller")}
                className={`px-4 py-2 rounded-full text-sm ${filter === "bestseller" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                Bestseller
              </button>
            </nav>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <LoadingTile key={i} />)
            : displayedData.map((item, idx) => (
                <Tile key={item.uuid || idx} item={item} />
              ))}
        </div>

        {/* See more / less */}
        {filtered.length > 8 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setMore((m) => !m)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <span className="text-sm font-medium text-gray-700">{more ? "See less" : "See more"}</span>
              {more ? <ChevronUpIcon className="w-5 h-5 text-gray-500" /> : <ChevronDownIcon className="w-5 h-5 text-gray-500" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Featured;
// ...existing code...