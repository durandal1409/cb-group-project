import { useState, useEffect } from "react";
import GlobalStyle from "./globalStyles";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [itemCategory, setItemCategory] = useState(null);

  useEffect(() => {
    fetch("/")
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<div>message</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
