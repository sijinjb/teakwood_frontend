import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

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
        setFormData({ name: '', phone: '', message: '' });
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-r from-[#0E6A66] to-[#15A098] px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Discover Elegant Teakwood Furniture for Your Home
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
            Handcrafted furniture with exquisite designs, bringing warmth and elegance to your space. Contact us today to learn more about our bespoke creations.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-[#0E6A66] shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Get in Touch
            </button>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#15A098" />
                <stop offset={1} stopColor="#0E6A66" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Improved Form Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:w-full sm:max-w-lg">
              <div className="bg-gradient-to-r from-[#0E6A66] to-[#15A098] px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                    Get in Touch
                  </Dialog.Title>
                  <XMarkIcon 
                    className="h-6 w-6 text-white cursor-pointer hover:text-gray-200 transition-colors duration-200" 
                    onClick={() => setIsModalOpen(false)} 
                  />
                </div>
              </div>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-4 py-3 border rounded-md border-gray-300 shadow-sm focus:border-[#0E6A66] focus:ring-[#0E6A66] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-4 py-3 border rounded-md border-gray-300 shadow-sm focus:border-[#0E6A66] focus:ring-[#0E6A66] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-4 py-3 border rounded-md border-gray-300 shadow-sm focus:border-[#0E6A66] focus:ring-[#0E6A66] sm:text-sm"
                    />
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full px-4 py-3 justify-center rounded-md bg-[#0E6A66] text-sm font-semibold text-white shadow-sm hover:bg-[#15A098] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6A66] sm:col-start-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="mt-3 inline-flex w-full px-4 py-3 justify-center rounded-md bg-white text-sm font-semibold text-[#0E6A66] shadow-sm ring-1 ring-inset ring-[#0E6A66] hover:bg-gray-50 sm:col-start-1 sm:mt-0 transition duration-300 ease-in-out"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>

      {/* Improved Success Modal */}
      <Dialog open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E6F4F3] sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-[#0E6A66]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Success!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{successMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-[#0E6A66] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#15A098] sm:ml-3 sm:w-auto transition duration-300 ease-in-out"
                  onClick={() => setIsSuccessModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}