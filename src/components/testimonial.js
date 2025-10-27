// ...existing code...
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

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
  {
    review:
      "Good Customer service and their products are absolutely very premium quality and unique designs.also highly recommended for those who are looking for premium Teakwood Furnitures",
    rating: 5,
    reviewer: "Sijin jacob",
  },
  {
    review:
      "Got a teakwood sofa from here. Very happy with the decision. Good antique design and nice service. They also allowed us to visit the factory to check for any defects or charges before delivery.",
    rating: 5,
    reviewer: "Abhijit Mirajkar",
  },
  {
    review:
      "We had ordered 4+1 +1 along with center table. We got it yesterday. Its beyond our expectations. Fit & Finish is excellent. Mr. Raghavendra were very attentive to our requirements. Few customization were required and they have done it. The sofa & center table has elevated our living hall to next hall. Delighted . Thanks to teakwood team",
    rating: 5,
    reviewer: "ramesh pom",
  },
];

const Star = ({ filled }) => (
  <svg className={`h-4 w-4 ${filled ? "text-amber-400" : "text-gray-200"}`} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Avatar = ({ name }) => {
  const parts = (name || "A").split(" ").filter(Boolean);
  const initials = parts.length === 1 ? parts[0].slice(0, 2).toUpperCase() : `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  // simple deterministic gradient based on name hash
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const colorA = `hsl(${hash % 360} 60% 55%)`;
  const colorB = `hsl(${(hash + 60) % 360} 55% 45%)`;

  return (
    <div className="h-16 w-16 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md" style={{ background: `linear-gradient(135deg, ${colorA}, ${colorB})` }}>
      {initials}
    </div>
  );
};

const Testimonials = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 1400, settings: { slidesToShow: 3 } },
    ],
  };

  const prev = () => sliderRef.current && sliderRef.current.slickPrev();
  const next = () => sliderRef.current && sliderRef.current.slickNext();

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E6B66] text-center">Read trusted reviews from our customers</h2>
          <p className="max-w-2xl text-center text-gray-600">Real experiences from buyers — workmanship, delivery and quality you can rely on.</p>

          <div className="w-full relative mt-8">
            {/* decorative background */}
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
              <div className="absolute left-0 top-0 w-48 h-48 bg-emerald-50 rounded-3xl blur-3xl transform -translate-x-8 -translate-y-8" />
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal-50 rounded-3xl blur-3xl transform translate-x-12 translate-y-12" />
            </div>

            {/* custom arrows */}
            <div className="absolute -top-2 right-4 flex gap-2 z-20">
              <button onClick={prev} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:scale-105 transition">
                <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
              </button>
              <button onClick={next} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:scale-105 transition">
                <ChevronRightIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            <Slider {...settings} ref={sliderRef} className="py-6 px-2">
              {testimonialData.map((item, idx) => (
                <div key={idx} className="px-3">
                  <article className="h-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl transition">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Avatar name={item.reviewer} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-lg font-semibold text-gray-900">{item.reviewer}</h3>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} filled={i < (item.rating || 0)} />
                            ))}
                          </div>
                        </div>

                        <blockquote className="mt-4 text-gray-700 italic leading-relaxed text-sm md:text-base">
                          “{item.review}”
                        </blockquote>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.google.com/search?q=Teak+Wood+Factory+reviews#lrd=0x3bae15b03ec4509f:0x54d1312d9f5e79bc,1,,,,"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2 text-white text-sm font-semibold shadow"
                      >
                        Read all reviews
                      </a>

                      <div className="text-xs text-gray-400">Verified buyer</div>
                    </div>
                  </article>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
// ...existing code...