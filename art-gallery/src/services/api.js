// API Service para conectar ao backend
// URL da API - mude para produção quando fizer deploy no Render
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Buscar todas as coleções com subcoleções
export async function fetchAllCollections() {
  try {
    const response = await fetch(`${API_BASE_URL}/get-all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // A API retorna { collections: [...] }, então retornamos o array de coleções
    return data.collections || data;
  } catch (error) {
    console.error("Erro ao buscar coleções:", error);
    throw error;
  }
}

// Buscar uma subcoleção específica pelo ID
export async function fetchSubCollection(subCollectionId) {
  try {
    // Tenta primeiro usar o endpoint direto da API
    try {
      const response = await fetch(`${API_BASE_URL}/subcollections/${subCollectionId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (apiError) {
      console.log("Endpoint direto não disponível, buscando em todas as coleções...");
    }
    
    // Fallback: busca em todas as coleções
    const collections = await fetchAllCollections();
    
    // Garante que collections é um array
    const collectionsArray = Array.isArray(collections) ? collections : [];
    
    // Procurar a subcoleção em todas as coleções
    for (const collection of collectionsArray) {
      const subs = collection.subCollections || collection.subcollections || [];
      if (Array.isArray(subs) && subs.length > 0) {
        const subCollection = subs.find(
          (sub) => sub._id === subCollectionId || sub.id === subCollectionId || sub.name === subCollectionId || sub.subCollectionName === subCollectionId
        );
        if (subCollection) {
          return subCollection;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Erro ao buscar subcoleção:", error);
    throw error;
  }
}

// Extrair todas as subcoleções de todas as coleções
export function extractSubCollections(collections) {
  const subCollections = [];
  
  if (!collections) {
    return subCollections;
  }
  
  // Garante que collections é um array
  const collectionsArray = Array.isArray(collections) ? collections : [];
  
  collectionsArray.forEach((collection) => {
    // Verifica tanto subCollections quanto subcollections (case insensitive)
    const subs = collection.subCollections || collection.subcollections || [];
    
    if (Array.isArray(subs) && subs.length > 0) {
      subs.forEach((sub) => {
        subCollections.push({
          ...sub,
          parentCollectionId: collection._id || collection.id,
          parentCollectionName: collection.name || collection.collectionName,
        });
      });
    }
  });
  
  return subCollections;
}

export default {
  fetchAllCollections,
  fetchSubCollection,
  extractSubCollections,
  API_BASE_URL,
};
