// API Service para conectar ao backend
const API_BASE_URL = "https://art-api-nine.vercel.app";

// Buscar todas as coleções com subcoleções
export async function fetchAllCollections() {
  try {
    const response = await fetch(`${API_BASE_URL}/get-all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar coleções:", error);
    throw error;
  }
}

// Buscar uma subcoleção específica pelo ID
export async function fetchSubCollection(subCollectionId) {
  try {
    const collections = await fetchAllCollections();
    
    // Procurar a subcoleção em todas as coleções
    for (const collection of collections) {
      if (collection.subCollections) {
        const subCollection = collection.subCollections.find(
          (sub) => sub._id === subCollectionId || sub.name === subCollectionId
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
  
  if (!collections || !Array.isArray(collections)) {
    return subCollections;
  }
  
  collections.forEach((collection) => {
    if (collection.subCollections && Array.isArray(collection.subCollections)) {
      collection.subCollections.forEach((sub) => {
        subCollections.push({
          ...sub,
          parentCollectionId: collection._id,
          parentCollectionName: collection.name,
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
