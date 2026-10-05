import { Router } from 'express';
import { parseCity, parseCities } from '../validators/weather-query.js';
import { getCityWeather } from '../lib/weather.js';

export const weatherRouter = Router();

// TODO (you): GET /api/weather?city=Toronto
weatherRouter.get('/weather', async (req, res, next) => {
  // Validate with parseCity, get the summary with getCityWeather
  try {
    const city = parseCity(req.query.city);
    const summary = await getCityWeather(city);

    // respond with { data, attribution }. Routes never call fetch themselves.
    res.json({ data: summary, attribution: "Weather data by Open-Meteo.com (https://open-meteo.com/)" });

  } catch (error) {
    next(error);
  }
});

// TODO (you): GET /api/compare?cities=Toronto,Vancouver,Halifax
weatherRouter.get('/compare', async (req, res, next) => {
  try {
    // Validate with parseCities, 
    const cities = parseCities(req.query.cities);

    // start every lookup at once with Promise.allSettled,
    const lookups = cities.map(city => getCityWeather(city));
    const results = await Promise.allSettled(lookups);
    // then build the cities array
    const finalArray = results.map((result, index) => {
      const city = cities[index];
      if (result.status === 'fulfilled') { 
        return { city, ok: true, weather: result.value };
      }
      return { city, ok: false, error: { status: result.reason.status ?? 500, message: result.reason.message } };
    });

    // and the summary described on the assignment page.
    const succeeded = finalArray.filter(c => c.ok).length;
    const failed = finalArray.filter(c => !c.ok).length;
    let warmest = null;
    let coldest = null;
    const successfulCities = finalArray.filter(c => c.ok);

    if (successfulCities.length > 0) {
      // warmest = highest current.temperatureC
      warmest = successfulCities.reduce((a, b) =>
        a.weather.current.temperatureC >= b.weather.current.temperatureC ? a : b
      ).city;

      // coldest = lowest current.temperatureC
      coldest = successfulCities.reduce((a, b) =>
        a.weather.current.temperatureC <= b.weather.current.temperatureC ? a : b
      ).city;
    }

    res.json({ data: {cities: finalArray, summary: { succeeded, failed, warmest, coldest } }, attribution: "Weather data by Open-Meteo.com (https://open-meteo.com/)" });
  } catch (error) {
    next(error);
  }
});
