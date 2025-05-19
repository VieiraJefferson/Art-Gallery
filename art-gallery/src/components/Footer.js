import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Top Section */}
        <div className="footer-top">
          {/* <div className="footer-logo">Pallas Galaxy</div> */}
          {/* <nav className="footer-nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Gallery</a>
            <a href="#">Contact</a>
          </nav> */}
        </div>

        {/* Middle Section - 4 Widgets */}
        <div className="footer-widgets">
          {/* Widget 1: About */}
          <div className="widget">
            <h6 className="widget-title">About</h6>
            <p>
              Blending surrealism and symbolism, Maria Pallas crafts
              thought-provoking works exploring solitude, connection, and the
              human experience.
              <p>
                Their art juxtaposes whimsical and macabre elements, placing
                familiar figures in dreamlike settings.
              </p>
              <p>
                Through striking contrasts in color, texture, and subject
                matter, their pieces balance emotion and abstraction, inviting
                deep reflection.
              </p>
              <p>
                From intimate portraits to fantastical landscapes, each artwork
                challenges perception and encourages viewers to uncover layered
                meanings.
              </p>
            </p>
            {/* <p>
              Etiam facilisis eu nisi scelerisque faucibus. Proin semper suscipit
              magna, nec imperdiet lacus semper.
            </p> */}
          </div>

          {/* Widget 2: Recent Work */}
          <div className="widget">
            <h6 className="widget-title">Recent Work</h6>
            <div className="gallery">
              <img
                src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212374/galeria/galeria/Pallas%20Galaxy%20Collection/2013/vo1pkpeffa9zicymspur.jpg"
                alt="Gallery 1"
                className="gallery-image"
              />
              <img
                src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212478/galeria/galeria/Pallas%20Galaxy%20Collection/2014-2015/vu5f5rogzonirpovxttn.jpg"
                alt="Gallery 2"
                className="gallery-image"
              />
              <img
                src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212774/galeria/galeria/Pallas%20Galaxy%20Collection/Till%20Today/pkus7hs7foydedh85s81.jpg"
                alt="Gallery 3"
                className="gallery-image"
              />
              <img
                src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212770/galeria/galeria/Pallas%20Galaxy%20Collection/Till%20Today/iij4gg9pjmhh6q79bojf.jpg"
                alt="Gallery 4"
                className="gallery-image"
              />
              <img
                src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212510/galeria/galeria/Pallas%20Galaxy%20Collection/2014-2015/ci8mpomeekat8xvw8i1b.gif"
                alt="Gallery 5"
                className="gallery-image"
              />
              <img
                src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212063/galeria/Pallas%20Galaxy%20Collection/lbp9onud38upck3uy2ol.jpg"
                alt="Gallery 6"
                className="gallery-image"
              />
            </div>
          </div>

          {/* Widget 3: Tags */}
          <div className="widget">
            <h6 className="widget-title">Tags</h6>
            <div className="tag-cloud">
              <a href="#" className="tag">
                Surrealism
              </a>
              <a href="#" className="tag">
                Contemporary surrealism
              </a>
              <a href="#" className="tag">
                Original art for sale
              </a>
              <a href="#" className="tag">
                Emotional depth
              </a>
              <a href="#" className="tag">
                Visual storytelling
              </a>
              <a href="#" className="tag">
                Dreamlike art
              </a>
              <a href="#" className="tag">
                Symbolism
              </a>
              <a href="#" className="tag">
                Fantasy art
              </a>
              <a href="#" className="tag">
                Bold color palettes
              </a>
            </div>
          </div>

          {/* Widget 4: Recent News */}
          <div className="widget">
            <h6 className="widget-title">Recent News</h6>
            <div className="recent-posts">
              <div className="post">
                <img
                  src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212813/galeria/galeria/Pallas%20Galaxy%20Collection/Till%20Today/biv2s3v9ij8tnljzyjo8.jpg"
                  alt="Post 1"
                  className="post-image"
                />
                <div className="post-content">
                  <h4>"A Fusion of Texture, Contrast, and Culture"</h4>
                  <p>
                    {/* <span>17 Nov</span> |  */}
                    <span>0 Comments</span>
                  </p>
                </div>
              </div>
              <div className="post">
                <img
                  src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741531855/are_you_gonna_hurt_me_now_are_you_gonna_hurt_me_later_-_Kopie_uy81bl_Square_3_cm5jyi.jpg"
                  alt="Post 2"
                  className="post-image"
                />
                <div className="post-content">
                  <h4>
                    "Whispers of the Surreal: A Journey Through Dream and Drama"
                  </h4>
                  <p>
                    <span>17 Nov</span>
                    {/* | <span>0 Comments</span> */}
                  </p>
                </div>
              </div>
              <div className="post">
                <img
                  src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212774/galeria/galeria/Pallas%20Galaxy%20Collection/Till%20Today/pkus7hs7foydedh85s81.jpg"
                  alt="Post 3"
                  className="post-image"
                />
                <div className="post-content">
                  <h4>"Emotions in Motion: A Symphony of Color and Texture"</h4>
                  <p>
                    <span>3 Nov</span> |{/* <span>1 Comment</span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social Icons */}
        <div className="footer-social">
          <a href="maria.vantie@gmail.com" className="social-icon">
            <BiLogoGmail />
          </a>
          {/* <a href="#" className="social-icon">
            <FaFacebookF />
          </a> */}
          <a href="https://x.com/MareiPallas" className="social-icon">
            <FaXTwitter/>
          </a>
          {/* <a href="#" className="social-icon">
            <FaLinkedinIn />
          </a> */}
        </div>

        {/* Bottom Section - Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} VieiraDev. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
