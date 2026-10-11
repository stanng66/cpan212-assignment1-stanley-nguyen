import { HttpError } from '../lib/http-error.js';

export function parseCity(value) {
  // TODO (you): check ?city= and return the trimmed city name. 
  if (Array.isArray(value)) {
  throw new HttpError(400, 'Invalid query', {
    city: 'city must be sent only once'
    });
  }

  if (value === undefined) {
    // Throw a 400 HttpError with details.city when it breaks a rule from the assignment page.
    throw new HttpError(400, 'Invalid query', { city: 'city must be defined' });
  }

  const trimmedCity = value.trim();

  // if empty check
  if (trimmedCity.length === 0) {
    throw new HttpError(400, 'Invalid query', { city: 'city cannot be empty' });
  }
  // Length check
  if (trimmedCity.length <2 || trimmedCity.length > 60) {
    throw new HttpError(400, 'Invalid query', { city: 'city must be between 2 and 60 characters' });
  }

  // return the trimmed city name
  return trimmedCity;
}

export function parseCities(value) {
  // TODO (you): Check ?cities= and return an array of trimmed city names.
  if (value === undefined) {
    // Throw a 400 HttpError with details.cities when it breaks a rule from the assignment page.
    throw new HttpError(400, 'Invalid query', { cities: 'city must be defined' });
  }

  const citiesNames = value.split(',').map(city => city.trim());

  // Check for too many cities (must hav 1-5 cities)
  if (citiesNames.length < 1 || citiesNames.length > 5) {
    throw new HttpError(400, 'Invalid query', { cities: 'must list 1 to 5 cities' });
  } 

  // Check for empty city names
  if (citiesNames.some(city => city.length === 0)) {
    throw new HttpError(400, 'Invalid query', { cities: 'city cannot be empty' });
  }

  // Length check for each city
  if (citiesNames.some(city => city.length < 2 || city.length > 60)) {
    throw new HttpError(400, 'Invalid query', { cities: 'city must be 2 to 60 characters' });
  }

  // Duplicate check (case-insensitive)
  const lower = citiesNames.map(c => c.toLowerCase());
  const uniqueCities = new Set(lower);
  if (uniqueCities.size !== lower.length) {
    throw new HttpError(400, 'Invalid query', { cities: 'cities cannot repeat' });
  }

  // return the array of trimmed city names
  return citiesNames;
}
