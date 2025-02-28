import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import Gallery from "./components/Pages/Gallery";
import ArtistProfile from "./components/Pages/ArtistProfile";



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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
