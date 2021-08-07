import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
