import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { fetchAllCollections, extractSubCollections } from "../../services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

// Skeleton loading component
const Skeleton = ({ className }) => (
  <div
    className={cn(
      "animate-pulse bg-muted rounded-sm",
      className
    )}
  />
);


// Imagens da seção Artistic Philosophy
const PHILOSOPHY_IMAGES = [
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1747757796/galeria/undefined/xt2ngkhedtwdyas5kxnk.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1747735700/galeria/undefined/vic3j6aboxyctlztjo4k.jpg",
];

// Subcoleções que requerem verificação de maioridade (nomes normalizados)
const ADULT_SUBCOLLECTIONS = ["a dream in black and white", "surreal dreams"];

const Gallery = () => {
  const navigate = useNavigate();
  const [subCollections, setSubCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Estado do modal de verificação de idade
  const [ageModalOpen, setAgeModalOpen] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        const collections = await fetchAllCollections();
        const subs = extractSubCollections(collections);
        const HIDDEN_SUBCOLLECTIONS = ["till today", "2013", "2014-2015", "2019-2022", "street-art things"];
        const filteredSubs = subs.filter(sub => {
          const name = (sub.name || sub.subCollectionName || "").toLowerCase();
          return !HIDDEN_SUBCOLLECTIONS.some(hidden => name.includes(hidden));
        });
        setSubCollections(filteredSubs);
      } catch (err) {
        console.error("Erro ao carregar coleções:", err);
        setError("Erro ao carregar coleções. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  const handleImageLoad = useCallback((id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

  // Função para obter a imagem de capa
  const getCoverImage = (subCollection) => {
    if (subCollection.coverPicture && subCollection.coverPicture.src) {
      return subCollection.coverPicture.src;
    }
    if (subCollection.pictures && subCollection.pictures.length > 0) {
      const coverPic = subCollection.pictures.find(pic => pic.isCover);
      if (coverPic) return coverPic.src;
      return subCollection.pictures[0].src;
    }
    return "https://via.placeholder.com/400x500?text=No+Image";
  };

  // Verifica se a subcoleção requer verificação de idade
  const requiresAgeVerification = (subCollection) => {
    const name = (subCollection.name || subCollection.subCollectionName || "").toLowerCase();
    return ADULT_SUBCOLLECTIONS.some(adult => name.includes(adult));
  };

  // Handler de clique nos cards
  const handleCardClick = (e, subId, subCollection) => {
    if (requiresAgeVerification(subCollection)) {
      e.preventDefault();
      setPendingNavigation(`/gallery/${subId}`);
      setAgeConfirmed(false);
      setAgeModalOpen(true);
    }
  };

  // Confirmar e navegar
  const handleAgeConfirm = () => {
    if (!ageConfirmed) return;
    setAgeModalOpen(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  // Cancelar modal
  const handleAgeCancel = () => {
    setAgeModalOpen(false);
    setAgeConfirmed(false);
    setPendingNavigation(null);
  };

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
        <div className="container-custom text-center py-20">
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32">
      {/* Modal de Verificação de Maioridade */}
      <Dialog open={ageModalOpen} onOpenChange={(open) => { if (!open) handleAgeCancel(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">18+</span>
              <DialogTitle className="font-display text-xl">
                Mature Content
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm leading-relaxed text-foreground/70">
              This collection contains mature artistic content intended for adult audiences only.
              By continuing, you confirm that you are 18 years of age or older.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            <label
              htmlFor="age-confirm"
              className="flex items-start gap-3 cursor-pointer group"
            >
              <div className="mt-0.5">
                <Checkbox
                  id="age-confirm"
                  checked={ageConfirmed}
                  onCheckedChange={setAgeConfirmed}
                />
              </div>
              <span className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors select-none">
                I confirm that I am 18 years of age or older and consent to viewing mature artistic content.
              </span>
            </label>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleAgeCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleAgeConfirm}
              disabled={!ageConfirmed}
              className="w-full sm:w-auto"
            >
              Enter Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <section className="container-custom mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-6">
            Art <span className="text-accent-italic">Collections.</span>
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Explore more than a decade of work through curated collections,
            each marking a chapter in Marei's creative path.
          </p>
        </motion.div>
      </section>

      {/* Collections Grid */}
      <section className="container-custom pb-24">
        {subCollections.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhuma coleção encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {subCollections.map((subCollection, index) => {
              const subId = subCollection._id || subCollection.id;
              const isAdult = requiresAgeVerification(subCollection);
              return (
              <motion.div
                key={subId}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  to={`/gallery/${subId}`}
                  className="group block"
                  onClick={(e) => handleCardClick(e, subId, subCollection)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-6">
                    {!loadedImages[subId] && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    <img
                      src={getCoverImage(subCollection)}
                      alt={subCollection.name || subCollection.subCollectionName}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        loadedImages[subId] ? "opacity-100" : "opacity-0",
                        hoveredIndex === index ? "scale-105" : "scale-100"
                      )}
                      onLoad={() => handleImageLoad(subId)}
                    />

                    {/* Badge 18+ */}
                    {isAdult && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-sm tracking-wider">
                        18+
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/20 flex items-center justify-center"
                        >
                          <span className="text-white text-sm tracking-[0.2em] uppercase font-medium">
                            View Collection
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Collection Info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-display mb-1 group-hover:text-accent transition-colors">
                        {subCollection.name || subCollection.subCollectionName}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {subCollection.pictures?.length || 0} works
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
            })}
          </div>
        )}
      </section>

      {/* Artistic Philosophy Section */}
      <section className="border-t border-border">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display mb-8">
                Artistic <span className="text-accent-italic">Philosophy.</span>
              </h2>
              <p className="text-foreground leading-relaxed mb-6 text-lg italic">
                "Art is crossing boundaries, stepping out of the ordinary and into the unknown.
                It's the language of the soul: an invitation to communicate with ourselves and with others."
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe art should be for everybody: tangible, accessible, and easy to understand.
              </p>
            </motion.div>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] rounded-sm overflow-hidden">
                <img
                  src={PHILOSOPHY_IMAGES[0]}
                  alt="Artistic Philosophy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] rounded-sm overflow-hidden mt-8">
                <img
                  src={PHILOSOPHY_IMAGES[1]}
                  alt="Artistic Philosophy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
