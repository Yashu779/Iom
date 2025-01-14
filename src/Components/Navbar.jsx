import React, { useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount,  products, onCartClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    // Redirect to landing page with product data
    navigate("/buying-products", { state: { product } });
    setSearchTerm(""); // Clear the search term
    setIsSearchOpen(false); // Close the search dropdown
  };

  return (
    <div>
      <nav className="w-full bg-white text-[#002554] fixed top-8 left-0 z-40 p-3 font-bold shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left Section */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:underline">
              Water
            </a>
            <a href="#" className="hover:underline">
              Subscribe to Save
            </a>
            <a href="#" className="hover:underline">
              Our Story
            </a>
          </div>

          {/* Logo */}
          <div className="text-xl font-bold">
            <a href="https://www.iombio.com/" className="text-4xl font-serif">
              iom
            </a>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:underline">
              Find a Store
            </a>
            <a href="#" className="hover:underline">
              Rewards
            </a>
            <a href="#" className="hover:underline">
              Account
            </a>
          </div>

          {/* Search & Cart Section */}
          <div className="flex items-center space-x-4">
            {/* Search Button & Input */}
            {isSearchOpen && (
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="p-2 rounded border w-48 md:w-60"
                />
                {/* Matching Products Dropdown */}
                {filteredProducts.length > 0 && (
                  <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <li
                        key={product.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <button
              aria-label="Search"
              className="md:ml-4"
              onClick={toggleSearch}
            >
              <CiSearch size={22} />
            </button>

            {/* Cart Button */}
            <button aria-label="Cart" className="md:ml-4" onClick={onCartClick}>
              {cartCount > 0 && (
            <span className="ml-2 text-sm bg-red-600 text-white rounded-full px-2 py-1">
              {cartCount}
            </span>
          )}
              <CiShoppingCart size={22} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            aria-label="Open Menu"
            onClick={toggleMenu}
          >
            <div className="space-y-2">
              <span className="block w-8 h-0.5 bg-blue-500"></span>
              <span className="block w-8 h-0.5 bg-blue-500"></span>
              <span className="block w-8 h-0.5 bg-blue-500"></span>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="bg-white border-t border-gray-200 mt-2 p-4 md:hidden">
            <a href="#" className="block py-2 hover:underline">
              Water
            </a>
            <a href="#" className="block py-2 hover:underline">
              Subscribe to Save
            </a>
            <a href="#" className="block py-2 hover:underline">
              Our Story
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
