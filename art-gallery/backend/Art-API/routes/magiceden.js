const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

// Cache de 24 horas para evitar rate limiting
const cache = new NodeCache({ stdTTL: 86400 });

const MAGIC_EDEN_BASE_URL = 'https://api-mainnet.magiceden.dev/v2/ord/btc';

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry and exponential backoff
async function fetchWithRetry(url, params, retries = 5, initialDelay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        params,
        headers: {
          'Accept': 'application/json',
        },
        timeout: 30000
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 429 && i < retries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Rate limited. Waiting ${delay}ms before retry ${i + 1}/${retries}...`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}

// Proxy para buscar tokens de uma coleção
router.get('/tokens', async (req, res) => {
  try {
    const { collectionSymbol, limit = 100, offset = 0, sortBy = 'inscriptionNumberAsc' } = req.query;

    if (!collectionSymbol) {
      return res.status(400).json({ error: 'collectionSymbol is required' });
    }

    // Chave do cache
    const cacheKey = `tokens_${collectionSymbol}_${limit}_${offset}_${sortBy}`;
    
    // Verifica cache primeiro
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached Magic Eden data for:', collectionSymbol);
      return res.json(cachedData);
    }

    console.log('Fetching fresh data from Magic Eden for:', collectionSymbol);
    
    // Faz a requisição para Magic Eden com retry
    const data = await fetchWithRetry(`${MAGIC_EDEN_BASE_URL}/tokens`, {
      collectionSymbol,
      limit,
      offset,
      sortBy
    });

    // Armazena no cache (24h)
    cache.set(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error('Magic Eden API Error:', error.message);
    
    // Tenta retornar dados em cache mesmo se expirados
    const cacheKey = `tokens_${req.query.collectionSymbol}_${req.query.limit || 100}_${req.query.offset || 0}_${req.query.sortBy || 'inscriptionNumberAsc'}`;
    const staleData = cache.get(cacheKey);
    if (staleData) {
      console.log('Returning stale cache due to API error');
      return res.json(staleData);
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limited by Magic Eden. Please try again in a few minutes.',
        retryAfter: 60
      });
    }
    
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch from Magic Eden',
      message: error.message 
    });
  }
});

// Proxy para buscar info de uma coleção
router.get('/collections/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;

    const cacheKey = `collection_${symbol}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const url = `${MAGIC_EDEN_BASE_URL}/collections/${symbol}`;
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
      },
      timeout: 30000
    });

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Magic Eden Collection Error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch collection info',
      message: error.message 
    });
  }
});

module.exports = router;
