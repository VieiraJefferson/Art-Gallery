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

const KUNSTRAUB_COLLECTION_ID = 'ddb60cb8-2a93-469e-a16f-c6075742e0d7';
const STREET_ART_ACTIONS_ID = '86e4e5ba-b3a1-44e2-9f24-025b5cbc56cd';

// Desired display order for Street Art Actions (filename patterns)
const STREET_ART_ORDER = [
  'Sunflowers_at_Sunday_pexjby',
  'Sundflowers_at_Sunday_py5whi',
  'Sign_of_Peace_u8ayty',
  'Fight_Racism_kakfpy',
  'Fight_Racism_2_msgxe6',
  'ocjwxdmdzmsxeiqzqdbu',
  'Chalk_paints_for_peace4_lfjzfi',
  'Chalk_paints_for_peace2_s91yhq',
  'Chalk_paints_for_peace_mjoeac',
  'breakfast_in_the_country3_rjyxue',
  'Breakfast_in_the_country2_nvvogm',
  'Breakfast_in_the_country_ynvpkb',
  'ehdza5vzxskisjdm4sg3',
  'Breakfast_in_Fur2_fqd7qo',
  'Breakfast_in_Fur_ftsiov',
  'yjr0trxcqyggi66gm7x0',
  'oqkmrq7yjb4lfvb3pbnp',
  'yyvc5ayyybe9sgc706dx',
  'eagjs18f0whucdxj9anq',
];

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
  const [chalkPaintIndex, setChalkPaintIndex] = useState(null);

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

  // Imagens a serem removidas da subcoleção "Vivid Delirium"
  const IMAGES_TO_REMOVE = [
    "bpfyi35zoyfdnrovy8oz",
    "rjtzi3gcv8dynxaq2d3e"
  ];

  // Filtrar imagens removidas da subcoleção "Vivid Delirium"
  let images = subCollection?.pictures || [];
  const collectionName = subCollection?.name || subCollection?.subCollectionName || "";
  if (collectionName.toLowerCase().includes("vivid delirium")) {
    images = images.filter(image => {
      const imageSrc = image.src || "";
      return !IMAGES_TO_REMOVE.some(id => imageSrc.includes(id));
    });
  }

  const isKunstraub = collectionId === KUNSTRAUB_COLLECTION_ID;
  const isStreetArt = collectionId === STREET_ART_ACTIONS_ID;

  // Sort Street Art Actions images into the defined order
  const sortedStreetArt = isStreetArt
    ? STREET_ART_ORDER
        .map(pattern => images.find(img => img.src.includes(pattern)))
        .filter(Boolean)
    : images;

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
        <section className="container-custom mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
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

        {/* 1 — Crime Scene: text left + 2 images right */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-display mb-6">Crime Scene: <span className="text-accent-italic">Kunsthalle Bremen</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What is art? What is reality? And how easily can people be deceived? With my art prank, an orchestrated art heist, I aimed to explore these very questions, leading Bremen on a playful yet thought-provoking wild chase.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                On September 18, 2020, at exactly 5:37 PM, a spectacular art heist was said to have taken place at the Kunsthalle Bremen. The stolen artwork? My piece "I still have my red shoes in Virginia."
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At least, that's what mysterious posters appearing all over Bremen suggested. The "Cultural Senator" and the "Bremen Criminal Investigation Office" urged the public to assist in solving the case, offering a reward of up to €5,000 for any useful information.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {images[0] && renderImage(images[0], 0)}
              {images[1] && renderImage(images[1], 1)}
            </div>
          </div>
        </section>

        {/* 2 — The Poster: image left + text right */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {images[2] && renderImage(images[2], 2, "order-2 lg:order-1")}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-1 lg:order-2">
              <p className="text-muted-foreground leading-relaxed mb-4">
                The posters looked astonishingly real: a shadowy figure, unidentifiable, carrying a painting out of the Kunsthalle. The police were in pursuit, or were they?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The posters alone would have been enough to spark curiosity. But I wanted to take it further: a fabricated article in the Weser Kurier reported on the alleged art theft. People started speculating, was this an actual scandal or a brilliant artistic stunt? And who was the elusive thief?
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3 — A Game with Reality: text full-width + 3 images */}
        <section className="container-custom pb-16 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-6">A Game with <span className="text-accent-italic">Reality</span></h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
              Then, the inevitable happened: the real Weser Kurier caught wind of the project and eventually published their own report:
            </p>
            <blockquote className="border-l-2 border-accent pl-6 py-2 italic text-foreground/80 text-sm leading-relaxed max-w-3xl">
              "Those walking attentively through the Viertel these days may come across a poster warning of something alarming at the Kunsthalle. The official-looking notice calls on the public, on behalf of the 'Cultural Senator' and the 'Bremen Criminal Investigation Office,' to help solve an art heist. Allegedly, the piece 'I still have my red shoes in Virginia' by the artist collective 'Pallasgalaxy' was stolen from the Kunsthalle in September. A €5,000 reward is being offered for useful tips. Before anyone takes up detective work: the poster campaign is a prank. There was no break-in at the Kunsthalle, and no one is missing the mentioned artwork, because it simply does not exist. The cultural institution assures the WESER-KURIER of this, cross their hearts."
              <span className="block mt-2 text-muted-foreground not-italic">— Weser Kurier</span>
            </blockquote>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mt-4">
              With that, the game reached its peak: the boundaries between fiction and reality blurred until reality itself became part of the narrative.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images[3] && renderImage(images[3], 3)}
            {images[4] && renderImage(images[4], 4)}
            {images[5] && renderImage(images[5], 5)}
          </div>
        </section>

        {/* 4 — Social Experiment: text left + image right */}
        <section className="container-custom pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-display mb-6">An Art Heist as a <span className="text-accent-italic">Social Experiment</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This project was more than just a harmless prank. It raised questions about the power of images, our willingness to believe what appears official, and the fine line between fact and fabrication. How much do we trust what looks legitimate? When do we begin to doubt? And what happens when art seamlessly embeds itself into reality?
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I thank everyone who played along: the passersby who stopped to stare, the readers who wondered, and the Weser Kurier, who unintentionally became a participant.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Perhaps nothing was stolen here, perhaps a moment of wonder was created instead. A playful challenge to our perceptions and realities, reminding us how thrilling it can be to question the world around us.
              </p>
            </motion.div>
            {images[6] && renderImage(images[6], 6)}
          </div>
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

  // Street Art Actions special layout
  if (isStreetArt) {
    const sa = sortedStreetArt;
    const chalkPaintSlides = sa[7] && sa[8]
      ? [
          { ...sa[8], name: 'Chalk Paint for Peace 02' },
          { ...sa[7], name: 'Chalk Paint for Peace 03' },
        ]
      : [];
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-32">
        {/* Header */}
        <section className="container-custom mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-[0.1em] uppercase">Back to Collections</span>
            </Link>
            <h1 className="text-5xl md:text-6xl font-display mb-4">
              Street Art <span className="text-accent-italic">Actions.</span>
            </h1>
          </motion.div>
        </section>

        {/* 1 — Sunflowers on Sunday */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-display mb-6">Sunflowers on <span className="text-accent-italic">Sunday</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With the Sunflowers on Sunday campaign, we wanted to give tram drivers more recognition. They carry great responsibility in our society and do important work every day. Countless passengers rely on them to reach their destinations safely and on time.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Because drivers are often tucked away in their cabins, they can easily be overlooked. That is why we loved the idea of knocking on the driver's cabin door and handing over a sunflower.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Of course, sunflowers are no substitute for what is truly needed, better pay and better working conditions. But we still wanted to offer a small gesture of appreciation and a heartfelt thank you.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {sa[0] && renderImage(sa[0], 0)}
              {sa[1] && renderImage(sa[1], 1)}
            </div>
          </div>
        </section>

        {/* 2 — Sign of Peace */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {sa[2] && renderImage(sa[2], 2, "order-2 lg:order-1")}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-display mb-6">Sign of <span className="text-accent-italic">Peace</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As part of this action, we handed white flowers to police officers as a symbol of peace. In Istanbul, there have repeatedly been tensions and confrontations between police and demonstrators. Sign of Peace is a symbolic gesture that imagines a different kind of encounter, one grounded in restraint, dignity, and mutual recognition.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At the same time, it acknowledges a difficult reality. Police are often deployed by state authorities to control or disperse protests, and symbolic acts alone cannot resolve structural political conflict. Flowers are not a solution to repression, nor a substitute for rights, accountability, and justice.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Still, we wanted to make a small gesture for peace, because peace begins with individuals, in our own hearts, in the hearts of those who protest, and in the hearts of those in uniform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3 — Fight Racism */}
        <section className="container-custom pb-16 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-6">Fight <span className="text-accent-italic">Racism</span></h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
              Fight Racism translated the well known symbol of a little figure throwing a swastika into a trash bin into a participatory art action. At a tram stop, a trash bin was placed as the central element of the installation. Around it, swastikas were scattered across the ground.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
              Passersby were invited to take part. They could step forward, pick up a swastika, and throw it into the bin. And they did. People quickly collected all of them and threw them away.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              The action transformed a simple symbol into a shared public gesture, a clear and active statement against hate and in support of civic courage in everyday life.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sa[3] && renderImage(sa[3], 3)}
            {sa[4] && renderImage(sa[4], 4)}
            {sa[5] && renderImage(sa[5], 5)}
          </div>
        </section>

        {/* 4 — Chalk Paint for Peace */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                {sa[6] && renderImage(sa[6], 6)}
                {sa[8] && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <button
                      onClick={() => setChalkPaintIndex(0)}
                      className="group block w-full text-left"
                    >
                      <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                        {!loadedImages[sa[8]._id || sa[8].id || 8] && (
                          <Skeleton className="absolute inset-0" />
                        )}
                        <img
                          src={sa[8].src}
                          alt="Chalk Paint for Peace 02"
                          className={cn(
                            "w-full h-full object-cover transition-all duration-500",
                            loadedImages[sa[8]._id || sa[8].id || 8] ? "opacity-100" : "opacity-0",
                            "group-hover:scale-105"
                          )}
                          onLoad={() => handleImageLoad(sa[8]._id || sa[8].id || 8)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        Chalk Paint for Peace 02
                      </p>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-display mb-6">Chalk Paint <span className="text-accent-italic">for Peace</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In front of Istanbul's Galata Tower, we create a participatory chalk artwork together with people from the city. Participants become co creators, shaping the piece alongside artist Marei Pallas in a shared artistic act for peace.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The atmosphere is lively. People arrive and leave, and anyone who feels inspired can contribute to the artwork. This creates an international, open setting in which strangers meet, exchange ideas, and create something together.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At its heart, the project reflects a simple and universal message. The desire for peace lives in every human heart. That is the core statement of the artwork and what makes it so deeply connective.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 5 — Breakfast in the Country */}
        <section className="container-custom pb-16 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-6">Breakfast in <span className="text-accent-italic">the Country</span></h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
              With Breakfast in the Country, we wanted to create an unusual and unexpected moment in public space, an artistic interruption of everyday life. A soft wool blanket meets the bare stone ground, bringing intimacy and warmth into a place usually defined by movement and routine.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
              The work also has a participatory dimension. Passersby are not just observers, but become part of the artwork itself. As they enter the scene, they seem to rise like flowers from the earth, fragile, present, and alive.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              In this way, the piece transforms an ordinary location into a shared poetic space, where encounter, imagination, and human presence become the central artistic material.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sa[9]  && renderImage(sa[9],  9)}
            {sa[10] && renderImage(sa[10], 10)}
            {sa[11] && renderImage(sa[11], 11)}
            {sa[12] && renderImage(sa[12], 12)}
          </div>
        </section>

        {/* 6 — Breakfast in Fur */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-display mb-6">Breakfast <span className="text-accent-italic">in Fur</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Breakfast in Fur is a tribute to artist Meret Oppenheim, who, around 90 years earlier, created the still iconic work Breakfast in Fur (Object: a fur covered cup, saucer, and spoon).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In our contemporary interpretation, we stage breakfast in fur coats inside a tram. A fully set breakfast table is arranged with eggs, cheese, bread rolls, cold cuts, coffee, and tea.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The action is conceived as a disruption of everyday routine. A tram ride is usually part of a fixed rhythm, commuting, repetition, the same patterns every day. By placing an unexpected breakfast scene in this space, we interrupt the ordinary and challenge habitual ways of seeing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The moment is meant to create surprise. What is happening here? What are we looking at? Suddenly, someone in a fur coat is sitting at a carefully laid table in public transport, eating bread rolls and boiled eggs. The familiar becomes strange, and the ordinary turns into art.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {sa[13] && renderImage(sa[13], 13)}
              {sa[14] && renderImage(sa[14], 14)}
            </div>
          </div>
        </section>

        {/* 7 — Istanbul Modern Outside Version */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {sa[15] && renderImage(sa[15], 15, "order-2 lg:order-1")}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-display mb-6">Istanbul Modern <span className="text-accent-italic">Outside Version</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What we get to see as art is often shaped by galleries, institutions, and curatorial gatekeeping. Artists who are not part of these elite circles usually have very limited opportunities to exhibit their work beyond the internet.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With Istanbul Modern Outside Version, we open up another possibility, presenting art in public space, under the open sky, where everyone can encounter it. No ticket, no invitation, no institutional barrier, just direct access.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The project reclaims the street as a cultural space and makes visibility more democratic. By bringing artworks into everyday urban life, it invites spontaneous dialogue between artists, passersby, and the city itself.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 8 — Do it at your city */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-display mb-6">Do it at <span className="text-accent-italic">your city</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We cooked food and distributed it outdoors to people experiencing homelessness. Inspired by a video from France that invited others to do the same, we decided to take on the challenge and bring the idea into our own city.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The act itself was simple, but the atmosphere carried something deeper. Sharing a warm meal created moments of connection, dignity, and humanity. It was not only about food, but about presence, care, and the reminder that no one should feel invisible.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At its heart, the project carries a message that can travel far beyond one place. A small act of solidarity can inspire others to do the same. By sharing the video and encouraging people in other cities to join, the action becomes more than a single gesture — it becomes an invitation to spread compassion from one community to the next.
              </p>
            </motion.div>
            {sa[16] && renderImage(sa[16], 16)}
          </div>
        </section>

        {/* 9 — I'm Hungry */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {sa[17] && renderImage(sa[17], 17, "order-2 lg:order-1")}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-display mb-6">I'm <span className="text-accent-italic">Hungry</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm Hungry is an interactive artwork that invites public engagement. It features a life size cardboard figure of a nurse wearing a mask, seated on the ground like a beggar, with a cardboard cup and a sign reading: "I'm Hungry."
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The piece is a sharp critique of the chronic underpayment and structural undervaluation of care workers. It highlights a social contradiction. People in nursing and caregiving professions are essential to public health and social stability, yet many are paid so little that dignified living becomes difficult.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By placing this figure in public space, the work makes systemic injustice visible. It asks who carries care in our societies, who profits from it, and why those who sustain life are so often denied economic security, recognition, and political priority.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At its core, the artwork is a call for fair wages, better working conditions, and a rethinking of care as a public good rather than cheap labor.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 10 — Hug a terrorist */}
        {sa[18] && (
          <section className="container-custom pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="max-w-sm">
                {renderImage(sa[18], 18)}
              </div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <h2 className="text-3xl md:text-4xl font-display mb-6">Hug a Terrorist, <span className="text-accent-italic">Love Is Stronger Than Hate</span></h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In Frankfurt's pedestrian zone, Marei Pallas stood in a staged "terrorist" costume as part of a public performance. On her chest, she wore a cardboard heart with the words: "Hug a terrorist, love is stronger than hate."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The work is a symbolic act. It does not trivialize violence. Rather, it asks how society responds to fear, hatred, and polarization. The performance invites people to resist hatred as a reflex and to protect their humanity, because solidarity, empathy, and inner strength are essential when facing violence and social division.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  People approached and embraced the artist, turning the action into a participatory moment. In these encounters, the artwork shifted from provocation to connection, a shared statement that hate should not define us.
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Chalk Paint Carousel Modal */}
        <AnimatePresence>
          {chalkPaintIndex !== null && chalkPaintSlides[chalkPaintIndex] && (
            <ImageModal
              image={chalkPaintSlides[chalkPaintIndex]}
              onClose={() => setChalkPaintIndex(null)}
              onNext={() => setChalkPaintIndex((prev) => Math.min(prev + 1, chalkPaintSlides.length - 1))}
              onPrev={() => setChalkPaintIndex((prev) => Math.max(prev - 1, 0))}
              hasNext={chalkPaintIndex < chalkPaintSlides.length - 1}
              hasPrev={chalkPaintIndex > 0}
            />
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {selectedIndex !== null && sortedStreetArt[selectedIndex] && (
            <ImageModal
              image={sortedStreetArt[selectedIndex]}
              onClose={() => setSelectedIndex(null)}
              onNext={() => setSelectedIndex((prev) => Math.min(prev + 1, sortedStreetArt.length - 1))}
              onPrev={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
              hasNext={selectedIndex < sortedStreetArt.length - 1}
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
