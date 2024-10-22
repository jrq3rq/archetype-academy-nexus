// src/services/archetypeService.js
const BASE_URL = process.env.REACT_APP_ARCHETYPES_API_URL;

const fetchWithTimeout = (url, options = {}, timeout = 7000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

export const getAllArchetypes = async () => {
  try {
    const response = await fetchWithTimeout(BASE_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
