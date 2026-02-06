import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { fetchAllCollections, extractSubCollections } from "../../services/api";

// Skeleton loading component
const Skeleton = ({ className }) => (
  <div
    className={cn(
      "animate-pulse bg-muted rounded-sm",
      className
    )}
  />
);

// Capas personalizadas por índice (0-based)
const CUSTOM_COVERS = {
  1: "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741213061/galeria/galeria/Pallas%20Galaxy%20Collection/Kunstraub/ypxcf7udzqnot5fgycsa.jpg",
};

// Imagens da seção Artistic Philosophy
const PHILOSOPHY_IMAGES = [
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212830/galeria/galeria/Pallas%20Galaxy%20Collection/Street-art%20things/yyvc5ayyybe9sgc706dx.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212750/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/jontsz12spmxakjtmpyd.jpg",
];

const Gallery = () => {
  const [subCollections, setSubCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        const collections = await fetchAllCollections();
        const subs = extractSubCollections(collections);
        // Filtrar subcoleção "Till Today" para não aparecer no frontend
        const filteredSubs = subs.filter(sub => {
          const name = sub.name || sub.subCollectionName || "";
          return !name.toLowerCase().includes("till today");
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
  const getCoverImage = (subCollection, index) => {
    // Verifica se tem capa personalizada por índice
    if (CUSTOM_COVERS[index]) {
      return CUSTOM_COVERS[index];
    }
    // Primeiro, verifica se tem coverPicture definida
    if (subCollection.coverPicture && subCollection.coverPicture.src) {
      return subCollection.coverPicture.src;
    }
    // Senão, procura uma imagem marcada como isCover
    if (subCollection.pictures && subCollection.pictures.length > 0) {
      const coverPic = subCollection.pictures.find(pic => pic.isCover);
      if (coverPic) {
        return coverPic.src;
      }
      // Se não encontrar, usa a primeira imagem
      return subCollection.pictures[0].src;
    }
    // Fallback
    return "https://via.placeholder.com/400x500?text=No+Image";
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
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-6">
                    {!loadedImages[subId] && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    <img
                      src={getCoverImage(subCollection, index)}
                      alt={subCollection.name || subCollection.subCollectionName}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        loadedImages[subId] ? "opacity-100" : "opacity-0",
                        hoveredIndex === index ? "scale-105" : "scale-100"
                      )}
                      onLoad={() => handleImageLoad(subId)}
                    />
                    
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
