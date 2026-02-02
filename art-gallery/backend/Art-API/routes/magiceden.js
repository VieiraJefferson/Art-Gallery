const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

// Cache de 5 minutos
const cache = new NodeCache({ stdTTL: 300 });

const MAGIC_EDEN_BASE_URL = 'https://api-mainnet.magiceden.dev/v2/ord/btc';

// Proxy para buscar tokens de uma coleção
router.get('/tokens', async (req, res) => {
  try {
    const { collectionSymbol, limit = 100, offset = 0, sortBy = 'inscriptionNumberAsc' } = req.query;

    if (!collectionSymbol) {
      return res.status(400).json({ error: 'collectionSymbol is required' });
    }

    // Chave do cache
    const cacheKey = `tokens_${collectionSymbol}_${limit}_${offset}_${sortBy}`;
    
    // Verifica cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached Magic Eden data');
      return res.json(cachedData);
    }

    // Faz a requisição para Magic Eden
    const url = `${MAGIC_EDEN_BASE_URL}/tokens`;
    const response = await axios.get(url, {
      params: {
        collectionSymbol,
        limit,
        offset,
        sortBy
      },
      headers: {
        'Accept': 'application/json',
      },
      timeout: 30000
    });

    // Armazena no cache
    cache.set(cacheKey, response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Magic Eden API Error:', error.message);
    
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limited. Please try again later.' });
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
