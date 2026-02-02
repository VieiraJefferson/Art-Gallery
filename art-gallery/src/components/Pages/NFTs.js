import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import {
  fetchCollectionTokens,
  formatPrice,
  formatInscriptionNumber,
} from "../../services/magicEden";
import { cn } from "../../lib/utils";

// Coleção da artista
const COLLECTION_SYMBOL = "circuskinder";
const COLLECTION_NAME = "Circus Kinder";
const MAGIC_EDEN_URL = `https://magiceden.io/ordinals/marketplace/${COLLECTION_SYMBOL}`;

// Skeleton loading component
const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse bg-muted rounded-sm", className)} />
);

const NFTs = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  // Buscar apenas 10 tokens
  const fetchTokens = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCollectionTokens({
        collectionSymbol: COLLECTION_SYMBOL,
        limit: 10,
        offset: 0,
        sortBy: "inscriptionNumberAsc",
      });
      setTokens(data);
    } catch (err) {
      console.error("Erro ao carregar Ordinals:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  // Gerar URL da imagem do ordinal
  const getImageUrl = (token) => {
    if (token.contentURI) return token.contentURI;
    if (token.id) return `https://ordinals.com/content/${token.id}`;
    return "/img/placeholder.jpg";
  };

  // Abrir no Magic Eden
  const openOnMagicEden = (token) => {
    const url = `https://magiceden.io/ordinals/item-details/${token.id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleImageLoad = useCallback((id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

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
            — unique Bitcoin Ordinals by Marei Pallas inscribed forever on the blockchain.
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
              Preview <span className="text-muted-foreground font-normal">({COLLECTION_NAME})</span>
            </h2>
            <a
              href={MAGIC_EDEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
            >
              See all <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {loading ? (
            // Loading Skeleton
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-square mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            // Error state - mostra CTA direto para Magic Eden
            <div className="text-center py-16 bg-card rounded-sm border border-border">
              <p className="text-muted-foreground mb-6">
                Não foi possível carregar a prévia. Visite a coleção completa no Magic Eden.
              </p>
              <a
                href={MAGIC_EDEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-sm hover:bg-accent/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver no Magic Eden
              </a>
            </div>
          ) : (
            // NFT Grid
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tokens.map((token, index) => (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => openOnMagicEden(token)}
                >
                  <div className="relative aspect-square rounded-sm overflow-hidden bg-muted mb-3">
                    {!loadedImages[token.id] && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    <img
                      src={getImageUrl(token)}
                      alt={token.meta?.name || `Ordinal #${token.inscriptionNumber}`}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-500",
                        loadedImages[token.id] ? "opacity-100" : "opacity-0",
                        "group-hover:scale-105"
                      )}
                      onLoad={() => handleImageLoad(token.id)}
                      onError={(e) => {
                        e.target.src = "/img/placeholder.jpg";
                        handleImageLoad(token.id);
                      }}
                      loading="lazy"
                    />
                    
                    {/* Listed Badge */}
                    {token.listed && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent text-white text-xs font-medium rounded-sm">
                        For Sale
                      </span>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm mb-1 group-hover:text-accent transition-colors truncate">
                      {token.meta?.name || formatInscriptionNumber(token.inscriptionNumber)}
                    </h3>
                    {token.listedPrice ? (
                      <p className="text-accent text-sm">{formatPrice(token.listedPrice)}</p>
                    ) : (
                      <p className="text-muted-foreground text-xs">Not Listed</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
