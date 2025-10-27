// ...existing code...
import React from "react";
import {
  BanknotesIcon,
  CheckBadgeIcon,
  CircleStackIcon,
  ClockIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

const Benefits = () => {
  const benefits = [
    {
      title: "Many choices",
      icon: Square3Stack3DIcon,
      description:
        "Discover a wide range of furniture styles to suit your unique taste and preferences.",
    },
    {
      title: "Affordable Prices",
      icon: BanknotesIcon,
      description:
        "Enjoy quality furniture at pocket-friendly prices that won't break the bank.",
    },
    {
      title: "Timely Delivery",
      icon: ClockIcon,
      description: "Rest assured, your furniture will be delivered on time, as promised. ",
    },
    {
      title: "Quality Assurance",
      icon: CheckBadgeIcon,
      description:
        "Our furniture undergoes quality checks to ensure durability and longevity",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-16">
      {/* Decorative soft shapes */}
      <div aria-hidden className="pointer-events-none absolute -left-10 -top-10 w-64 h-64 rounded-3xl bg-emerald-50 blur-3xl opacity-60 hidden sm:block" />
      <div aria-hidden className="pointer-events-none absolute -right-10 bottom-0 w-72 h-72 rounded-3xl bg-teal-50 blur-3xl opacity-60 hidden md:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E6B66]">Why Choose Us?</h2>
          <p className="mt-2 text-gray-600">
            Carefully crafted furniture, transparent pricing and timely service — everything you need for a confident purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={index}
                role="region"
                aria-labelledby={`benefit-${index}`}
                className="relative group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transform transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className="h-14 w-14 rounded-xl flex items-center justify-center text-white shadow-md"
                      style={{
                        background: "linear-gradient(135deg,#10b981,#059669)",
                      }}
                      aria-hidden
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 id={`benefit-${index}`} className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>

                {/* subtle accent line */}
                <div className="absolute -bottom-3 right-4">
                  <div className="h-1 w-14 rounded-full bg-gradient-to-r from-emerald-300 to-teal-400 opacity-40 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm">
              <CogIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Designed for you</div>
              <div className="text-sm font-medium text-gray-800">Handpicked quality • Reliable service</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-semibold shadow hover:brightness-105 transition"
            >
              Learn more
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700 shadow-sm hover:shadow"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;