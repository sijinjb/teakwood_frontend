// ...existing code...
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const BannerSkeleton = () => (
  <div className="mx-auto max-w-7xl px-6">
    <div className="w-full h-[300px] sm:h-[340px] md:h-[420px] lg:h-[480px] rounded-2xl bg-gray-200 animate-pulse" />
  </div>
);

export default function Banners() {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_PORT}/api/banner/`)
      .then((res) => {
        if (!mounted) return;
        setBannerData(res?.data?.banner || []);
      })
      .catch((err) => {
        console.error("Failed to fetch banners", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !!bannerData.length,
    autoplaySpeed: 4500,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: false,
    fade: false,
  };

  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <BannerSkeleton />
        ) : (
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative">
              <Slider {...settings} ref={sliderRef}>
                {bannerData.length ? (
                  bannerData.map((item, idx) => {
                    const src = item?.image ? `${process.env.REACT_APP_API_PORT}${item.image}` : "/fallback.jpg";
                    return (
                      <div key={idx} className="px-2">
                        <div
                          className="relative w-full rounded-xl overflow-hidden"
                        >
                          {/* increased responsive heights */}
                          <div className="w-full h-[300px] sm:h-[340px] md:h-[420px] lg:h-[480px] bg-gray-100">
                            <img
                              src={src}
                              alt={item?.name || `banner-${idx}`}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>

                          {/* Gradient overlay + content */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                          {/* Optional caption / CTA */}
                          {(item?.title || item?.subtitle) && (
                            <div className="absolute left-6 bottom-6 sm:left-8 sm:bottom-8 z-20 text-white">
                              {item?.title && <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold drop-shadow-md">{item.title}</h3>}
                              {item?.subtitle && <p className="mt-1 text-sm sm:text-base text-white/90 drop-shadow-sm max-w-xl">{item.subtitle}</p>}
                              {item?.cta_text && item?.cta_link && (
                                <a
                                  href={item.cta_link}
                                  target={item.cta_external ? "_blank" : "_self"}
                                  rel="noreferrer"
                                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2 text-sm font-semibold shadow-md"
                                >
                                  {item.cta_text}
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-2">
                    <div className="w-full h-[300px] sm:h-[340px] md:h-[420px] lg:h-[480px] rounded-xl bg-gradient-to-r from-gray-100 via-gray-50 to-white flex items-center justify-center text-gray-600">
                      No banners available
                    </div>
                  </div>
                )}
              </Slider>

              {/* Arrows */}
              <div className="absolute inset-y-0 left-4 flex items-center z-30">
                <button
                  onClick={goToPrev}
                  aria-label="Previous banner"
                  className="h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-105 transition"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              <div className="absolute inset-y-0 right-4 flex items-center z-30">
                <button
                  onClick={goToNext}
                  aria-label="Next banner"
                  className="h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-105 transition"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Dots styling wrapper (react-slick renders dots inside) */}
            <style>{`
              .slick-dots {
                bottom: 12px;
              }
              .slick-dots li button:before {
                font-size: 10px;
                color: rgba(255,255,255,0.9);
                opacity: 1;
              }
              .slick-dots li.slick-active button:before {
                color: #10b981;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
// ...existing code...