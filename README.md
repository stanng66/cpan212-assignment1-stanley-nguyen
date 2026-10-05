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
## 4. List of the Routes
| Method | Path | What it does |
|--------|------|--------------|
| GET | /api/weather?city=Toronto | Current weather and a 3-day forecast for one city |
| GET | /api/compare?cities=Toronto,Vancouver,Halifax | The same lookup for 2 to 5 cities at once, with a result for each city even when some fail |
| GET | /api/cache/stats | How many answers are cached, and how often the cache was used |

---
## 5. Testing
1. weather for a city:  
curl -i "http://localhost:4000/api/weather?city=Toronto"  
-> 200

2. the same city again (cached):  
   curl -i "http://localhost:4000/api/weather?city=Toronto"  
   --> 200

3. weather without a city:  
   curl -i "http://localhost:4000/api/weather"  
   --> 400

4. weather for a city that doesn't exist:  
   curl -i "http://localhost:4000/api/weather?city=NotARealCity"  
   --> 404 

5. compare three cities:  
   curl -i "http://localhost:4000/api/compare?cities=Toronto,Vancouver,Halifax"  
   --> 200

6. compare with one city that doesn't exist:  
   curl -i "http://localhost:4000/api/compare?cities=Toronto,FakeCity,Halifax"  
   --> 200

7. compare too many cities:  
   curl -i "http://localhost:4000/api/compare?cities=A,B,C,D,E,F"  
   --> 400

8. compare with a repeated city:  
   curl -i "http://localhost:4000/api/compare?cities=Toronto,Toronto"  
   --> 400

9. cache stats:  
   curl -i "http://localhost:4000/api/cache/stats"  
   --> 200

10. an unknown route:  
    curl -i "http://localhost:4000/api/does-not-exist"  
    --> 404

---
## 6. AI Use
- Copilot for explaining error messages when using npm run dev to quality check every file I worked on before pushing 
- Used copilot auto-complete in vs code sparringly when finishing out minor codes, such as Error statement, if auto suggestion fits overall logic

---
## 7. Credit
- Used the assignments/assignment-1-starter repository provided by Professor Dor.
-  Open-Meteo API - https://open-meteo.com/