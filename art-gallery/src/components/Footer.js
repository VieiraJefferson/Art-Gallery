import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/artistProfile" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { name: "X (Twitter)", href: "https://x.com/MareiPallas" },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-display">
                Pallas <span className="text-accent-italic">Galaxy</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Contemporary surrealist art gallery presenting works that blur 
              the boundaries between reality and imagination.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-medium tracking-[0.1em] uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-medium tracking-[0.1em] uppercase mb-6">
              Social
            </h4>
            <ul className="space-y-4">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    {social.name}
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-medium tracking-[0.1em] uppercase mb-6">
              Contact
            </h4>
            <a
              href="mailto:maria.vantie@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              maria.vantie@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pallas Galaxy. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Developed by{" "}
            <a href="#" className="hover:text-accent transition-colors">
              VieiraDev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
