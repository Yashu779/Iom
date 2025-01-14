import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Login from './Components/Login';
import LandingPage from './Components/BuyingP';
import NotFound from './Components/NotFound';
import CartPage from './Components/Cart';



const PageRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
        <Route path="/buying-products" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} /> {/* 404 page */}
      </Switch>
    </Router>
  );
};

export default PageRoutes;
