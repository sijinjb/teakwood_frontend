import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
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
      "We provide doorstep delivery to your location with flexible scheduling via WhatsApp.",
  },
  {
    question: "Do you offer customization options?",
    answer:
      "Yes, certain items can be customized to suit your preferences; contact us on WhatsApp to discuss.",
  },
  {
    question: "What is your warranty policy?",
    answer: "Our warranty period is 1.5 years for all products.",
  },
  {
    question: "Do you offer free delivery?",
    answer: "Yes, we offer free delivery to Bangalore locations.",
  },

  // More questions...
];

export default function FAQ({ paddingTop }) {
  return (
    <div className="bg-white">
      <div
        className={`mx-auto max-w-7xl px-6 ${
          paddingTop && "pt-14 sm:pt-24"
        } lg:px-8 `}
      >
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-[#0E6B66]">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronDownIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <ChevronRightIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-900">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
