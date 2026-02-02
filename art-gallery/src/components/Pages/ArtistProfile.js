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
                  alt="Maria Pallas - Artist"
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
                Maria <span className="text-accent-italic">Pallas.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A visionary artist whose work transcends conventional boundaries, 
                blending surrealism with evocative symbolism. Each piece tells a 
                story, inviting viewers into worlds where reality and imagination 
                intertwine seamlessly.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Brazilian</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>Since 2010</span>
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
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Born in Brazil, Maria Pallas discovered her passion for art at 
                    an early age. Her journey into surrealism began as a way to 
                    express the complexities of human emotion and the mysteries 
                    of the subconscious mind.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Through masterful use of color and composition, her artwork 
                    explores themes of solitude, love, identity, and the passage 
                    of time. Each canvas becomes a window into alternate realities 
                    where the impossible becomes tangible.
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Her work has been exhibited in galleries across Europe and 
                    South America, earning recognition for its unique blend of 
                    technical precision and emotional depth.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, Maria continues to push the boundaries of her craft, 
                    experimenting with new techniques while staying true to her 
                    surrealist roots. Her latest collections explore digital 
                    mediums alongside traditional painting.
                  </p>
                </div>
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
              <blockquote className="text-2xl md:text-3xl font-display text-muted-foreground leading-relaxed mb-8">
                "Art is the bridge between what we see and what we feel. 
                It transforms the invisible into the visible, giving form 
                to our deepest emotions."
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                Maria believes that true art should challenge perception 
                and evoke emotion. Her work invites viewers to look beyond 
                the surface and discover personal meaning within each piece.
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
              Discover over a decade of artistic evolution through our 
              curated collections, each representing a unique chapter 
              in Maria's creative journey.
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
