import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { fetchAllCollections } from "../../services/api";

// Skeleton component
const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse bg-muted rounded-sm", className)} />
);

// Modal component
const ImageModal = ({ image, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image */}
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        src={image.src}
        alt={image.name}
        className="max-h-[85vh] max-w-[90vw] object-contain cursor-default"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Image info */}
      <div className="absolute bottom-6 left-6 right-6 text-center">
        <p className="text-white font-display text-lg">{image.name}</p>
      </div>
    </motion.div>
  );
};

const SubColecao = () => {
  const { collectionId } = useParams();
  const [subCollection, setSubCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const loadSubCollection = async () => {
      try {
        setLoading(true);
        const collections = await fetchAllCollections();
        
        // Procurar a subcoleção pelo ID ou nome
        let foundSubCollection = null;
        
        for (const collection of collections) {
          if (collection.subCollections) {
            const sub = collection.subCollections.find(
              (s) => s._id === collectionId || s.name === collectionId
            );
            if (sub) {
              foundSubCollection = sub;
              break;
            }
          }
        }
        
        if (foundSubCollection) {
          setSubCollection(foundSubCollection);
        } else {
          setError("Coleção não encontrada");
        }
      } catch (err) {
        console.error("Erro ao carregar subcoleção:", err);
        setError("Erro ao carregar coleção. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadSubCollection();
  }, [collectionId]);

  const handleImageLoad = useCallback((id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

  const images = subCollection?.pictures || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-32">
        <div className="container-custom">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-[0.1em] uppercase">Back to Collections</span>
          </Link>
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32">
      {/* Header */}
      <section className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-[0.1em] uppercase">Back to Collections</span>
          </Link>

          <h1 className="text-5xl md:text-6xl font-display mb-4">
            {subCollection?.name || "Collection"}
          </h1>
          <p className="text-muted-foreground">
            {images.length} works
          </p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="container-custom pb-24">
        {images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No artworks found in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {images.map((image, index) => (
              <motion.div
                key={image._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                    {!loadedImages[image._id || index] && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    <img
                      src={image.src}
                      alt={image.name}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-500",
                        loadedImages[image._id || index] ? "opacity-100" : "opacity-0",
                        "group-hover:scale-105"
                      )}
                      onLoad={() => handleImageLoad(image._id || index)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {image.name}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && images[selectedIndex] && (
          <ImageModal
            image={images[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
            onNext={() => setSelectedIndex((prev) => Math.min(prev + 1, images.length - 1))}
            onPrev={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
            hasNext={selectedIndex < images.length - 1}
            hasPrev={selectedIndex > 0}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubColecao;
