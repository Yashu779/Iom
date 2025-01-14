import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Email:', email);
    console.log('Phone:', phone);
  };

  return (
    <footer className="bg-white text-[002554] py-8">
      <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Text sections */}
        <div className="w-full md:w-2/3 mb-8 md:mb-0">
          <div className="flex flex-wrap justify-start gap-10">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Water</h3>
              <ul className="list-none text-sm">
                <li>Track Orders</li>
                <li>Reviews</li>
                <li>Locations</li>
                <li>Subscribe to Save</li>
                <li>Flavored Water</li>
                <li>Hint+ Vitamin</li>
                <li>Sparkling Water</li>
                <li>Caffeinated Water</li>
                <li>Kids Flavored Water</li>
                <li>Variety Packs</li>
                <li>Office Water Delivery</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Company</h3>
              <ul className="list-none text-sm">
                <li>Give $10, Get $10</li>
                <li>Hint® Rewards</li>
                <li>Press</li>
                <li>Careers</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Help</h3>
              <ul className="list-none text-sm">
                <li>My Account</li>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Return Policy</li>
                <li>Shipping Policy</li>
                <li>Sitemap</li>
                <li>Accessibility Statement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right side: Sign up form */}
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-2">Sign Up for Our Emails!</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address*</label>
              <input
                type="email"
                id="email"
                placeholder='email@iom.com*'
                className="w-full p-2 text-black rounded border border-[#D3D8DF]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Cell Phone (Optional)**</label>
              <input
                type="text"
                id="phone"
                placeholder='1612698639'

                className="w-full p-2 text-black rounded border border-[#D3D8DF]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="text-xs flex flex-col gap-5">
              <p>*By completing this form, you are signing up to receive our emails. You can unsubscribe at any time.</p>
              <p>**By signing up via text, you agree to receive marketing messages at the number provided. Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. Reply HELP for help or STOP to cancel. View our Privacy Policy and Terms of Service.</p>
            </div>
            <button type="submit" className="w-full bg-[#002554] text-[white] font-semibold p-2 rounded">Sign Up</button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-xs">
        <p>&copy; 2022 Hint Inc. All rights reserved.</p>
        <p>
          <a href="/terms" className="underline">Terms of Use</a> |
          <a href="/privacy" className="underline">Privacy Policy</a> |
          <a href="/do-not-sell" className="underline">Do Not Sell My Personal Information</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
