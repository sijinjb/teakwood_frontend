import React, { useEffect, useState, useCallback } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Logo from "./../assets/png.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchBar = React.memo(({ searchQuery, onSearchChange, onSubmit, mobile = false }) => {
  const inputRef = useCallback(node => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className={`flex items-center ${mobile ? "w-full" : "w-full"} gap-2`}>
      <div className="w-full relative h-10">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search products..."
          className="w-full h-full px-2 py-2 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E6B66]"
        />
        <button
          type="submit"
          className="absolute h-8 w-8 right-1 top-1/2 cursor-pointer -translate-y-1/2 p-[6px] bg-[#0E6B66] text-white rounded-[4px] hover:bg-[#0A5A56] focus:outline-none"
        >
          <MagnifyingGlassIcon className="w-full h-full" />
        </button>
      </div>
    </form>
  );
});

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_PORT}/api/category/`)
      .then((res) => {
        setCategoryData(res.data.category || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      setShowSearch(true);
    }
  }, [location]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  }, [navigate, searchQuery]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <header className="inset-x-0 top-0 z-50 w-full fixed bg-[#0E6B66]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 h-[60px] sm:h-[68px] lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 gap-8 items-center justify-between w-full">
          <a href="/" className="flex-shrink-0 text-[white] text-lg font-semibold">
            <span className="sr-only">Teakwood Factory</span>
            <img className="h-5 sm:h-8 w-auto" src={Logo} alt="Logo" />
          </a>
          <div className="hidden lg:flex max-w-[300px] flex-grow">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSubmit={handleSearch}
            />
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12 flex-shrink-0">
            <a href="/" className="text-sm font-medium leading-6 text-white">
              Home
            </a>
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white outline-none">
                Products
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 top-full mt-3 max-w-[400px] min-w-[150px] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {categoryData.map((item) => (
                      <div key={item.name} className="group relative whitespace-nowrap flex items-center gap-x-6 rounded-lg px-2 py-2 text-sm leading-6 hover:bg-gray-100">
                        <div className="flex-auto">
                          <a href={`/categories/${item?.uuid}`} className="block font-medium text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <a href="/about" className="text-sm font-medium leading-6 text-white">
              About
            </a>
          </Popover.Group>
        </div>
        <div className="flex lg:hidden">
          {!showSearch && (
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setShowSearch(true)}
            >
              <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white ml-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      {showSearch && (
        <div className="px-6 py-2  -mt-2 mb-2 max-w-md mx-auto w-full flex gap-2 lg:hidden">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSubmit={handleSearch}
            mobile
          />
          <button
            type="button"
            onClick={() => {setShowSearch(false)
              navigate("/")
              setSearchQuery("");
            }}
            className=" w-10 h-10 border border-gray-600 bg-gray-200 flex cursor-pointer justify-center p-1 items-center rounded-md  text-gray-900 focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6 stroke-gray-900" />
         
          </button>
        </div>
      )}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-5 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 text-gray-900">
              <span className="sr-only">TeakWood Factory</span>
              <img className="h-5 w-auto" src={Logo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  onSubmit={handleSearch}
                  mobile
                />
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50">
                        Products
                        <ChevronDownIcon
                          className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {categoryData.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={`/categories/${item?.uuid}`}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-medium leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <a
        className="text-white bg-[#24CC63] p-2 rounded-full w-max fixed z-50 bottom-6 right-6"
        href="https://wa.me/918904088131"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </header>
  );
}