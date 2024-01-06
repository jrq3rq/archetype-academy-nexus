// src/services/archetypeService.js
const BASE_URL = process.env.REACT_APP_ARCHETYPES_API_URL;

export const getAllArchetypes = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
