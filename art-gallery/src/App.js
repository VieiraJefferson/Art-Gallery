import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import Gallery from "./components/Pages/Gallery";
import Events from "./components/Pages/Events";
import ArtistProfile from "./components/Pages/ArtistProfile";

import { BrowserRouter as Router,
  Routes,
  Route
  } from "react-router-dom";


function App() {
  return (
    <div className="App">
       <NavBar />
       
       <div className="container main">
       <HomePage />
      
       </div>
       <Footer />
    </div>
  );
}

export default App;
