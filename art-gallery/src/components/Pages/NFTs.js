import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, ExternalLink, X, Filter } from "lucide-react";
import {
  fetchAllTokensCached,
  formatPrice,
  formatInscriptionNumber,
  SORT_OPTIONS,
  LISTING_FILTERS,
} from "../../services/magicEden";
import { cn } from "../../lib/utils";

// Coleção da artista Maria Pallas
const COLLECTION_SYMBOL = "circuskinder";
const COLLECTION_NAME = "Circus Kinder";

// Skeleton loading component
const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse bg-muted rounded-sm", className)} />
);

const NFTs = () => {
  // Estado dos dados
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  // Estado dos filtros/busca
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("inscriptionNumberAsc");
  const [listingFilter, setListingFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Buscar tokens da API
  const fetchTokens = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllTokensCached(COLLECTION_SYMBOL);
      setTokens(data);
    } catch (err) {
      console.error("Erro ao carregar Ordinals:", err);
      setError("Erro ao carregar Ordinals. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  // Filtrar e ordenar tokens
  const filteredTokens = useMemo(() => {
    let result = [...tokens];

    // Filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((token) => {
        const name = token.meta?.name?.toLowerCase() || "";
        const inscriptionNumber = token.inscriptionNumber?.toString() || "";
        const id = token.id?.toLowerCase() || "";
        return (
          name.includes(term) ||
          inscriptionNumber.includes(term) ||
          id.includes(term)
        );
      });
    }

    // Filtro de listagem
    if (listingFilter === "listed") {
      result = result.filter((token) => token.listed);
    } else if (listingFilter === "unlisted") {
      result = result.filter((token) => !token.listed);
    }

    // Ordenação
    result.sort((a, b) => {
      switch (sortBy) {
        case "inscriptionNumberAsc":
          return (a.inscriptionNumber || 0) - (b.inscriptionNumber || 0);
        case "inscriptionNumberDesc":
          return (b.inscriptionNumber || 0) - (a.inscriptionNumber || 0);
        case "priceAsc":
          if (!a.listedPrice) return 1;
          if (!b.listedPrice) return -1;
          return a.listedPrice - b.listedPrice;
        case "priceDesc":
          if (!a.listedPrice) return 1;
          if (!b.listedPrice) return -1;
          return b.listedPrice - a.listedPrice;
        default:
          return 0;
      }
    });

    return result;
  }, [tokens, searchTerm, sortBy, listingFilter]);

  // Paginação
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);
  const paginatedTokens = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTokens.slice(start, start + itemsPerPage);
  }, [filteredTokens, currentPage]);

  // Reset página quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, listingFilter]);

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

  // Floor price calculation
  const floorPrice = useMemo(() => {
    const listedTokens = tokens.filter((t) => t.listedPrice);
    if (listedTokens.length === 0) return null;
    return Math.min(...listedTokens.map((t) => t.listedPrice));
  }, [tokens]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-32 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando Ordinals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-32">
        <div className="container-custom text-center py-20">
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={fetchTokens}
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
      {/* Hero Section */}
      <section className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-6">
            Blockchain <span className="text-accent italic">Art.</span>
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-8">
            Explore the <span className="text-foreground font-medium">{COLLECTION_NAME}</span> collection 
            — unique Bitcoin Ordinals by Maria Pallas inscribed forever on the blockchain.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div>
              <p className="text-3xl md:text-4xl font-display">{tokens.length}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Items</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-display">
                {tokens.filter((t) => t.listed).length}
              </p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Listed</p>
            </div>
            {floorPrice && (
              <div>
                <p className="text-3xl md:text-4xl font-display">{formatPrice(floorPrice)}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Floor Price</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="container-custom mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or inscription #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {/* Desktop Filters */}
          <div className={cn(
            "flex flex-col md:flex-row gap-4 w-full md:w-auto",
            showFilters ? "flex" : "hidden md:flex"
          )}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-card border border-border rounded-sm text-foreground focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={listingFilter}
              onChange={(e) => setListingFilter(e.target.value)}
              className="px-4 py-3 bg-card border border-border rounded-sm text-foreground focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              {LISTING_FILTERS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mt-4">
          Showing {paginatedTokens.length} of {filteredTokens.length} items
          {searchTerm && (
            <span className="ml-2">
              for "<span className="text-foreground">{searchTerm}</span>"
            </span>
          )}
        </p>
      </section>

      {/* NFT Grid */}
      <section className="container-custom pb-24">
        {filteredTokens.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No Ordinals found with the selected filters.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setListingFilter("all");
              }}
              className="px-6 py-2 border border-border rounded-sm hover:border-accent transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedTokens.map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="group cursor-pointer"
                    onClick={() => openOnMagicEden(token)}
                  >
                    <div className="relative aspect-square rounded-sm overflow-hidden bg-muted mb-4">
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
                        <span className="absolute top-3 left-3 px-2 py-1 bg-accent text-white text-xs font-medium rounded-sm">
                          For Sale
                        </span>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="flex items-center gap-2 text-white text-sm font-medium">
                          <ExternalLink className="w-4 h-4" />
                          View on Magic Eden
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-lg mb-1 group-hover:text-accent transition-colors truncate">
                        {token.meta?.name || `Ordinal ${formatInscriptionNumber(token.inscriptionNumber)}`}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatInscriptionNumber(token.inscriptionNumber)}
                      </p>
                      {token.listedPrice ? (
                        <p className="text-accent font-medium">{formatPrice(token.listedPrice)}</p>
                      ) : (
                        <p className="text-muted-foreground text-sm">Not Listed</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-4 py-2 border border-border rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          "w-10 h-10 rounded-sm transition-colors",
                          currentPage === pageNum
                            ? "bg-accent text-white"
                            : "border border-border hover:border-accent"
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-2 border border-border rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Magic Eden Link */}
      <section className="container-custom pb-16">
        <div className="text-center">
          <a
            href={`https://magiceden.io/ordinals/marketplace/${COLLECTION_SYMBOL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-sm hover:bg-accent/90 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Full Collection on Magic Eden
          </a>
        </div>
      </section>
    </div>
  );
};

export default NFTs;
