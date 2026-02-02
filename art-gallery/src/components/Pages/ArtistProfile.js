import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ArtistProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[3/4] rounded-sm overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212413/galeria/galeria/Pallas%20Galaxy%20Collection/2014-2015/xhwaz6awcjnmgw4ytoaw.gif"
                  alt="Marei Pallas - Artist"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 border border-accent rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-border rounded-full -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-sm text-muted-foreground tracking-[0.2em] uppercase mb-4 block">
                About the Artist
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-8">
                Marei <span className="text-accent-italic">Pallas.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A boundary-crossing artist, Marei Pallas blends contemporary surrealism 
                with symbolism shaped by real encounters. Her work invites viewers into 
                worlds where reality and imagination meet—an invitation to communicate 
                beyond words, through the language of the soul.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>German</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>Since 2015</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>Surrealist</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-20 md:py-32 bg-card border-y border-border">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display mb-12 text-center">
                The <span className="text-accent-italic">Journey.</span>
              </h2>
              
              <div className="space-y-8">
                <p className="text-muted-foreground leading-relaxed">
                  Born in Germany, Marei Pallas has always followed art as a red thread 
                  through her life. In 2015, she left her job and spent three years abroad 
                  to paint, draw, and search for her own visual language.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  She spent half a year in Varna on a quiet, self-led retreat—painting daily 
                  and working intensely on developing her own artistic style.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Later, in Istanbul, her practice moved into public space. She created 
                  street-based art actions that invited real contact, like painting a chalk 
                  artwork with people beneath Galata Tower, and brought surreal moments into 
                  everyday life. It was never only about the image, but about presence: art 
                  as something shared.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  After Istanbul, she returned to Germany and continued with direct interventions 
                  in the street, including her "Hug a Terrorist / Love is stronger than hate" 
                  action or "Sunflowers on Sunday", an intervention to give more intention to 
                  drivers of the public transport.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  In 2025, she released her first NFT collection on the blockchain, selling out 
                  within 24 hours and reaching the Top 20 on Magic Eden, with strong attention 
                  on X. Later in Portugal, she hung her latest NFT collection outdoors and showed 
                  it directly to people on the street, because for her, art should be visible and 
                  accessible beyond galleries.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  In October 2025, she joined a school for realistic painting and drawing to 
                  sharpen her technique further, while staying true to her own surrealist direction.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display mb-8">
                Artistic <span className="text-accent-italic">Philosophy.</span>
              </h2>
              <blockquote className="text-2xl md:text-3xl font-display text-foreground leading-relaxed mb-8 italic">
                "Art is crossing boundaries, stepping out of the ordinary and into the unknown. 
                It's the language of the soul: an invitation to communicate with ourselves 
                and with others."
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                At the core of her work is a simple belief: art crosses boundaries, steps 
                out of the ordinary into the unknown, and belongs to everyone. I believe 
                art should be for everybody: tangible, accessible, and easy to understand.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] rounded-sm overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212695/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/y6pwsm02rgvr8tdgxfsw.jpg"
                  alt="Artwork sample"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-sm overflow-hidden mt-8">
                <img
                  src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212774/galeria/galeria/Pallas%20Galaxy%20Collection/Till%20Today/pkus7hs7foydedh85s81.jpg"
                  alt="Artwork sample"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-card border-t border-border">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display mb-8">
              Explore the <span className="text-accent-italic">Collection.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Explore more than a decade of work through curated collections, 
              each marking a chapter in Marei's creative path.
            </p>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground rounded-sm text-sm font-medium tracking-[0.1em] uppercase hover:bg-accent transition-colors group"
            >
              View Gallery
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ArtistProfile;
