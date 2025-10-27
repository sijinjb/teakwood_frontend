// ...existing code...
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    // lightweight client validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError("Please complete all fields.");
      setLoading(false);
      return;
    }

    const formDatab = new FormData();
    Object.keys(formData).forEach((key) => {
      formDatab.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzYPvL1hFwtcvvox-FntlaokPSuTdy_9n07Q28EHqiU8Ledx0E1KQhxcF6bMsWw1Gf8/exec",
        { method: "POST", body: formDatab }
      );

      if (response.status === 200) {
        setSuccessMessage("Form submitted successfully. Our team will contact you soon.");
        setFormData({ name: "", phone: "", message: "" });
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-20 sm:py-24 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#083a37] to-[#0e6b66] px-6 py-16 sm:py-20 text-center shadow-2xl">
          {/* decorative floating cards - hidden on small screens to avoid layout issues */}
          <div className="hidden sm:block pointer-events-none absolute -left-20 -top-10 opacity-20 transform rotate-12">
            <div className="w-52 h-36 bg-white/10 rounded-2xl blur-sm" />
          </div>
          <div className="hidden sm:block pointer-events-none absolute -right-20 -bottom-12 opacity-20 transform -rotate-6">
            <div className="w-60 h-44 bg-white/10 rounded-3xl blur-sm" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="mx-auto max-w-2xl text-3xl sm:text-5xl font-extrabold tracking-tight text-white" style={{ fontFamily: "Inter, system-ui" }}>
              Discover Elegant Teakwood Furniture for Your Home
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 text-white/90">
              Handcrafted furniture with exquisite designs — bespoke finishes, sustainable teak, and white-glove delivery. Start a conversation with our design team.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto relative inline-flex items-center gap-3 justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 sm:px-8 py-3 text-white text-lg font-semibold shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-200 transform transition hover:-translate-y-0.5 active:scale-95"
              >
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                Get in Touch
                <span className="ml-2 hidden sm:inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">Quick response</span>
              </button>

              <a
                href="https://wa.me/918904088131"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white/95 hover:bg-white/20 transition"
              >
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* large soft circle behind for depth - reduce intensity on small screens */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#0ea59f] to-[#063634] opacity-8 blur-3xl sm:h-[36rem] sm:w-[36rem] sm:opacity-10" />
        </div>
      </div>

      {/* Form Modal */}
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 overflow-hidden">
                <div className="flex items-center justify-between bg-gradient-to-r from-[#0E6A66] to-[#15A098] px-4 sm:px-6 py-3">
                  <Dialog.Title className="text-lg font-semibold text-white">Get in Touch</Dialog.Title>
                  <button onClick={() => setIsModalOpen(false)} className="text-white rounded-md p-1 hover:bg-white/10">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  {error && <div className="mb-4 rounded-md bg-red-50 text-red-700 px-4 py-3">{error}</div>}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="block w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300"
                          placeholder="Your name"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="block w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300"
                          placeholder="+91 9XXXXXXXXX"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Message</label>
                      <div className="mt-1 relative rounded-md">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          required
                          className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300"
                          placeholder="Tell us about your project or request"
                        />
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] transition transform active:scale-95 disabled:opacity-60"
                      >
                        {loading ? "Submitting..." : <><ChatBubbleLeftEllipsisIcon className="h-5 w-5" /> Send Message</>}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  <p className="mt-3 text-xs text-gray-400">We respect your privacy. Your details will be used to contact you about your enquiry only.</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Success Modal */}
      <Transition show={isSuccessModalOpen} as={React.Fragment}>
        <Dialog open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} className="relative z-50">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                    <CheckBadgeIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <Dialog.Title className="text-lg font-semibold text-gray-900">Success!</Dialog.Title>
                    <p className="mt-2 text-sm text-gray-600">{successMessage || "Your request has been sent. We'll contact you soon."}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsSuccessModalOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-2 text-sm font-semibold text-white shadow hover:translate-y-[-1px] transition"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
// ...existing code...