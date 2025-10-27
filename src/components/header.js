// ...existing code...
import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Logo from "./../assets/png.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("search") || "";
    setQuery(q);
  }, [location]);

  useEffect(() => {
    let mounted = true;
    axios.get(`${process.env.REACT_APP_API_PORT}/api/category/`)
      .then(res => mounted && setCategories(res?.data?.category || []))
      .catch(() => mounted && setCategories([]));
    return () => { mounted = false; };
  }, []);

  function onSubmit(e) {
    e?.preventDefault();
    const v = (query || "").trim();
    if (!v) return;
    navigate(`/products?search=${encodeURIComponent(v)}`);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0E6B66]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[64px] justify-between gap-4">
          {/* left - brand */}
          <a href="/" className="flex items-center gap-3">
            <img src={Logo} alt="Teakwood" className="h-8 w-auto" />
           
          </a>

          {/* center - simple nav */}
          <nav className="hidden md:flex items-center gap-6 text-white">
            <a href="/" className="text-sm font-medium hover:underline">Home</a>

            <div className="relative">
              <button
                onClick={() => setCatOpen(v => !v)}
                className="flex items-center gap-1 text-sm font-medium text-white"
                aria-expanded={catOpen}
                aria-controls="categories-panel"
              >
                Categories <ChevronDownIcon className="h-4 w-4 text-white/90" />
              </button>

              {catOpen && (
                <div
                  id="categories-panel"
                  onMouseLeave={() => setCatOpen(false)}
                  className="absolute left-0 mt-3 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 p-2"
                >
                  {categories.length ? categories.map(c => (
                    <a key={c.uuid || c.name} href={`/categories/${c.uuid}`} className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50">
                      {c.name}
                    </a>
                  )) : <div className="px-3 py-2 text-sm text-gray-500">No categories</div>}
                </div>
              )}
            </div>

            <a href="/about" className="text-sm font-medium text-white/95">About</a>
          </nav>

          {/* right - redesigned search / actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* New stylish search box (desktop) */}
            <form onSubmit={onSubmit} className="hidden sm:flex items-center relative w-[340px] md:w-[420px] lg:w-[520px]">
              <div className="relative flex-1">
                {/* left icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-white/80" />
                </div>

                <input
                  id="header-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, designs or materials..."
                  className="w-full h-11 pl-10 pr-28 rounded-full bg-white/90 text-sm text-gray-800 placeholder-gray-500 border border-white/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                  aria-label="Search products"
                />

                {/* clear button */}
                {query?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-20 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-white/60 text-gray-700 hover:bg-white"
                    aria-label="Clear search"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* submit CTA */}
              <button
                type="submit"
                className="ml-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 border border-white/10 shadow"
                aria-label="Search"
              >
                Search
              </button>
            </form>

            {/* compact mobile search button */}
            <button
              type="button"
              onClick={() => {
                // open mobile drawer so user can search there
                setMobileOpen(true);
              }}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-white"
              aria-label="Open menu / search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <a
              href="https://wa.me/918904088131"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-full text-sm hover:bg-white/20"
            >
              <PhoneIcon className="h-4 w-4" /> Contact
            </a>

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <Transition show={mobileOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setMobileOpen}>
          <Transition.Child as={React.Fragment} enter="transition-opacity duration-150" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 w-full max-w-sm">
            <Transition.Child as={React.Fragment} enter="transform transition duration-200" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition duration-150" leaveFrom="translate-x-0" leaveTo="translate-x-full">
              <Dialog.Panel className="h-full bg-white px-6 py-6">
                <div className="flex items-center justify-between">
                  <a href="/" className="flex items-center gap-3">
                    <img src={Logo} alt="Teakwood" className="h-7 w-auto" />
                    <span className="font-semibold">Teakwood</span>
                  </a>
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md text-gray-700">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {/* mobile search area */}
                  <form onSubmit={(e) => { onSubmit(e); setMobileOpen(false); }} className="flex gap-2">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products..."
                      className="flex-1 h-10 px-3 rounded-md border border-gray-200"
                    />
                    <button type="submit" className="h-10 px-3 rounded-md bg-[#0E6B66] text-white">Search</button>
                  </form>

                  <a href="/" className="block text-gray-900 py-2 px-2 rounded hover:bg-gray-50">Home</a>

                  <div>
                    <button onClick={() => setCatOpen(v => !v)} className="w-full flex items-center justify-between py-2 px-2 text-gray-900 rounded hover:bg-gray-50">
                      Products <ChevronDownIcon className="h-5 w-5" />
                    </button>
                    {catOpen && (
                      <div className="mt-2 space-y-1 pl-3">
                        {categories.length ? categories.map(c => (
                          <a key={c.uuid || c.name} href={`/categories/${c.uuid}`} className="block py-2 text-sm text-gray-700 hover:bg-gray-50 rounded px-2">{c.name}</a>
                        )) : <div className="py-2 text-sm text-gray-500">No categories</div>}
                      </div>
                    )}
                  </div>

                  <a href="/about" className="block text-gray-900 py-2 px-2 rounded hover:bg-gray-50">About</a>

                  <a href="https://wa.me/918904088131" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 justify-center w-full py-2 rounded-md bg-[#24CC63] text-white">
                    <PhoneIcon className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
// ...existing code...