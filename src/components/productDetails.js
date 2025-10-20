import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RupeeSign from "./../assets/icons/rupee.png";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

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

  // Handle buy now click and include the selected color
  const handleBuyNowClick = () => {
    const message = `I'm interested in purchasing the following product:\n\nProduct Name: ${product?.name}\nLink:https://www.teakwoodfactory.com/product/${product?.uuid}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "918904088131";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const productImages = [
    product?.image_one,
    product?.image_two,
    product?.image_three,
    product?.image_four,
    product?.image_five,
  ].filter(Boolean);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl pt-20 md:pt-28 lg:px-8 px-6">
        <div className="text-2xl text-[#0E6B66] font-semibold mb-6">
          Product Details
        </div>
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12">
        <h1 className="text-base md:hidden block sm:text-xl capitalize font-semibold ">
              {product.name}
            </h1>
          <div className="md:w-[40%]">
            <div className="h-[250px] sm:h-[350px] rounded-lg bg-[#CCCCCC] mb-4">
              <img
                src={
                  productImages[selectedImage]
                    ? `${process.env.REACT_APP_API_PORT}${productImages[selectedImage]}`
                    : "https://plus.unsplash.com/premium_photo-1683140425081-14c44089acd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGZ1cm5pdHVyZXN8ZW58MHwwfDB8fHww"
                }
                alt={product.name}
                className="w-full h-full p-4 object-contain"
              />
            </div>
            <div className="flex justify-center gap-2">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_API_PORT}${img}`}
                  alt={`Product ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer ${
                    selectedImage === index ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="md:w-[60%] h-auto w-full">
            <h1 className="text-base md:block hidden sm:text-xl capitalize font-semibold mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              {product.description}
            </p>
            {/* <p className="text-lg font-semibold flex items-center mb-4">
              <img src={RupeeSign} alt="Rupee" className="h-5 w-auto mr-1" />
              {product.price}
            </p> */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold">Category:</p>
                <p>{product.category.name}</p>
              </div>
              <div>
                <p className="font-semibold">Material:</p>
                <p>{product.material}</p>
              </div>
              <div>
                <p className="font-semibold">Brand:</p>
                <p>{product.brand}</p>
              </div>
              <div className=" mt-4">
              <p className="font-semibold">Color:</p>
                <div className="flex mt-[2px] space-x-2">
                  {Array.isArray(product?.color) ? (
                    product?.color.map((color, index) => (
                      <div
                        key={index}
                        onClick={() => handleColorSelect(color)}
                        style={{ backgroundColor: color }}
                        className={`w-4 h-4 rounded-full cursor-pointer ${
                          selectedColor === color
                            ? "ring-1 ring-offset-1 ring-blue-500"
                            : ""
                        }`}
                      />
                    ))
                  ) : (
                    <div
                      onClick={() => handleColorSelect(product?.color)}
                      style={{ backgroundColor: product?.color }}
                      className="w-4 h-4 rounded-full cursor-pointer ring-1 ring-offset-1 ring-blue-500"
                    />
                  )}
                </div>
              </div>

              <div>
                <p className="font-semibold">Warranty:</p>
                <p>{product.warranty} years</p>
              </div>
              <div>
                <p className="font-semibold">Sold By:</p>
                <p>{product.sold_by}</p>
              </div>
              <div>
                <p className="font-semibold">Features:</p>
                <p>{product.features}</p>
              </div>
              <div>
                <p className="font-semibold">Origin:</p>
                <p>{product.country_of_origin}</p>
              </div>
            </div>
            <div
              onClick={handleBuyNowClick}
              className="mt-8 w-[180px] mx-auto md:mx-0 text-sm flex justify-center font-medium items-center gap-2 cursor-pointer sm:text-base sm:w-[200px] bg-[#0E6B66] text-white px-4 py-[10px] rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Buy now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
