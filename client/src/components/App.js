import { useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";

function App() {
  const [itemCategory, setItemCategory] = useState(null);

  useEffect(() => {
    fetch("/")
      .then((res) => res.json())
      .then((data) => setItemCategory(data));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<div>message</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
