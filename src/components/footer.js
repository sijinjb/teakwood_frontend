import React from "react";
import {
  BuildingStorefrontIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
const Footer = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto   max-w-7xl pt-32 lg:px-8 px-6 ">
        <div>
          <h1 className=" text-xl block text-[#0E6B66] font-semibold mb-4">
            Our Store Location
          </h1>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.037768050279!2d77.57062277481872!3d12.905293016329095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b03ec4509f%3A0x54d1312d9f5e79bc!2sTeak%20Wood%20Factory!5e0!3m2!1sen!2sin!4v1716786846912!5m2!1sen!2sin"
            className="w-full h-[400px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="flex flex-col gap-8 divide-y divide-gray-900/10 pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 gap-12 sm:gap-8">
            <div className="flex justify-center sm:justify-normal sm:items-start ">
              <div className="sm:max-w-[300px]">
                <h3 className="text-lg font-semibold text-black">
                  Teak Wood Factory
                </h3>
                <p className="mt-6 max-w- text-base text-gray-900">
                  Discover the timeless elegance of fine furniture on our site.
                  Find the perfect piece to illuminate your home and elevate
                  your living space
                </p>

                <ul role="list" className="mt-8 flex space-x-12">
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-600"
                      href="https://wa.me/918904088131"
                      target="_blank"
                    >
                      <span className="sr-only">Whatsapp</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/teakwoodfactory"
                      target="_blank"
                      className="text-gray-900 hover:text-gray-600"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="h-6 w-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/teakwoodfactory?igsh=MWY5aWc5MnM3MWY1eA=="
                      target="_blank"
                      className="text-gray-900 hover:text-gray-600"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="h-7 w-7"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-600"
                      href="https://www.youtube.com/@teakwoodfactory5203/featured"
                      target="_blank"
                    >
                      <span className="sr-only">Youtube</span>
                      <span className="[&>svg]:h-7 [&>svg]:w-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 576 512"
                        >
                          <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className=" flex sm:justify-center ">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-black">
                  Contact Information
                </h3>
                <dl className=" space-y-6 ">
                  <dt>
                    <span className="sr-only">Address</span>
                  </dt>
                  <dd className="flex text-base text-gray-900 ">
                    <BuildingStorefrontIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-900"
                      aria-hidden="true"
                    />
                    <p className="ml-3 ">
                      Teak Wood Factory
                      <br />
                      Akshya Complex, Metro Station, 2,
                      <br /> Kanakapura Rd, near Metro Pillar no 69,
                      <br /> J P Nagar 2nd Stage,
                      <br /> Bengaluru, Karnataka 560078, India
                    </p>
                  </dd>
                  <dt>
                    <span className="sr-only">Phone number</span>
                  </dt>
                  <dd className="flex text-base text-gray-900">
                    <PhoneIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-900"
                      aria-hidden="true"
                    />
                    <a href="tel:+918904088131" className="ml-3">
                      +91 89040 88131
                    </a>
                    <a href="tel:+919845054092" className="ml-3">
                      +91 98450 54092
                    </a>
                  </dd>
                  <dt>
                    <span className="sr-only">Email</span>
                  </dt>
                  <dd className="flex text-base text-gray-900">
                    <EnvelopeIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-900"
                      aria-hidden="true"
                    />
                    <span className="ml-3 font-">
                      <a href="mailto:teakwoodfactoryblr@gmail.com">
                        teakwoodfactoryblr@gmail.com
                      </a>
                    </span>
                  </dd>
                </dl>
              </div>
            </div>

            <div className="flex    sm:justify-start min-[900px]:justify-center ">
              <div className="flex flex-col gap-4">
                <h1 className="text-lg font-semibold text-black">
                  Quick links
                </h1>

                <a href="/" className="text-base leading-6 text-gray-900">
                  Home
                </a>
                <a href="/about" className="text-base leading-6 text-gray-900">
                  About
                </a>
              </div>
            </div>
          </div>

          <p className="py-8 text-center text-xs leading-5 text-gray-900 md:order-1 md:mt-0">
            &copy; 2024 TeakWood. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
