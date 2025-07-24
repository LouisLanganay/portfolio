import axios from 'axios';

// In-memory cache to avoid repeated API calls
const repositoryCache = new Map<string, any>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
}

export const getRepository = async (link: string) => {
  const repositoryName = link.split('/').slice(-1)[0];
  const cacheKey = `LouisLanganay/${repositoryName}`;
  
  // Check cache
  const cached = repositoryCache.get(cacheKey) as CacheEntry;
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const result = await axios.get(`https://api.github.com/repos/${cacheKey}`, {
      timeout: 5000, // 5 seconds timeout
    });
    
    if (result.status === 200) {
      // Cache the result
      repositoryCache.set(cacheKey, {
        data: result.data,
        timestamp: Date.now()
      });
      return result.data;
    }
    return null;
  } catch (error) {
    console.warn(`Failed to fetch repository ${cacheKey}:`, error);
    return null;
  }
};
