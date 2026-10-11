# Assignment 1: City Weather API
- Stanley Nguyen
- Humber College
- CPAN-212-RNA
- Dor Zauri
- October 13, 2026

---
## 1. What This Project Is
This assignment works on building an Express service that answers weather questions by calling Open-Meteo, a free weather API with no key. 

---
## 2. How to Run the Project
1) npm install
2) .env.example .env
3) npm run dev or npm start

---
## 3. PORT Environment Variables
| Variable | Default | Controls |
|----------|---------|----------|
| PORT | 4000 | The port the server listens on |
| GEOCODING_URL | https://geocoding-api.open-meteo.com/v1 | Base URL of the geocoding API |
| FORECAST_URL | https://api.open-meteo.com/v1 | Base URL of the forecast API |
| UPSTREAM_TIMEOUT_MS | 5000 | How long to wait for each Open-Meteo request |
| CACHE_TTL_SECONDS | 600 | How long a cached answer stays valid |

---
### 4. Endpoints
| Endpoint | Request example | Description |
|----------|-----------------|-------------|
| GET /api/weather | curl -i "http://localhost:4000/api/weather?city=Toronto" | Looks up one city and returns a weather summary with current conditions and a 3‑day forecast. | 
| GET /api/compare | curl -i "http://localhost:4000/api/compare?cities=Toronto,Vancouver,Halifax" | Compares 2–5 cities and returns weather results plus a warmest/coldest summary. |
| GET /api/cache/stats | curl -i "http://localhost:4000/api/cache/stats" | Shows cache entries, hits, misses, and TTL. |

---
## 5. List of the Routes
| Method | Path | What it does |
|--------|------|--------------|
| GET | /api/weather?city=Toronto | Current weather and a 3-day forecast for one city |
| GET | /api/compare?cities=Toronto,Vancouver,Halifax | The same lookup for 2 to 5 cities at once, with a result for each city even when some fail |
| GET | /api/cache/stats | How many answers are cached, and how often the cache was used |

---
## 6. Testing
1. weather for a city:  
   curl -i "http://localhost:4000/api/weather?city=Toronto"  
   --> status response: 200

2. the same city again (cached):  
   curl -i "http://localhost:4000/api/weather?city=Toronto"  
   --> statuse response: 200   

3. weather without a city:  
   curl -i "http://localhost:4000/api/weather"  
   --> statuse response: 400

4. weather for a city that doesn't exist:  
   curl -i "http://localhost:4000/api/weather?city=NotARealCity"  
   --> statuse response: 404

5. compare three cities:
   curl -i "http://localhost:4000/api/compare?cities=Toronto,Vancouver,Halifax"  
   --> statuse response: 200

6. compare with one city that doesn't exist:  
   curl -i "http://localhost:4000/api/compare?cities=Toronto,FakeCity,Halifax"  
   --> statuse response: 200

7. compare too many cities:  
   curl "http://localhost:4000/api/compare?cities=Toronto,Halifax,Vancouver,Calgary,Edmonton,Ottawa"  
   --> statuse response: 400

8. compare with a repeated city:  
   curl -i "http://localhost:4000/api/compare?cities=Toronto,Halifax,toronto"  
   --> statuse response: 400

9. cache stats:
   curl -i "http://localhost:4000/api/cache/stats"  
   --> statuse response: 200

10. an unknown route: 404
    curl -i "http://localhost:4000/api/does-not-exist"  
    --> statuse response: 404

---
## 7. AI Use
- Microsoft Copilot - Used for explaining error messages and assist with minor completetions 
- Copilot auto-complete in vs code - Used sparringly when finishing out minor codes, such as Error statement, if auto suggestion fits overall logic

---
## 8. Credit
- Used the assignments/assignment-1-starter repository provided by Professor Dor.
-  Weather data provided by Open-Meteo API - https://open-meteo.com/