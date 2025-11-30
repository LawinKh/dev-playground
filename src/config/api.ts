export const API_CONFIG = {
  SPOONACULAR_API_KEY: import.meta.env.VITE_SPOONACULAR_API_KEY || '',
  SPOONACULAR_BASE_URL: 'https://api.spoonacular.com',
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string, params: Record<string, string | number | boolean> = {}) => {
  const url = new URL(`${API_CONFIG.SPOONACULAR_BASE_URL}${endpoint}`);
  url.searchParams.append('apiKey', API_CONFIG.SPOONACULAR_API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  
  return url.toString();
};