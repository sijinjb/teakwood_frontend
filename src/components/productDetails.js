// ...existing code...
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RupeeSign from "./../assets/icons/rupee.png";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); // overview | specs | features | reviews
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [copyStatus, setCopyStatus] = useState(""); // show copy feedback
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const { id } = useParams();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PORT}/api/product/${id}/`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) console.debug("product.description:", product.description);
  }, [product]);

  const handleBuyNowClick = () => {
    const message = `I'm interested in purchasing:\n\nProduct: ${product?.name}\nQty: ${quantity}\nColor: ${selectedColor || "N/A"}\nLink: ${getProductUrl()}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "918904088131";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const toggleWishlist = () => {
    setWishlisted((s) => !s);
    // Optionally: send wishlist update to backend here
  };

  // helper: product URL (use canonical product page when possible)
  const getProductUrl = () => {
    if (product?.uuid) return `https://www.teakwoodfactory.com/product/${product.uuid}`;
    return window.location.href;
  };

  // open WhatsApp share (no recipient) with prefilled message
  const handleShareClick = () => {
    const url = getProductUrl();
    const message = `Check this product: ${product?.name}\n${url}`;
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/?text=${encoded}`;
    window.open(waUrl, "_blank");
  };

  // copy product link and show feedback
  const handleCopyLink = async () => {
    const url = getProductUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2500);
    } catch (err) {
      console.error("Copy failed", err);
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(""), 2500);
    }
  };

  // submit review to backend and refresh product reviews
  const submitReview = async () => {
    setReviewError("");
    setReviewSuccess("");
    if (!reviewRating || reviewRating < 1 || reviewRating > 5) {
      setReviewError("Please select a rating (1-5).");
      return;
    }
    if (!reviewComment || reviewComment.trim().length < 5) {
      setReviewError("Please enter a comment (at least 5 characters).");
      return;
    }

    setSubmittingReview(true);
    try {
      // Adjust endpoint as per your backend. Common endpoint: POST /api/product/:id/reviews/
      await axios.post(
        `${process.env.REACT_APP_API_PORT}/api/product/${id}/reviews/`,
        {
          rating: reviewRating,
          comment: reviewComment.trim(),
          // optionally include author/email if user is logged in
        }
      );
      setReviewSuccess("Review submitted. Thank you!");
      setReviewRating(0);
      setReviewComment("");
      // refresh product so reviews and counts update
      await fetchProduct();
      // switch to reviews tab to show newly added review
      setActiveTab("reviews");
    } catch (err) {
      console.error("Submit review failed:", err);
      setReviewError("Failed to submit review. Try again.");
    } finally {
      setSubmittingReview(false);
      setTimeout(() => {
        setReviewError("");
        setReviewSuccess("");
      }, 4000);
    }
  };

  const productImages = [
    product?.image_one,
    product?.image_two,
    product?.image_three,
    product?.image_four,
    product?.image_five,
  ].filter(Boolean);

  const renderDimensions = () => {
    if (!product) return null;
    if (product.dimensions) return product.dimensions;
    const parts = [];
    if (product.length) parts.push(`${product.length}`);
    if (product.width) parts.push(`${product.width}`);
    if (product.height) parts.push(`${product.height}`);
    if (parts.length) return parts.join(" x ");
    if (product.size) return product.size;
    if (product.dimension) return product.dimension;
    return null;
  };

  // Returns { duration: '5-9 days', range: 'Oct 28 - Nov 2' }
  const estimateDelivery = () => {
    if (!product) {
      return { duration: "N/A", range: "" };
    }

    const defaultMin = 14;
    const defaultMax = 25;

    let minDays =
      Number(product.min_delivery_days) ||
      Number(product.shipping_min_days) ||
      Number(product.lead_time_min) ||
      defaultMin;
    let maxDays =
      Number(product.max_delivery_days) ||
      Number(product.shipping_max_days) ||
      Number(product.lead_time_max) ||
      defaultMax;

    if (minDays > maxDays) {
      const tmp = minDays;
      minDays = maxDays;
      maxDays = tmp;
    }

    const duration = minDays === maxDays ? `${minDays} days` : `${minDays}-${maxDays} days`;

    const today = new Date();
    const min = new Date(today);
    min.setDate(today.getDate() + minDays);
    const max = new Date(today);
    max.setDate(today.getDate() + maxDays);
    const options = { month: "short", day: "numeric" };
    const range = `${min.toLocaleDateString(undefined, options)} - ${max.toLocaleDateString(
      undefined,
      options
    )}`;

    return { duration, range };
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  const delivery = estimateDelivery();

  // helper to render stars for display (filled/unfilled)
  const StarsDisplay = ({ value = 0 }) => (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < value ? "text-yellow-400" : "text-gray-300"}`}
          viewBox="0 0 24 24"
          fill={i < value ? "currentColor" : "none"}
          stroke="currentColor"
        >
          <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.563L19.335 24 12 20.012 4.665 24l1.634-8.687L.6 9.75l7.732-1.732z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl pt-20 md:pt-28 lg:px-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
            {/* Left: Media */}
            <div>
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-white h-[420px] md:h-[560px] flex items-center justify-center">
                <img
                  src={
                    productImages[selectedImage]
                      ? `${process.env.REACT_APP_API_PORT}${productImages[selectedImage]}`
                      : "https://plus.unsplash.com/premium_photo-1683140425081-14c44089acd0?w=900&auto=format&fit=crop&q=60"
                  }
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transform transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 text-xs text-gray-700 px-3 py-1 rounded-md shadow">
                  {product.category?.name || "Product"}
                </div>
                <button
                  onClick={toggleWishlist}
                  aria-label="Add to wishlist"
                  className={`absolute top-4 right-4 p-2 rounded-full shadow ${
                    wishlisted ? "bg-red-50 text-red-600" : "bg-white text-gray-600"
                  }`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-7.5-4.873-10-8.06C-0.4 8.93 4.372 3 12 8.5 19.628 3 24.4 8.93 22 12.94 19.5 16.127 12 21 12 21z" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
                {productImages.length ? (
                  productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-none w-20 h-20 rounded-lg overflow-hidden border transition-shadow duration-150 ${
                        selectedImage === idx ? "ring-2 ring-[#0E6B66] shadow" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_PORT}${img}`}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))
                ) : (
                  <div className="text-gray-500">No images</div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <div>SKU: <span className="font-medium text-gray-800">{product.sku || "—"}</span></div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#0E6B66]">{product.name}</h1>
                  <p className="mt-1 text-sm text-gray-500">{product.brand ? product.brand + " • " : ""}{product.material || ""}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <img src={RupeeSign} alt="Rupee" className="h-4" />
                    <div className="text-2xl font-semibold">{product.price}</div>
                  </div>
                  <div className="text-xs text-gray-500">/ piece</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center">
                  <StarsDisplay value={Math.round(product.average_rating || 0)} />
                </div>
                <div className="text-sm text-gray-600">{product.reviews_count || 0} reviews</div>
                <div className="text-sm text-gray-600">•</div>
                <div className="text-sm text-gray-600">{product.warranty ? `${product.warranty} yr warranty` : "No warranty"}</div>
              </div>

              <div className="mt-6 flex items-center gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Quantity</div>
                  <div className="inline-flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-gray-700"
                    >
                      −
                    </button>
                    <div className="px-4 py-2 font-medium">{quantity}</div>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Delivery</div>
                  <div className="text-sm font-medium" title={delivery.range}>
                    {delivery.duration}
                  </div>
                  <div className="text-xs text-gray-500">Free delivery Around 30Kms</div>
                </div>

                <div className="ml-auto hidden md:flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-1.2 17.1L4.8 11.1l1.44-1.44 4.56 4.56 7.2-7.2L19.2 8.4 10.8 17.1z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Secure payment</div>
                      <div className="text-sm font-medium">Trusted checkout</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleBuyNowClick}
                  className="bg-[#0E6B66] text-white px-6 py-3 rounded-lg font-semibold shadow hover:opacity-95 transition"
                >
                  Buy Now
                </button>
                <a
                  href={`https://wa.me/918904088131?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} - https://www.teakwoodfactory.com/product/${product.uuid}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gray-200 px-4 py-3 rounded-lg text-sm inline-flex items-center gap-2 hover:bg-gray-50"
                >
                  Message
                </a>
                <button
                  onClick={handleShareClick}
                  className="text-sm text-gray-600 underline"
                >
                  Share
                </button>
                <button
                  onClick={handleCopyLink}
                  className="text-sm text-gray-600 underline ml-2"
                >
                  {copyStatus || "Copy link"}
                </button>
              </div>

              {/* Tabs */}
              <div className="mt-8">
                <div className="flex gap-4 border-b border-gray-100">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-3 ${activeTab === "overview" ? "text-[#0E6B66] border-b-2 border-[#0E6B66]" : "text-gray-600"}`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`pb-3 ${activeTab === "specs" ? "text-[#0E6B66] border-b-2 border-[#0E6B66]" : "text-gray-600"}`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`pb-3 ${activeTab === "features" ? "text-[#0E6B66] border-b-2 border-[#0E6B66]" : "text-gray-600"}`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-3 ${activeTab === "reviews" ? "text-[#0E6B66] border-b-2 border-[#0E6B66]" : "text-gray-600"}`}
                  >
                    Reviews
                  </button>
                </div>

                <div className="mt-4">
                  {activeTab === "overview" && (
                    <div className="text-gray-700 text-sm sm:text-base space-y-3">
                      {product.description ? (
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                      ) : (
                        <p className="text-gray-500">No description available.</p>
                      )}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-[#0E6B66] font-semibold">✓</span>
                          <span>Handcrafted teak wood</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#0E6B66] font-semibold">✓</span>
                          <span>Eco-friendly finishes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#0E6B66] font-semibold">✓</span>
                          <span>2-year warranty</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#0E6B66] font-semibold">✓</span>
                          <span>Custom sizes available</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "specs" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Dimensions</div>
                        <div className="font-medium">{renderDimensions() || "N/A"}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Material</div>
                        <div className="font-medium">{product.material || "—"}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Brand</div>
                        <div className="font-medium">{product.brand || "—"}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Origin</div>
                        <div className="font-medium">{product.country_of_origin || "—"}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Warranty</div>
                        <div className="font-medium">{product.warranty ? `${product.warranty} year(s)` : "—"}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Sold By</div>
                        <div className="font-medium">{product.sold_by || "—"}</div>
                      </div>
                    </div>
                  )}

                  {activeTab === "features" && (
                    <div className="text-gray-700 text-sm sm:text-base">
                      {product.features ? (
                        <div dangerouslySetInnerHTML={{ __html: product.features }} />
                      ) : (
                        <p className="text-gray-500">No features listed.</p>
                      )}
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-semibold">{product.average_rating || "0.0"}</div>
                          <div className="text-sm text-gray-600">{product.reviews_count || 0} reviews</div>
                        </div>
                      </div>

                      {/* Review form */}
                      <div className="p-4 bg-gray-50 rounded mb-4">
                        <div className="text-sm font-medium mb-2">Write a review</div>
                        <div className="flex items-center gap-2 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const val = i + 1;
                            return (
                              <button
                                key={val}
                                onClick={() => setReviewRating(val)}
                                type="button"
                                className={`p-1 ${reviewRating >= val ? "text-yellow-400" : "text-gray-300"}`}
                                aria-label={`Rate ${val} star${val > 1 ? "s" : ""}`}
                              >
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill={reviewRating >= val ? "currentColor" : "none"} stroke="currentColor">
                                  <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.563L19.335 24 12 20.012 4.665 24l1.634-8.687L.6 9.75l7.732-1.732z" />
                                </svg>
                              </button>
                            );
                          })}
                        </div>

                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          rows={4}
                          placeholder="Write your review..."
                          className="w-full p-3 border rounded mb-2 text-sm"
                        />

                        {reviewError && <div className="text-sm text-red-600 mb-2">{reviewError}</div>}
                        {reviewSuccess && <div className="text-sm text-green-600 mb-2">{reviewSuccess}</div>}

                        <div className="flex items-center gap-3">
                          <button
                            onClick={submitReview}
                            disabled={submittingReview}
                            className="bg-[#0E6B66] text-white px-4 py-2 rounded font-medium disabled:opacity-60"
                          >
                            {submittingReview ? "Submitting..." : "Submit review"}
                          </button>
                          <button
                            onClick={() => {
                              setReviewRating(0);
                              setReviewComment("");
                              setReviewError("");
                              setReviewSuccess("");
                            }}
                            className="text-sm text-gray-600 underline"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>

                      {/* Reviews list */}
                      {product.reviews && product.reviews.length ? (
                        <div className="space-y-3">
                          {product.reviews.map((r, idx) => (
                            <div key={idx} className="p-3 bg-white rounded shadow-sm">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="text-sm font-medium">{r.author || "Anonymous"}</div>
                                  <div className="text-xs text-gray-500">{r.date || ""}</div>
                                </div>
                                <div className="text-sm text-yellow-400">
                                  <StarsDisplay value={Number(r.rating) || 0} />
                                </div>
                              </div>
                              <div className="mt-2 text-sm text-gray-700">{r.comment}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* bottom: related content / trust strip */}
          <div className="border-t bg-gray-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#0E6B66]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L15 8h9l-7 5 3 9-8-6-8 6 3-9L0 8h9z"/></svg>
                <div>
                  <div className="font-medium">Premium Teak</div>
                  <div className="text-xs">Seasoned & treated</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-[#0E6B66]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5"/></svg>
                <div>
                  <div className="font-medium">Free assembly</div>
                  <div className="text-xs">On select items</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="text-sm text-gray-600 underline"
              >
                {copyStatus || "Copy link"}
              </button>
              <a
                href={`https://wa.me/918904088131?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} - ${getProductUrl()}`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#0E6B66] font-medium"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>

        {/* show latest reviews below product (summary) */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Latest reviews</h2>
          {product.reviews && product.reviews.length ? (
            <div className="space-y-3">
              {product.reviews.slice(0, 3).map((r, i) => (
                <div key={i} className="p-3 bg-white rounded shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium">{r.author || "Anonymous"}</div>
                      <div className="text-xs text-gray-500">{r.date || ""}</div>
                    </div>
                    <div className="text-sm text-yellow-400">
                      <StarsDisplay value={Number(r.rating) || 0} />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">{r.comment}</div>
                </div>
              ))}
              <div className="mt-2">
                <button onClick={() => setActiveTab("reviews")} className="text-sm text-[#0E6B66] underline">See all reviews & write one</button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* mobile sticky CTA */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden w-[92%]">
          <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">From</div>
              <div className="flex items-center gap-1">
                <img src={RupeeSign} alt="Rupee" className="h-3" />
                <span className="font-semibold">{product.price}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBuyNowClick}
                className="bg-[#0E6B66] text-white px-4 py-2 rounded-md font-medium"
              >
                Buy now
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="border border-gray-200 px-4 py-2 rounded-md"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;