import { HttpError } from '../lib/http-error.js';

export function parseCity(value) {
  // TODO (you): check ?city= and return the trimmed city name. 
  if (city === undefined) {
    // Throw a 400 HttpError with details.city when it breaks a rule from the assignment page.
    throw new HttpError(400, 'Invalid city query parameter', { city: 'City is required' });
  }

  const trimmedCity = city.trim();

  // if empty check
  if (trimmedCity.length === 0) {
    throw new HttpError(400, 'Invalid city query parameter', { city: 'City cannot be empty' });
  }
  // Length check
  if (trimmedCity.length <2 || trimmedCity.length > 60) {
    throw new HttpError(400, 'Invalid city query parameter', { city: 'City must be between 2 and 60 characters' });
  }

  // return the trimmed city name
  return trimmedCity;
}

export function parseCities(value) {
  // TODO (you): Check ?cities= and return an array of trimmed city names.
  if (cities === undefined) {
    // Throw a 400 HttpError with details.cities when it breaks a rule from the assignment page.
    throw new HttpError(400, 'Invalid cities query parameter', { cities: 'Cities is required' });
  }

  const citiesNames = cities.split(',').map(city => city.trim());

  // Check for empty city names
  if (citiesNames.some(city => city.length === 0)) {
    throw new HttpError(400, 'Invalid cities query parameter', { cities: 'Cities cannot contain empty names' });
  }

  // Length check for each city
  if (citiesNames.some(city => city.length < 2 || city.length > 60)) {
    throw new HttpError(400, 'Invalid cities query parameter', { cities: 'Each city must be between 2 and 60 characters' });
  }

  // Duplicate check
  const uniqueCities = new Set(citiesNames);
  if (uniqueCities.size !== citiesNames.length) {
    throw new HttpError(400, 'Invalid query', { cities: 'cities cannot repeat' });
  }

  // return the array of trimmed city names
  return citiesNames;
}
