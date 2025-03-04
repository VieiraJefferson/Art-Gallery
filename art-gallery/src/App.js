import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import Gallery from "./components/Pages/Gallery";
import ArtistProfile from "./components/Pages/ArtistProfile";
import Colecao from "./components/Pages/Colecao";
import SubColecao from "./components/Pages/SubColecao";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Pages/Contact";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artistProfile" element={<ArtistProfile />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/colecao/:id" element={<Colecao/>} />
          <Route path="/subcolecao/:id" element={<SubColecao />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
