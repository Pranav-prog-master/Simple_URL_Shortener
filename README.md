# Simple URL Shortener API

A RESTful API built with Node.js, Express, and MongoDB that shortens long URLs into short codes and resolves them back to the original URL.

---

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **shortid** — Short unique ID generator for URL codes
- **dotenv** — Environment variable management
- **nodemon** — Auto-restart during development

---

## Folder Structure

```
Simple URL Shortener/
├── server.js                   # Entry point
├── .env                        # Environment variables
├── .gitignore                  # Git ignored files
├── config/
│   └── db.js                   # MongoDB connection
├── model/
│   └── Url.js                  # URL schema & validation
├── controller/
│   └── urlController.js        # URL business logic
├── routes/
│   └── urlRoutes.js            # URL endpoints
└── services/
    └── urlService.js           # URL service layer
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally

### Installation

1. Clone the repository and navigate to the project folder:
```bash
cd "Simple URL Shortener"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:5000
```

4. Start MongoDB locally:
```bash
mongod
```

5. Run the server:
```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

Server runs on: `http://localhost:5000`

---

## Environment Variables

| Variable    | Description                          | Default                                    |
|-------------|--------------------------------------|--------------------------------------------|
| `PORT`      | Port the server runs on              | `5000`                                     |
| `MONGO_URI` | MongoDB connection string            | `mongodb://localhost:27017/urlshortener`   |
| `BASE_URL`  | Base URL used to build the short URL | `http://localhost:5000`                    |

---

## API Endpoints

### URL `/`

| Method | Endpoint        | Description                        | Body               |
|--------|-----------------|------------------------------------|--------------------|
| `GET`  | `/`             | Health check — API status          | —                  |
| `POST` | `/shorten`      | Shorten a long URL                 | `{ longUrl }`      |
| `GET`  | `/:shortCode`   | Resolve short code to original URL | —                  |

---

## Data Validation

### Url Model
- `shortCode` — required, unique, trimmed, 3–20 characters
- `originalUrl` — required, trimmed, must start with `http://` or `https://`, max 2048 characters

---

## How It Works

1. Client sends a `POST /shorten` request with a `longUrl`
2. Server generates a unique `shortCode` using `shortid`
3. The `shortCode` and `originalUrl` are saved to MongoDB
4. Server returns the full short URL: `http://localhost:5000/<shortCode>`
5. Client sends a `GET /:shortCode` request
6. Server looks up the `shortCode` in MongoDB and returns the `originalUrl`

---

## Example Requests

### Shorten a URL
```bash
curl -X POST http://localhost:5000/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://www.google.com"}'
```

Response:
```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

### Resolve a Short URL
```bash
curl http://localhost:5000/abc123
```

Response:
```json
{
  "originalUrl": "https://www.google.com"
}
```

### Health Check
```bash
curl http://localhost:5000
```

Response:
```json
{
  "message": "URL Shortener API is running"
}
```

---

## Error Responses

| Status Code | Description                              |
|-------------|------------------------------------------|
| `400`       | `longUrl` is missing or invalid URL format |
| `404`       | Short code not found in database         |
| `500`       | Internal server error                    |


