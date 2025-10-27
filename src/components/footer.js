import React from "react";
import {
  BuildingStorefrontIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-white to-gray-50/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Map (kept exactly as original src) */}
        <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.037768050279!2d77.57062277481872!3d12.905293016329095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b03ec4509f%3A0x54d1312d9f5e79bc!2sTeak%20Wood%20Factory!5e0!3m2!1sen!2sin!4v1716786846912!5m2!1sen!2sin"
            className="w-full h-[360px] sm:h-[420px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Teak Wood Factory location"
          ></iframe>
        </div>

        {/* Main footer grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & social */}
          <div className="space-y-6">
            <h2 className="text-2xl text-[#0E6B66] font-extrabold">Teak Wood Factory</h2>
            <p className="text-gray-700 max-w-md">
              Discover the timeless elegance of fine furniture on our site. Find the perfect piece to illuminate your home and elevate your living space
            </p>

            <div className="flex items-center gap-3">
              {/* Social icons (preserve all links) */}
              <a
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white shadow hover:scale-105 transition"
                href="https://wa.me/918904088131"
                target="_blank"
                rel="noreferrer"
                aria-label="Whatsapp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>

              <a
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white shadow hover:scale-105 transition"
                href="https://www.facebook.com/teakwoodfactory"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 text-blue-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>

              <a
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white shadow hover:scale-105 transition"
                href="https://www.instagram.com/teakwoodfactory?igsh=MWY5aWc5MnM3MWY1eA=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 text-pink-600" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>

              <a
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white shadow hover:scale-105 transition"
                href="https://www.youtube.com/@teakwoodfactory5203/featured"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5 text-red-600" viewBox="0 0 576 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact information */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <dl className="mt-4 space-y-6 text-gray-700">
              <div className="flex items-start gap-3">
                <BuildingStorefrontIcon className="h-6 w-6 text-gray-900 flex-shrink-0" />
                <div>
                  <p className="font-medium">Teak Wood Factory</p>
                  <p className="mt-1 text-sm leading-relaxed">
                    Akshya Complex, Metro Station, 2,
                    <br /> Kanakapura Rd, near Metro Pillar no 69,
                    <br /> J P Nagar 2nd Stage,
                    <br /> Bengaluru, Karnataka 560078, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneIcon className="h-6 w-6 text-gray-900 flex-shrink-0" />
                <div className="text-sm">
                  <a href="tel:+918904088131" className="hover:underline">+91 89040 88131</a>
                  <span className="mx-3 text-gray-400">|</span>
                  <a href="tel:+919845054092" className="hover:underline">+91 98450 54092</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-6 w-6 text-gray-900 flex-shrink-0" />
                <div className="text-sm">
                  <a href="mailto:teakwoodfactoryblr@gmail.com" className="hover:underline">teakwoodfactoryblr@gmail.com</a>
                </div>
              </div>
            </dl>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Quick links</h3>
              <nav className="mt-4 flex flex-col gap-2 text-gray-700">
                <a href="/" className="hover:text-[#0E6B66]">Home</a>
                <a href="/about" className="hover:text-[#0E6B66]">About</a>
                <a href="/products" className="hover:text-[#0E6B66]">Shop all products</a>
                <a href="/categories" className="hover:text-[#0E6B66]">Collections</a>
                <a href="/policies" className="hover:text-[#0E6B66]">Policies</a>
              </nav>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p className="py-4">© 2024 TeakWood. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Bottom legal / small print */}
        <div className="mt-8 border-t pt-6 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} TeakWood. All rights reserved.</div>
          <div>Made with care • <a href="/privacy" className="text-[#0E6B66] hover:underline">Privacy</a></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;