import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { MovieMidia } from "./components/Midia/Midia";
import { Cast } from "./components/Cast/Cast";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/midia/:id" element={<MovieMidia />} />
        <Route path="movie/cast/:id" element={<Cast />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
