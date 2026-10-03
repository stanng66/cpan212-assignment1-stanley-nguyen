import { config } from '../config.js';

// TODO (you): an in-memory cache where each entry expires after a set time.
const cache = new Map();   // A Map with { value, expiresAt } entries works well.

// It needs a way to get a value (counting a hit or a miss),
let hits = 0;
let misses = 0; 

const ttlSeconds = config.cacheTtlSeconds;

// Checks if any entry is expired
function isExpired(entry) {
  return Date.now() > entry.expiresAt;
}

export function get(key) {
  const entry = cache.get(key);

  if (!entry) {
    misses++;
    return undefined;
  }

  if (isExpired(entry)) {
    cache.delete(key);
    misses++;
    return undefined;
  }

  hits++;
  return entry.value;
}

// store a value,
export function set(key, value) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  cache.set(key, { value, expiresAt });   // A Map with { value, expiresAt } entries works well.
}

// and report { entries, hits, misses, ttlSeconds }. 
export function getCacheStats() {
  let entries = 0;

  for (const entry of cache.values()) {
    if (!isExpired(entry)) {
      entries++;
    }
  }

  return {
    entries,
    hits,
    misses,
    ttlSeconds
  };
}
