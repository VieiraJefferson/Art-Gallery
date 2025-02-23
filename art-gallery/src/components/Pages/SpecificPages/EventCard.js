import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Gallery from './components/Gallery';
import ArtistSection from './components/ArtistSection';
import Events from './components/Events';
import Footer from './components/Footer';
import './styles/main.scss';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <Banner />
      <Gallery />
      <ArtistSection />
      <Events />
      <Footer />
    </div>
  );
};

export default HomePage;
