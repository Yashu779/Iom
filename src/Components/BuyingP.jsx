import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import Footer from "./Footer";

const LandingPage = () => {
  const products = [
    {
      id: 1,
      name: "GutSens",
      price: "$22.99",
      description:
        "Fight poor sleep, low energy and high stress. Let your gut tell you how.",
      img: "https://www.iombio.com/static/media/SensIt-Box.7520a208138d416e1c14.png",
      rating: 5043,
    },
    {
      id: 2,
      name: "Gut360",
      price: "$18.99",
      description:
        "Know all about health through your gut. Add the M factor to your wellness.",
      img: "https://www.iombio.com/static/media/IntoIt_Box.956aa9744cb6c9e45ab7.png",
      rating: 4000,
    },
    {
      id: 3,
      name: "IBS Heal",
      price: "$25.99",
      description:
        "Reduce chronic bloating, constipation, diarrhoea, abdominal pain and more.",
      img: "https://www.iombio.com/static/media/heal.043e4b97cdfa838c373a.png",
      rating: 3570,
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; // Initialize quantity for each product
      return acc;
    }, {})
  );

  const Navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  useEffect(() => {
    if (product) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: 1, // Reset quantity for selected product
      }));
    }
  }, [product]);

  const handleAddToCart = async (product, quantity) => {
    // Storing user and product data in Firebase
    const userName = "User Name"; // Replace with actual user data if logged in
    try {
      // Adding user and product information to Firestore
      await addDoc(collection(db, "orders"), {
        userName,
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        quantity,
        dateAdded: new Date(),
      });
  
      // Add product to cart
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity }]);
      }
    } catch (error) {
      console.error("Error adding to Firebase: ", error);
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[productId] + change;
      return newQuantity >= 1
        ? { ...prevQuantities, [productId]: newQuantity }
        : prevQuantities;
    });
  };

  const handleCartClick = () => {
    Navigate("/cart");
  };

  const handleProductClick = (product, index) => {
    setSelectedProduct(product);
    setSelectedIndex(index);
    setQuantities(1); // Reset quantity when selecting a new product
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="w-screen font-inter min-h-screen bg-gray-50">
      <Helmet>
        <title>iom Products - Buy Health Supplements Online</title>
        <meta
          name="description"
          content="Browse our selection of health supplements, including GutSens, Gut360, and IBS Heal. Order online today!"
        />
        <meta
          name="keywords"
          content="health supplements, gut health, IBS, GutSens, Gut360"
        />
      </Helmet>
      {/* Banner */}
      <div className="w-full bg-[#002554] text-white text-center py-2 fixed top-0 left-0 z-50">
        Banner To promote anything :)
      </div>

      {/* Navigation Bar */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={(term) => setSearchTerm(term)}
        onCartClick={handleCartClick}
        products={products}
        cartCount={cartCount}
      />

      {/* Main Content */}
      <div className="pt-32 bg-white">
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row items-center justify-between py-8">
            {/* Carousel Section */}
            <div className="w-full max-w-xl sm:h-[90vh]">
              <Carousel
                autoPlay={false}
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                selectedItem={selectedIndex}
                renderArrowPrev={() => null}
                renderArrowNext={() => null}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  return (
                    <li
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        margin: "30px 8px",
                        borderRadius: "50%",
                        backgroundColor: isSelected ? "#002554" : "#ccc",
                        cursor: "pointer",
                      }}
                      onClick={() => handleProductClick(products[index], index)}
                      onKeyDown={onClickHandler}
                      value={index}
                      role="button"
                      tabIndex={0}
                      aria-label={`Slide ${label}`}
                    />
                  );
                }}
              >
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex justify-center h-[80vh]"
                    onClick={() => handleProductClick(product, index)}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-96 w-auto object-contain"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8 max-w-lg flex flex-col justify-start items-start">
              <h1 className="text-4xl font-semibold text-[#002554] pb-5">
                {selectedProduct.name}
              </h1>
              <h1 className="text-1xl font-inter text-[#686D73]">
                {selectedProduct.description}
              </h1>
              <p className="text-gray-500 mt-2 flex justify-center items-center gap-3">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < selectedProduct.rating
                        ? "text-[#002554]"
                        : "text-gray-300"
                    }
                  />
                ))}
                {` ${selectedProduct.rating} Reviews`}
              </p>
              <p className="text-gray-500 mt-1">
                12 Boxes / case (16 ounces each)
              </p>

              <select className="w-full p-5 border border-gray-300 rounded mt-4 text-[#002554] font-semibold">
                <option className="text-[#002554]">
                  {selectedProduct.name}
                </option>
              </select>

              <div className="mt-4 p-4 w-full flex flex-col">
                <label className="block text-[#686D73] font-medium">
                  Select your plan
                </label>
                <div className="mt-2 space-y-4">
                  {/* One-time order */}
                  <div className="flex items-center border border-gray-300 rounded p-3 text-[#002554]">
                    <input
                      type="radio"
                      name="plan"
                      className="h-4 w-4 text-[#002554]"
                    />
                    <div className="flex justify-between w-full">
                      <label className="ml-2">One time order:</label>
                      <h1 className="text-center">{selectedProduct.price}</h1>
                    </div>
                  </div>

                  {/* Subscribe to save */}
                  <div className="mt-4 flex  flex-col p-3 items-start  justify-start border-2 rounded-lg border-[#002554] h-[28vh] w-full">
                    <div className="w-full flex items-center text-[#002554] justify-between pb-4">
                      <input
                        type="radio"
                        name="plan"
                        className="h-4 w-4 text-[#002554]"
                      />
                      <div className="w-full flex justify-between">
                        <label className="ml-2 font-semibold">
                          Subscribe to save:
                        </label>
                        <h1 className="text-center text-red-600 font-semibold">
                          $19.90
                        </h1>
                      </div>
                    </div>
                    <label className="block text-sm text-[#002554] font-medium">
                      Delivery Every
                    </label>
                    <div className="w-full border border-gray-300 rounded-lg p-3 mt-5">
                      <input
                        type="text"
                        value="30 Days"
                        readOnly
                        className="text-start w-full pl-5"
                      />
                    </div>
                    <h1 className=" text-sm text-[#4E4E4E] font-semibold p-2">
                      no commitment, cancel anytime
                    </h1>
                  </div>
                  {/* Delivery & Subscription duration */}
                </div>
              </div>

              <div className="w-full flex items-center justify-between mt-4 bg-gray-100 p-4 rounded">
                <button className="px-2 text-lg font-bold text-[#002554]">
                  -
                </button>
                <div className="mx-4 flex flex-col items-center">
                  <span className="text-2xl font-bold">1</span>
                  <span className="text-sm text-[#002554]">case</span>
                </div>
                <button className="px-2 text-lg font-bold text-[#002554]">
                  +
                </button>
              </div>

              <button
                className="mt-6 w-full bg-[#002554] text-white py-4 rounded hover:bg-blue-700 font-semibold"
                onClick={() =>
                  handleAddToCart(
                    selectedProduct,
                    quantities[selectedProduct.id]
                  )
                }
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* "You May Also Like" Section */}
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-center text-[#002554]">
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full flex flex-col items-center"
                >
                  {/* Product Card */}
                  <div
                    className="border border-gray-200 rounded-lg p-8 bg-slate-100 shadow-sm cursor-pointer hover:shadow-md"
                    onClick={() => handleProductClick(product, product.id - 1)}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-40 w-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="w-[80%] flex flex-col text-center mt-3">
                    <div className="flex justify-between">
                      <p className="text-lg font-medium text-[#002554]">
                        {product.name}
                      </p>
                      <p className="text-[#002554] mt-1 font-semibold">
                        {product.price}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start text-start">
                      <h1 className="text-[#686D73] text-sm p-4">
                        1 case of 12 boxes
                      </h1>
                      <div className="flex flex-col gap-4 items-center justify-center bg-white rounded-lg p-1 sm:flex-row">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(selectedProduct.id, -1)
                            }
                            className="w-10 px-4 py-1 bg-gray-200 font-bold text-xl text-gray-700 rounded-l-lg hover:bg-gray-300"
                          >
                            -
                          </button>
                          <div className="flex items-center gap-1 px-6 py-2 bg-white text-center">
                            <p className="text-lg font-medium">
                              {quantities[selectedProduct.id]}
                            </p>
                            <p className="text-sm text-gray-500">case</p>
                          </div>
                          <button
                            onClick={() =>
                              handleQuantityChange(selectedProduct.id, 1)
                            }
                            className="w-10 px-4 py-1 bg-gray-200 font-bold text-xl text-gray-700 rounded-r-lg hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="w-full sm:w-40 px-4 py-2 font-semibold bg-[#002554] text-white rounded-md hover:bg-blue-600"
                          onClick={() =>
                            handleAddToCart(
                              product, // Use the correct product from the map
                              quantities[product.id] // Use the correct quantity for the clicked product
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
