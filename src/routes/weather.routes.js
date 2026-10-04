import { Router } from 'express';
import { parseCity } from '../validators/weather-query.js';
import { getCityWeather } from '../lib/weather.js';

export const weatherRouter = Router();

// TODO (you): GET /api/weather?city=Toronto
// Validate with parseCity, get the summary with getCityWeather, and respond
// with { data, attribution }. Routes never call fetch themselves.
weatherRouter.get('/weather', async (req, res) => {
  // Validate with parseCity, get the summary with getCityWeather
  try {
    const city = parseCity(req.query.city);
    const summary = await getCityWeather(city);

    // respond with { data, attribution }. Routes never call fetch themselves.
    res.json({ data: summary, attribution: 'Weather data provided by Open-Meteo.com' });

  } catch (error) {
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
  // res.status(501).json({ error: { message: 'Not written yet: GET /api/weather' } });
});

// TODO (you): GET /api/compare?cities=Toronto,Vancouver,Halifax
// Validate with parseCities, start every lookup at once with Promise.allSettled,
// then build the cities array and the summary described on the assignment page.
weatherRouter.get('/compare', (req, res) => {
  res.status(501).json({ error: { message: 'Not written yet: GET /api/compare' } });
});
