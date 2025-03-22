Average Calculator Microservice

🚀 Project Overview

This project is a React-based microservice that calculates the average of numbers fetched from a third-party API. The microservice exposes an endpoint (numbers/{numberid}) that accepts qualified number IDs:

p for Prime numbers

f for Fibonacci numbers

e for Even numbers

r for Random numbers

It maintains a sliding window (default: 10 numbers) while ensuring:

Unique storage (ignoring duplicates)

Fast response time (<500ms) by discarding slow API responses

Rolling window mechanism (removing oldest numbers when full)

📌 Features

✅ Fetches numbers from a third-party API
✅ Stores only unique numbers
✅ Maintains a rolling window of the latest 10 numbers
✅ Returns the previous and current window state with the calculated average
✅ Handles slow responses (ignoring requests taking >500ms)
✅ Uses Semantic UI for a clean, responsive UI

🛠️ Tech Stack

Frontend: React, Semantic UI React

Backend: Node.js, Express.js

API: External third-party number generator API
