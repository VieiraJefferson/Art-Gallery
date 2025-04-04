import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import Gallery from "./components/Pages/Gallery";
import ArtistProfile from "./components/Pages/ArtistProfile";
import SubColecao from "./components/Pages/SubColecao";
import Loader from "./components/Pages/SpecificPages/Loader";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Contact from "./components/Pages/Contact";




function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Exibe o loader quando a rota muda
    setLoading(true);

    // Simula um tempo de carregamento (opcional)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de carregamento

    // Limpa o timer ao desmontar o componente
    return () => clearTimeout(timer);
  }, [location]); // Executa o efeito sempre que a rota muda

  return (
    <>
      {loading && <Loader />} {/* Exibe o loader enquanto loading for true */}
      <NavBar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artistProfile" element={<ArtistProfile />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subcolecao/:id" element={<SubColecao />} />
          <Route path="/colecao/:colecaoId/subcolecao/:subId" element={<SubColecao />} 
/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
