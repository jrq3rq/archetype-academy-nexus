// localStorageUtils.js

const STORAGE_KEY = "archetypesData";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const saveDataToLocalStorage = (data) => {
  const now = new Date().getTime();
  const dataWithTimestamp = {
    data,
    timestamp: now,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
};

export const getDataFromLocalStorage = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    const { data, timestamp } = JSON.parse(storedData);
    const now = new Date().getTime();

    if (now - timestamp < EXPIRATION_TIME) {
      // Data is still valid (within 24 hours)
      return data;
    }
    // Data is expired, so remove it
    localStorage.removeItem(STORAGE_KEY);
  }
  return null;
};

export const clearLocalStorageData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
