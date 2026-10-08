import { config } from '../config.js';
import { geocodeCity, getForecast } from './open-meteo.js';
import { describeWeatherCode } from './weather-codes.js';
import { get, set } from './cache.js';

// TODO (you): create one cache for the whole app, with a time to live of config.cacheTtlSeconds.
const cache = new Map();
let cacheHits = 0;
let cacheMisses = 0;
const ttlSeconds = config.cacheTtlSeconds;

function isExpired(entry) {
  const ageSeconds = (Date.now() - entry.storedAt) / 1000;
  return ageSeconds > ttlSeconds;
}

// TODO (you): return the weather summary for one city, in the shape shown on the assignment page.
function weatherSummary(location, forecast) {
  const current = forecast.current;
  const daily = forecast.daily;

  return {
    location: {
      name: location.name,
      region: location.region ?? null,
      country: location.country ?? null,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone
    },
    current: {
      time: current.time,
      temperatureC: current.temperature_2m,
      feelsLikeC: current.apparent_temperature,
      humidityPercent: current.relative_humidity_2m,
      windKmh: current.wind_speed_10m,
      weatherCode: current.weather_code,
      conditions: describeWeatherCode(current.weather_code)
    },

    daily: daily.time.map((date, i) => ({
      date,
      minC: daily.temperature_2m_min[i],
      maxC: daily.temperature_2m_max[i],
      precipitationChancePercent: daily.precipitation_probability_max[i] ?? null,
      weatherCode: daily.weather_code[i],
      conditions: describeWeatherCode(daily.weather_code[i])
    })),

    fetchedAt: new Date().toISOString(),
    cached: false
  };
}

export async function getCityWeather(city) {
  const key = city.trim().toLowerCase();

  // Check the cache first.
  const entry = get(key);
  if (entry && !isExpired(entry)) {
    // On a hit, return the stored summary with cached: true.
    cacheHits++;
    const cachedSummary = structuredClone(entry.summary);
    cachedSummary.cached = true;
    return cachedSummary;
  }

  // On a miss, geocode the city, get the forecast
  cacheMisses++;

  const location = await geocodeCity(city);
  const forecast = await getForecast(location.latitude, location.longitude);

  // build the summary,
  const summary = weatherSummary(location, forecast);

  // store it,
  cache.set(key, {summary, storedAt: Date.now()});

  // and return it with cached: false.
  return summary;
  // throw new Error('getCityWeather is not written yet');
}

// TODO (you): return the cache statistics for GET /api/cache/stats.
export function getCacheStats() {
  // throw new Error('getCacheStats is not written yet');
  let entries = 0;

  for (const entry of cache.values()) {
    if (!isExpired(entry)) {
      entries++;
    }
  }

  return {
    entries,
    hits: cacheHits,
    misses: cacheMisses,
    ttlSeconds: config.cacheTtlSeconds
  };
}
