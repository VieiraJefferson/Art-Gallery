import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Imagens da galeria para o grid assimétrico
const galleryImages = [
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212774/galeria/galeria/Pallas%20Galaxy%20Collection/Till%20Today/pkus7hs7foydedh85s81.jpg",
    artist: "Marei Pallas",
    year: "2024",
    size: "large",
  },
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212695/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/y6pwsm02rgvr8tdgxfsw.jpg",
    size: "medium",
  },
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212429/galeria/galeria/Pallas%20Galaxy%20Collection/2014-2015/qvrtsahxelvxtfcff9au.jpg",
    size: "medium",
  },
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212658/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/kvdll4lxoerxjbdbvhky.jpg",
    size: "small",
  },
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212355/galeria/galeria/Pallas%20Galaxy%20Collection/2013/wiwxpssttlku7nc0pp9l.jpg",
    size: "medium",
  },
];

const socialLinks = [
  { name: "X (Twitter)", href: "https://x.com/MareiPallas" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="container-custom pt-32 md:pt-40">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">

            {/* Left Side - Social Links (vertical) */}
            <div className="hidden lg:flex col-span-1 flex-col justify-end pb-20">
              <div className="flex flex-col gap-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="vertical-text text-sm text-muted-foreground hover:text-accent transition-colors tracking-wider"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Center - Title & Description */}
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1] mb-8">
                  Pallas
                  <br />
                  Art <span className="text-accent-italic">Galaxy.</span>
                </h1>

                <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Since 2015, Maria Pallas has presented contemporary art exhibitions
                  showcasing the work of emerging surrealist artists. The Gallery acquired
                  a strong reputation for introducing artists who would later gain worldwide recognition.
                </p>

                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-4 text-sm font-medium tracking-[0.2em] uppercase hover:text-accent transition-colors group"
                >
                  More
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </motion.div>

              {/* Small Image Below Text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-16 lg:mt-24"
              >
                <div className="relative rounded-sm overflow-hidden aspect-[4/3] max-w-[280px]">
                  <img
                    src={galleryImages[3].src}
                    alt="Gallery preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative circle */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Right Side - Image Grid */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-4 lg:gap-6">
              {/* Large Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="col-span-1 row-span-2"
              >
                <div className="relative h-full rounded-sm overflow-hidden group">
                  <img
                    src={galleryImages[0].src}
                    alt="Featured artwork"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Image info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="flex justify-between items-end text-white">
                      <span className="text-sm font-medium">{galleryImages[0].artist}</span>
                      <span className="text-sm">{galleryImages[0].year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Top Right Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="col-span-1"
              >
                <div className="aspect-[4/3] rounded-sm overflow-hidden">
                  <img
                    src={galleryImages[1].src}
                    alt="Gallery artwork"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Bottom Right Images */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="col-span-1 grid grid-rows-2 gap-4 lg:gap-6"
              >
                <div className="rounded-sm overflow-hidden">
                  <img
                    src={galleryImages[2].src}
                    alt="Gallery artwork"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-sm overflow-hidden">
                  <img
                    src={galleryImages[4].src}
                    alt="Gallery artwork"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display mb-8">
                About the <span className="text-accent-italic">Artist.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A boundary-crossing artist, Marei Pallas blends contemporary surrealism
                with symbolism shaped by real encounters. Her work invites viewers into
                worlds where reality and imagination meet—an invitation to communicate
                beyond words, through the language of the soul.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Born in Germany, she left her job in 2015 to paint, draw, and search
                for her own visual language across Europe and beyond.
              </p>
              <Link
                to="/artistProfile"
                className="inline-flex items-center gap-4 text-sm font-medium tracking-[0.2em] uppercase hover:text-accent transition-colors group"
              >
                Learn More
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-sm overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212413/galeria/galeria/Pallas%20Galaxy%20Collection/2014-2015/xhwaz6awcjnmgw4ytoaw.gif"
                  alt="Marei Pallas"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-accent rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display"
            >
              Featured <span className="text-accent-italic">Collections.</span>
            </motion.h2>
            <Link
              to="/gallery"
              className="mt-6 md:mt-0 inline-flex items-center gap-4 text-sm font-medium tracking-[0.2em] uppercase hover:text-accent transition-colors group"
            >
              View All
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Surreal Dreams", year: "2019-2022", image: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212593/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/ncopingbcthzo2zhv9kn.jpg" },
              { title: "Emotional Depths", year: "2013", image: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212345/galeria/galeria/Pallas%20Galaxy%20Collection/2013/nwvewa6sw4koc7yfgyjs.jpg" },
              { title: "Abstract Visions", year: "2019-2022", image: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1770067216/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/jmwcqnwculp5pb7p9ii3.jpg" },
            ].map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to="/gallery" className="group block">
                  <div className="aspect-[4/5] rounded-sm overflow-hidden mb-6">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-display mb-2 group-hover:text-accent transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{collection.year}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blockchain Art Section */}
      <section className="section-padding border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <a
                href="https://magiceden.io/ordinals/marketplace/circuskinder"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square rounded-sm overflow-hidden group"
              >
                {/* Background Image */}
                <img
                  src="https://ordinals.com/content/c7d553f78e5709e8795e8c0b60fc7049ee32debbc5921172a3729bfbdde2fe76i2"
                  alt="Circus Kinder - Bitcoin Ordinal"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Bitcoin Ordinals</span>
                  </div>
                  <h3 className="text-2xl text-white font-display mb-2">Circus Kinder</h3>
                  <p className="text-white/70 text-sm mb-4">
                    View collection on Magic Eden →
                  </p>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-display mb-8">
                Blockchain <span className="text-accent-italic">Art.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Discover unique digital artworks inscribed forever on the Bitcoin blockchain.
                The <span className="text-foreground font-medium">Circus Kinder</span> collection
                represents a new chapter in Maria Pallas's artistic journey, bringing her
                surrealist vision to the world of Bitcoin Ordinals.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Each piece is a one-of-a-kind inscription, permanently stored on the
                most secure and decentralized network in the world.
              </p>
              <Link
                to="/blockchain-art"
                className="inline-flex items-center gap-4 text-sm font-medium tracking-[0.2em] uppercase hover:text-accent transition-colors group"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
