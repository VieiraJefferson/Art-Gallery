import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">Pallas Galaxy</div>
          <nav className="footer-nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Gallery</a>
            <a href="#">Contact</a>
          </nav>
        </div>

        <div className="footer-social">
          <a href="#" className="social-icon"><FaFacebookF /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaLinkedinIn /></a>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} VieiraDev. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
