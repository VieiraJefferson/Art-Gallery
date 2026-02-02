import axios from "axios";

// Usa o proxy do backend para evitar CORS
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const BASE_URL = `${API_BASE_URL}/magiceden`;

// Cache simples em memória
const cache = {
  data: null,
  timestamp: null,
  ttl: 5 * 60 * 1000, // 5 minutos
};

// Sleep para retry/backoff
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Função com retry e exponential backoff para rate limit
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        ...options,
        headers: {
          Accept: "application/json",
          ...options.headers,
        },
      });
      return response.data;
    } catch (error) {
      // Se for rate limit (429), espera e tenta novamente
      if (error.response?.status === 429 && i < retries - 1) {
        const waitTime = delay * Math.pow(2, i); // Exponential backoff
        console.warn(`Rate limited. Retrying in ${waitTime}ms...`);
        await sleep(waitTime);
        continue;
      }
      // Se for último retry ou outro erro, lança
      if (i === retries - 1) {
        throw error;
      }
    }
  }
}

/**
 * Busca tokens (NFTs/Ordinals) de uma coleção específica
 * @param {Object} params
 * @param {string} params.collectionSymbol - Símbolo da coleção no Magic Eden
 * @param {number} params.limit - Quantidade de itens por página (max 100)
 * @param {number} params.offset - Offset para paginação
 * @param {string} params.sortBy - Campo para ordenação
 * @param {boolean} params.listed - Filtrar apenas listados
 * @returns {Promise<Array>} Lista de tokens
 */
export async function fetchCollectionTokens({
  collectionSymbol,
  limit = 100,
  offset = 0,
  sortBy = "inscriptionNumberAsc",
  listed = null,
}) {
  const params = new URLSearchParams({
    collectionSymbol,
    limit: limit.toString(),
    offset: offset.toString(),
    sortBy,
  });

  // Adiciona filtro de listados se especificado
  if (listed !== null) {
    params.append("listed", listed.toString());
  }

  // Usa o proxy do backend
  const url = `${BASE_URL}/tokens?${params.toString()}`;

  try {
    const data = await fetchWithRetry(url);
    return data.tokens || [];
  } catch (error) {
    console.error("Erro ao buscar tokens:", error);
    throw error;
  }
}

/**
 * Busca todos os tokens de uma coleção (até 100 itens) com cache
 * @param {string} collectionSymbol - Símbolo da coleção
 * @param {boolean} forceRefresh - Forçar atualização do cache
 * @returns {Promise<Array>} Lista completa de tokens
 */
export async function fetchAllTokensCached(collectionSymbol, forceRefresh = false) {
  const cacheKey = `tokens_${collectionSymbol}`;
  const now = Date.now();

  // Verifica cache
  if (
    !forceRefresh &&
    cache.data &&
    cache.data[cacheKey] &&
    cache.timestamp &&
    now - cache.timestamp < cache.ttl
  ) {
    console.log("Retornando dados do cache");
    return cache.data[cacheKey];
  }

  // Busca dados frescos
  console.log("Buscando dados da API Magic Eden via proxy...");
  const tokens = await fetchCollectionTokens({
    collectionSymbol,
    limit: 100,
    offset: 0,
  });

  // Atualiza cache
  if (!cache.data) cache.data = {};
  cache.data[cacheKey] = tokens;
  cache.timestamp = now;

  return tokens;
}

/**
 * Busca informações de uma coleção específica
 * @param {string} collectionSymbol - Símbolo da coleção
 * @returns {Promise<Object>} Dados da coleção
 */
export async function fetchCollectionInfo(collectionSymbol) {
  const url = `${BASE_URL}/collections/${collectionSymbol}`;

  try {
    const data = await fetchWithRetry(url);
    return data;
  } catch (error) {
    console.error("Erro ao buscar info da coleção:", error);
    throw error;
  }
}

/**
 * Busca coleções disponíveis
 * @param {number} limit - Quantidade de coleções
 * @param {number} offset - Offset para paginação
 * @returns {Promise<Array>} Lista de coleções
 */
export async function fetchCollections(limit = 20, offset = 0) {
  const url = `${BASE_URL}/collections?limit=${limit}&offset=${offset}`;

  try {
    const data = await fetchWithRetry(url);
    return data.collections || [];
  } catch (error) {
    console.error("Erro ao buscar coleções:", error);
    throw error;
  }
}

// Tipos de ordenação disponíveis
export const SORT_OPTIONS = [
  { value: "inscriptionNumberAsc", label: "Inscription # ↑" },
  { value: "inscriptionNumberDesc", label: "Inscription # ↓" },
  { value: "priceAsc", label: "Preço ↑" },
  { value: "priceDesc", label: "Preço ↓" },
];

// Filtros de listagem
export const LISTING_FILTERS = [
  { value: "all", label: "Todos" },
  { value: "listed", label: "À Venda" },
  { value: "unlisted", label: "Não Listados" },
];

/**
 * Formata o preço de satoshis para BTC
 * @param {number} satoshis - Preço em satoshis
 * @returns {string} Preço formatado em BTC
 */
export function formatPrice(satoshis) {
  if (!satoshis) return "—";
  const btc = satoshis / 100000000;
  return `${btc.toFixed(6)} BTC`;
}

/**
 * Formata número de inscrição
 * @param {number} inscriptionNumber - Número da inscrição
 * @returns {string} Número formatado
 */
export function formatInscriptionNumber(inscriptionNumber) {
  if (!inscriptionNumber && inscriptionNumber !== 0) return "—";
  return `#${inscriptionNumber.toLocaleString()}`;
}
