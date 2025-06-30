# Bhandara Backend

This is the backend service for the **PindDaLangar** app, a platform to discover and list free food distribution events (Bhandaras).

---

## 🗂️ Project Structure

```
BACKEND/
├── db/
│   └── connectToMongo.js       # MongoDB connection setup
│
├── middleware/
│   └── cleanup.js              # Middleware to delete expired Bhandaras
│
├── models/
│   └── bhandara.model.js       # Mongoose schema/model for Bhandaras
│
├── routes/
│   └── bhandaraRoute.js        # API routes for creating and fetching Bhandaras
│
├── index.js                    # Main entry point (Express server setup)
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Locked dependency versions
```

---

## 🧠 Key Features

- **GET /bhandaras**  
  Returns a list of nearby Bhandaras within a 5 km radius, based on latitude and longitude.

- **POST /bhandaras**  
  Creates a new Bhandara with title, location, organizer, time, and food items.

- **Middleware: Cleanup**  
  Deletes expired Bhandaras automatically before handling requests.

---

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone <repo-url>
   cd BACKEND
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up `.env`
   ```
   MONGODB_URI=<your-mongo-db-uri>
   PORT=5000
   ```

4. Run the server
   ```bash
   node index.js
   ```

---

## 📦 API Routes (defined in `routes/bhandaraRoute.js`)

| Method | Route         | Description                            |
|--------|---------------|----------------------------------------|
| GET    | /bhandaras    | Get nearby Bhandaras                   |
| POST   | /bhandaras    | Add a new Bhandara                     |

---

## 🧹 Auto Cleanup

The `middleware/cleanup.js` is called before every route to remove any Bhandaras whose `endTime` is in the past.

---

## 🛠️ Future Improvements

- Add caching and offline support
- Integrate authentication for organizers
- Add location-based filtering on frontend

---
