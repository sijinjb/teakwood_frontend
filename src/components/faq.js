// ...existing code...
import React, { useState, useMemo } from "react";
import { Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Click the WhatsApp icon next to the product to place your order, and our team will assist you promptly.",
  },
  {
    question: "What types of furniture do you offer?",
    answer:
      "We offer a wide range of furniture styles, including sofas, beds, dining sets, and more.",
  },
  {
    question: "What are your delivery options?",
    answer:
      "We provide doorstep delivery to your location with flexible scheduling Upto 1st Floor.",
  },
  {
    question: "Do you offer customization options?",
    answer:
      "Yes, certain items can be customized to suit your preferences; contact us on WhatsApp to discuss.",
  },
  {
    question: "What is your warranty policy?",
    answer: "Our warranty period is 2 years for all products.",
  },
  {
    question: "Do you offer free delivery?",
    answer: "Yes, we offer free delivery to Bangalore locations.",
  },

  // More questions...
];

export default function FAQ({ paddingTop }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(() => ({})); // map idx->bool

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (i) => {
    setExpanded((s) => ({ ...s, [i]: !s[i] }));
  };

  const expandAll = () => {
    const m = {};
    filtered.forEach((_, i) => (m[i] = true));
    setExpanded(m);
  };
  const collapseAll = () => setExpanded({});

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-8">
      <div
        className={`mx-auto max-w-7xl px-6 ${paddingTop ? "pt-14 sm:pt-24" : ""} lg:px-8`}
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0E6B66] flex items-center gap-3">
                <SparklesIcon className="h-7 w-7 text-emerald-500" />
                Frequently asked questions
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Quick answers to common questions — still need help? Reach out via WhatsApp.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-md text-sm hover:bg-emerald-100 transition"
              >
                Expand all
              </button>
              <button
                onClick={collapseAll}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition"
              >
                Collapse
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="relative block">
              <span className="sr-only">Search FAQs</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="placeholder-gray-400 text-sm pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300"
                placeholder="Search questions or keywords..."
                type="search"
                aria-label="Search FAQs"
              />
            </label>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {filtered.map((faq, idx) => (
              <div
                key={faq.question}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-start justify-between gap-4 p-4 md:p-5 text-left"
                  aria-expanded={!!expanded[idx]}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                        {faq.question}
                      </h3>
                      <span className="hidden md:inline-block text-xs text-gray-400">
                        {/* keep existing content unchanged */}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{faq.answer}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center text-sm text-gray-400 pr-2">
                      {expanded[idx] ? "Open" : "Answer"}
                    </div>

                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 transition-transform duration-200 transform hover:scale-105">
                      {expanded[idx] ? (
                        <MinusSmallIcon className="h-5 w-5" />
                      ) : (
                        <PlusSmallIcon className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </button>

                <Transition
                  show={!!expanded[idx]}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
                    <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </Transition>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="rounded-2xl bg-white border border-gray-100 p-6 text-center text-gray-500">
                No FAQs match your search. Try different keywords or contact support on WhatsApp.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...