import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Imagens da galeria para o grid assimétrico
const galleryImages = [
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212695/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/y6pwsm02rgvr8tdgxfsw.jpg",
    artist: "Maria Pallas",
    year: "2021",
    size: "large",
  },
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212774/galeria/galeria/Pallas%20Galaxy%20Collection/Till%20Today/pkus7hs7foydedh85s81.jpg",
    size: "medium",
  },
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212770/galeria/galeria/Pallas%20Galaxy%20Collection/Till%20Today/iij4gg9pjmhh6q79bojf.jpg",
    size: "medium",
  },
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212075/galeria/Pallas%20Galaxy%20Collection/yhahyrurr7gtkccfcfv3.jpg",
    size: "small",
  },
  {
    src: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212362/galeria/galeria/Pallas%20Galaxy%20Collection/2013/ekp8soassh5wssrlyhcs.jpg",
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
                Maria Pallas is a visionary artist whose work transcends conventional
                boundaries, blending surrealism with evocative symbolism. Each piece
                tells a story, inviting viewers into worlds where reality and imagination
                intertwine seamlessly.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Through masterful use of color and composition, her artwork explores
                themes of solitude, love, identity, and the passage of time.
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
                  alt="Maria Pallas"
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
              { title: "Surreal Dreams", year: "2019-2022", image: galleryImages[0].src },
              { title: "Emotional Depths", year: "2021", image: galleryImages[1].src },
              { title: "Abstract Visions", year: "2023", image: galleryImages[2].src },
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
    </div>
  );
};

export default HomePage;
