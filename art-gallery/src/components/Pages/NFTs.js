import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

// Coleção da artista
const COLLECTION_NAME = "Circus Kinder";
const MAGIC_EDEN_URL = "https://magiceden.io/ordinals/marketplace/circuskinder";

// Dados estáticos dos 10 Ordinals
const ORDINALS = [
  {
    id: "c7d553f78e5709e8795e8c0b60fc7049ee32debbc5921172a3729bfbdde2fe76i2",
    name: "Circus Kinder #1",
  },
  {
    id: "52c9ec8ae27d8d21a9dc6cbed3857ef5e0a24145efe48c1e8bb4526c538f2e9ei1",
    name: "Circus Kinder #2",
  },
  {
    id: "02786ea9c1bf57b0e802fd31c3409cc9ae48c5d80ace75b22d94836493c8ff03i4",
    name: "Circus Kinder #3",
  },
  {
    id: "7eb316b681bf7374ba30a384b9690f621379587d52d400e8d20f1a29bcfb3333i8",
    name: "Circus Kinder #4",
  },
  {
    id: "7b9944626c82ff3e962c85cb28b840d1a6068c6968ee8c2891fd51986241787di3",
    name: "Circus Kinder #5",
  },
  {
    id: "52c9ec8ae27d8d21a9dc6cbed3857ef5e0a24145efe48c1e8bb4526c538f2e9ei5",
    name: "Circus Kinder #6",
  },
  {
    id: "af0b39866e7c55cf524a847bb85b2c0564e78fc01ad0c257c0e5fbe3de916924i4",
    name: "Circus Kinder #7",
  },
  {
    id: "af0b39866e7c55cf524a847bb85b2c0564e78fc01ad0c257c0e5fbe3de916924i5",
    name: "Circus Kinder #8",
  },
  {
    id: "b01b5d28b3c7629691946363b19f9a232cd441af4a49c3fd20d45fd941bd9787i0",
    name: "Circus Kinder #9",
  },
  {
    id: "f8d4d15b9dc5f5843aeb6f1ad3e814f99cc829cc664ac1a0d6ab354f61922383i9",
    name: "Circus Kinder #10",
  },
];

// Skeleton loading component
const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse bg-muted rounded-sm", className)} />
);

const NFTs = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = useCallback((id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

  // Gerar URL da imagem do ordinal
  const getImageUrl = (id) => `https://ordinals.com/content/${id}`;

  // Gerar URL do Magic Eden
  const getMagicEdenUrl = (id) => `https://magiceden.io/ordinals/item-details/${id}`;

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="container-custom mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-6">
            Blockchain <span className="text-accent italic">Art.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Explore the <span className="text-foreground font-medium">{COLLECTION_NAME}</span> collection 
             unique Bitcoin Ordinals by Marei Pallas inscribed forever on the blockchain.
          </p>
          
          {/* CTA Principal */}
          <a
            href={MAGIC_EDEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-sm hover:bg-accent/90 transition-colors text-lg font-medium group"
          >
            View Full Collection on Magic Eden
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </section>

      {/* Preview Grid */}
      <section className="container-custom pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display">
              Collection <span className="text-muted-foreground font-normal">Preview</span>
            </h2>
            <a
              href={MAGIC_EDEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
            >
              See all on Magic Eden <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Ordinals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ORDINALS.map((ordinal, index) => (
              <motion.a
                key={ordinal.id}
                href={getMagicEdenUrl(ordinal.id)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group cursor-pointer block"
              >
                <div className="relative aspect-square rounded-sm overflow-hidden bg-muted mb-3">
                  {!loadedImages[ordinal.id] && (
                    <Skeleton className="absolute inset-0" />
                  )}
                  <img
                    src={getImageUrl(ordinal.id)}
                    alt={ordinal.name}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-500",
                      loadedImages[ordinal.id] ? "opacity-100" : "opacity-0",
                      "group-hover:scale-105"
                    )}
                    onLoad={() => handleImageLoad(ordinal.id)}
                    onError={(e) => {
                      e.target.src = "/img/placeholder.jpg";
                      handleImageLoad(ordinal.id);
                    }}
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm group-hover:text-accent transition-colors truncate">
                    {ordinal.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    View on Magic Eden →
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border">
        <div className="container-custom py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Explore the Full <span className="text-accent italic">Collection.</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              View all Ordinals, check prices, and make purchases directly on Magic Eden.
            </p>
            <a
              href={MAGIC_EDEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-sm hover:bg-accent hover:text-white transition-colors text-lg font-medium group"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Magic Eden
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NFTs;
