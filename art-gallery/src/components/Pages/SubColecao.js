import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { fetchSubCollection } from "../../services/api";

// Skeleton component
const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse bg-muted rounded-sm", className)} />
);

// Custom titles for Kunstraub collection
const KUNSTRAUB_TITLES = [
  '"I still have my red shoes" in Virginia is stolen from the Kunsthalle',
  'Camera footage of the theft',
  'The Weserkurier releases a breaking news story',
  'The police publish a search notice',
  'The real Weserkurier writes an article about the art action',
];

const KUNSTRAUB_COLLECTION_ID = '33819d67-1811-41c2-9b5d-40e28fdf3483';

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
        const foundSubCollection = await fetchSubCollection(collectionId);
        
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
  const isKunstraub = collectionId === KUNSTRAUB_COLLECTION_ID;

  // Get display name for image
  const getImageTitle = (image, index) => {
    if (isKunstraub && KUNSTRAUB_TITLES[index]) {
      return KUNSTRAUB_TITLES[index];
    }
    return image.name;
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

  // Render clickable image
  const renderImage = (image, index, className = "") => {
    const imageId = image._id || image.id || index;
    return (
      <motion.div
        key={imageId}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        <button
          onClick={() => setSelectedIndex(index)}
          className="group block w-full text-left"
        >
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            {!loadedImages[imageId] && (
              <Skeleton className="absolute inset-0" />
            )}
            <img
              src={image.src}
              alt={image.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                loadedImages[imageId] ? "opacity-100" : "opacity-0",
                "group-hover:scale-105"
              )}
              onLoad={() => handleImageLoad(imageId)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {getImageTitle(image, index)}
          </p>
        </button>
      </motion.div>
    );
  };

  // Kunstraub special layout with images mixed with text
  if (isKunstraub && images.length >= 5) {
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
              Art Prank: A Stolen <span className="text-accent-italic">Masterpiece?</span>
            </h1>
            <p className="text-lg text-muted-foreground italic">
              My Fictional Art Heist at the Kunsthalle Bremen
            </p>
          </motion.div>
        </section>

        {/* Intro + First Image */}
        <section className="container-custom pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                What is art? What is reality? And how easily can people be deceived? With my art prank, 
                an orchestrated art heist, I aimed to explore these very questions, leading Bremen on 
                a playful yet thought-provoking wild chase.
              </p>
              <h3 className="text-2xl font-display text-foreground mb-4">
                Crime Scene: Kunsthalle Bremen
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                On September 18, 2020, at exactly 5:37 PM, a spectacular art heist was said to have 
                taken place at the Kunsthalle Bremen. The stolen artwork? My piece "I still have my 
                red shoes in Virginia."
              </p>
            </motion.div>
            {images[0] && renderImage(images[0], 0)}
          </div>
        </section>

        {/* Second Image + Text */}
        <section className="container-custom pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {images[1] && renderImage(images[1], 1, "order-2 lg:order-1")}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                At least, that's what mysterious posters appearing all over Bremen suggested. 
                The "Cultural Senator" and the "Bremen Criminal Investigation Office" urged the 
                public to assist in solving the case, offering a reward of up to €5,000 for 
                any useful information.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The posters looked astonishingly real: a shadowy figure, unidentifiable, carrying a 
                painting out of the Kunsthalle. The police were in pursuit, or were they?
              </p>
            </motion.div>
          </div>
        </section>

        {/* A Game with Reality + Third Image */}
        <section className="container-custom pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-display text-foreground mb-6">
                A Game with <span className="text-accent-italic">Reality</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The posters alone would have been enough to spark curiosity. But I wanted to take it 
                further: a fabricated article in the Weser Kurier reported on the alleged art theft. 
                People started speculating, was this an actual scandal or a brilliant artistic stunt? 
                And who was the elusive thief?
              </p>
            </motion.div>
            {images[2] && renderImage(images[2], 2)}
          </div>
        </section>

        {/* Fourth Image + Police Notice */}
        <section className="container-custom pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {images[3] && renderImage(images[3], 3, "order-2 lg:order-1")}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <p className="text-muted-foreground leading-relaxed">
                Then, the inevitable happened: the real Weser Kurier caught wind of the project and 
                eventually published their own report. With that, the game reached its peak: the 
                boundaries between fiction and reality blurred until reality itself became part 
                of the narrative.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blockquote + Fifth Image */}
        <section className="container-custom pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <blockquote className="border-l-2 border-accent pl-6 py-2 italic text-foreground/80 text-sm leading-relaxed">
                "Those walking attentively through the Viertel these days may come across a poster 
                warning of something alarming at the Kunsthalle. The official-looking notice calls 
                on the public to help solve an art heist. Before anyone takes up detective work: 
                the poster campaign is a prank. There was no break-in at the Kunsthalle, and no one 
                is missing the mentioned artwork, because it simply does not exist."
                <span className="block mt-2 text-muted-foreground not-italic">— Weser Kurier</span>
              </blockquote>
            </motion.div>
            {images[4] && renderImage(images[4], 4)}
          </div>
        </section>

        {/* Conclusion */}
        <section className="container-custom pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl font-display text-foreground mb-6">
              An Art Heist as a <span className="text-accent-italic">Social Experiment</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This project was more than just a harmless prank. It raised questions about the power 
              of images, our willingness to believe what appears official, and the fine line between 
              fact and fabrication.
            </p>
            <p className="text-foreground leading-relaxed text-lg">
              Perhaps nothing was stolen here, perhaps a moment of wonder was created instead. 
              A playful challenge to our perceptions and realities, reminding us how thrilling 
              it can be to question the world around us.
            </p>
          </motion.div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selectedIndex !== null && images[selectedIndex] && (
            <ImageModal
              image={{
                ...images[selectedIndex],
                name: getImageTitle(images[selectedIndex], selectedIndex)
              }}
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
  }

  // Default layout for other collections
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
            {subCollection?.name || subCollection?.subCollectionName || "Collection"}
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
            {images.map((image, index) => renderImage(image, index))}
          </div>
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && images[selectedIndex] && (
          <ImageModal
            image={{
              ...images[selectedIndex],
              name: getImageTitle(images[selectedIndex], selectedIndex)
            }}
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
