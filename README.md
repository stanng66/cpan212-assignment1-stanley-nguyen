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
'''bash
1) npm install
2) .env.example .env
3) npm run dev

---
## 3. PORT Environment Variables
- 

---
## 4. List of the Routes
| Method | Path | What it does |
|--------|------|--------------|
| GET | /api/weather?city=Toronto | Current weather and a 3-day forecast for one city |
| GET | /api/compare?cities=Toronto,Vancouver,Halifax | The same lookup for 2 to 5 cities at once, with a result for each city even when some fail |
| GET | /api/cache/stats | How many answers are cached, and how often the cache was used |

---
## 5. Testing
1. weather for a city:  --> 
2. the same city again (cached):  --> 
3. weather without a city:  --> 
4. weather for a city that doesn't exist:  --> 
5. compare three cities:  --> 
6. compare with one city that doesn't exist:  --> 
7. compare too many cities:  --> 
8. compare with a repeated city:  --> 
9. cache stats:  --> 
10. an unknown route:  --> 

---
## 6. AI Use
- Copilot for explaining error messages when using npm run dev to quality check every file I worked on before pushing 
- 

---
## 7. Credit
- Used the assignments/assignment-1-starter repository provided by Professor Dor.
-  Open-Meteo API - https://open-meteo.com/

