// src/utils.js
export function normalizeKeys(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const newObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const cleanKey = key.trim();  // Removes spaces before/after key
      newObj[cleanKey] = obj[key];
    }
  }
  return newObj;
}
