import React, { useState, useEffect } from "react";

const CartPage = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  const handleRemoveFromCart = (itemToRemove) => {
    setCart(cart.filter(item => item.id !== itemToRemove.id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-[#002554]">Your Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-4 border-b">
            <img src={item.img} alt={item.name} className="h-20 w-auto" />
            <div className="flex-1 pl-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>{item.price} x {item.quantity}</p>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))
      )}
      
      {cart.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
          <button className="mt-4 w-full bg-[#002554] text-white py-4 rounded hover:bg-blue-700 font-semibold">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
