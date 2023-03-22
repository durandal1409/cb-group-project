import { useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Home from "./Home";
import Item from "./Item";
import Profile from "./Profile";
import Cart from "./Cart";
import Confirmation from "./Confirmation";

function App() {
  // const [itemsCategory, setItemsCategory] = useState(null);

  // useEffect(() => {
  //   fetch("/")
  //     .then((res) => res.json())
  //     .then((data) => setBacon(data));
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemId" element={<Item />} />
          <Route path="/company-profile/:companyId" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<h1>404: Oops!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
