import { config } from '../config.js';
import { HttpError } from './http-error.js';

// This is the only file that calls fetch or knows Open-Meteo's URLs.
// The exact requests are on the assignment page.

// TODO (you): write a helper that fetches a URL and returns the parsed JSON.
async function fetchJson(url) {
  // - Pass signal: AbortSignal.timeout(config.upstreamTimeoutMs) to fetch.
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(config.upstreamTimeoutMs)
    });
    if (!res.ok) {
      throw new HttpError(502, `Upstream responded with status ${res.status}`);
    }
    
    try {
      return await res.json();
    } catch {
      throw new HttpError(502, 'Upstream returned invalid JSON');
    }
  } catch (err) {
    //   - Turn every failure into an HttpError: 504 when the timeout fired (err.name is 'TimeoutError')
    if (err.name === 'TimeoutError') {
      throw new HttpError(
        504,
        `The upstream service did not respond within ${config.upstreamTimeoutMs} ms`
      );
    }

    // 502 for a network failure, a status that isn't ok, or a body that isn't JSON.
    if (err instanceof TypeError) {
      throw new HttpError(502, 'Could not get a valid response from upstream service');
    }

    throw err;
  }
}  // end of async

// TODO (you): look up a city with the geocoding API 
export async function geocodeCity(name) {
  const url = `${config.geocodingUrl}/search?name=${encodeURIComponent(name)}` + `&count=1&language=en&format=json`;
  
  const data = await fetchJson(url);

  // Throw a 404 HttpError when there are no results.
  if (!data.results || data.results.length === 0) {
    throw new HttpError(404, `City not found: ${name}`);
  }

  const r = data.results[0];

  // return { name, region, country, latitude, longitude, timezone } for the first result.
  return {
    name: r.name,
    region: r.admin1 ?? null,
    country: r.country ?? null,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone
  };
}

// TODO (you): get the current weather and a 3-day daily forecast from the forecast API 
export async function getForecast(latitude, longitude) {
  const url = `${config.forecastUrl}/forecast?latitude=${latitude}&longitude=${longitude}` + `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` + `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` + `&timezone=auto&forecast_days=3`;

  // return the parsed response.
  return await fetchJson(url);
}
