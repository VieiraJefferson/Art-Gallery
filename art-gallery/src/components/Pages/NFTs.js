import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  fetchAllTokensCached,
  formatPrice,
  formatInscriptionNumber,
  SORT_OPTIONS,
  LISTING_FILTERS,
} from "../../services/magicEden";

// Coleção padrão - pode ser alterada ou receber via props/params
const DEFAULT_COLLECTION = "bitcoin-frogs";

const NFTs = () => {
  // Estado dos dados
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado dos filtros/busca
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("inscriptionNumberAsc");
  const [listingFilter, setListingFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Buscar tokens da API
  const fetchTokens = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllTokensCached(DEFAULT_COLLECTION);
      setTokens(data);
    } catch (err) {
      console.error("Erro ao carregar NFTs:", err);
      setError("Erro ao carregar NFTs. Tente novamente mais tarde.");
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

    // Filtro de busca (nome, inscription, tokenId)
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

    // Filtro de preço
    if (priceRange.min) {
      const minSats = parseFloat(priceRange.min) * 100000000;
      result = result.filter(
        (token) => token.listedPrice && token.listedPrice >= minSats
      );
    }
    if (priceRange.max) {
      const maxSats = parseFloat(priceRange.max) * 100000000;
      result = result.filter(
        (token) => token.listedPrice && token.listedPrice <= maxSats
      );
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
  }, [tokens, searchTerm, sortBy, listingFilter, priceRange]);

  // Paginação
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);
  const paginatedTokens = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTokens.slice(start, start + itemsPerPage);
  }, [filteredTokens, currentPage]);

  // Reset página quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, listingFilter, priceRange]);

  // Handler para mudança de busca com debounce
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  if (loading) {
    return (
      <div className="nfts-container">
        <div className="nfts-loading">
          <div className="nfts-loading-spinner"></div>
          <p>Carregando Ordinals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="nfts-container">
        <div className="nfts-error">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button onClick={fetchTokens} className="retry-btn">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nfts-container">
      {/* Hero Section */}
      <section className="nfts-hero">
        <div className="nfts-hero-content">
          <h1>Ordinals Collection</h1>
          <p className="nfts-hero-subtitle">
            Explore {tokens.length} unique Bitcoin Ordinals from the{" "}
            <span className="highlight">{DEFAULT_COLLECTION}</span> collection
          </p>
        </div>
        <div className="nfts-hero-stats">
          <div className="stat-item">
            <span className="stat-value">{tokens.length}</span>
            <span className="stat-label">Total Items</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {tokens.filter((t) => t.listed).length}
            </span>
            <span className="stat-label">Listed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {formatPrice(
                Math.min(
                  ...tokens.filter((t) => t.listedPrice).map((t) => t.listedPrice)
                )
              )}
            </span>
            <span className="stat-label">Floor Price</span>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="nfts-filters">
        <div className="filters-row">
          {/* Search */}
          <div className="filter-group search-group">
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nome, inscription # ou ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <label>Ordenar</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Listing Filter */}
          <div className="filter-group">
            <label>Status</label>
            <select
              value={listingFilter}
              onChange={(e) => setListingFilter(e.target.value)}
              className="filter-select"
            >
              {LISTING_FILTERS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group price-range">
            <label>Preço (BTC)</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                }
                className="price-input"
                step="0.0001"
                min="0"
              />
              <span className="price-separator">—</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                }
                className="price-input"
                step="0.0001"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="results-info">
          <span>
            Mostrando {paginatedTokens.length} de {filteredTokens.length} items
          </span>
          {searchTerm && (
            <span className="search-term-badge">
              Busca: "{searchTerm}"
              <button onClick={() => setSearchTerm("")}>×</button>
            </span>
          )}
        </div>
      </section>

      {/* NFT Grid */}
      <section className="nfts-grid-section">
        {filteredTokens.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>Nenhum Ordinal encontrado com os filtros selecionados.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setListingFilter("all");
                setPriceRange({ min: "", max: "" });
              }}
              className="clear-filters-btn"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="nfts-grid">
            {paginatedTokens.map((token) => (
              <div
                key={token.id}
                className={`nft-card ${token.listed ? "listed" : ""}`}
                onClick={() => openOnMagicEden(token)}
              >
                <div className="nft-image-wrapper">
                  <img
                    src={getImageUrl(token)}
                    alt={token.meta?.name || `Ordinal #${token.inscriptionNumber}`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/img/placeholder.jpg";
                    }}
                  />
                  {token.listed && (
                    <span className="listed-badge">À Venda</span>
                  )}
                </div>
                <div className="nft-info">
                  <h3 className="nft-name">
                    {token.meta?.name ||
                      `Ordinal ${formatInscriptionNumber(token.inscriptionNumber)}`}
                  </h3>
                  <p className="nft-inscription">
                    {formatInscriptionNumber(token.inscriptionNumber)}
                  </p>
                  {token.listedPrice ? (
                    <p className="nft-price">{formatPrice(token.listedPrice)}</p>
                  ) : (
                    <p className="nft-price unlisted">Não Listado</p>
                  )}
                </div>
                <div className="nft-overlay">
                  <span className="view-btn">Ver no Magic Eden</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="nfts-pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            ««
          </button>
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ‹ Anterior
          </button>

          <div className="pagination-numbers">
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
                  className={`pagination-num ${
                    currentPage === pageNum ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Próximo ›
          </button>
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            »»
          </button>

          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
        </section>
      )}
    </div>
  );
};

export default NFTs;
