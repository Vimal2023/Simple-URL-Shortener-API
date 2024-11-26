# URL Shortener API
A simple backend service for shortening URLs, retrieving original URLs, and tracking usage statistics.

## Features
- Shorten long URLs to unique short URLs.
- Redirect short URLs to their original destination.
- Track usage statistics for each short URL, including: Total clicks.
- Timestamp of the last access.
- Rate limiting (Bonus feature).
- Environment-based configuration.

## Getting Started
### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas or a locally installed MongoDB instance.
### 2. Clone the Repository
- bash
- Copy code
```git clone https://github.com/your-username/url-shortener-api.git```
- cd url-shortener-api

### 3. Install Dependencies
- bash
- Copy code
```npm install```

### 4. Environment Configuration
Create a ```.env``` file in the root directory with the following content:

- Copy code
``` PORT=5000, MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/url-shortener?retryWrites=true&w=majority```

- Replace <username> and <password> with your MongoDB credentials.

### 5. Start the Server
- For production:

```npm start```

- For development (with hot reload):

```npm run dev```


## API Endpoints
### 1. POST /shorten
Shortens a given URL.

- Request: json

-Copy code
```{ "originalUrl": "https://example.com" }```


-Response (201 Created): json
- Copy code
```{ "originalUrl": "https://example.com", "shortUrl": "http://localhost:5000/abcd1234" }```

### 2. GET /:shortId
- Redirects the user to the original URL using the shortId.

- Request: Access the URL in a browser or via Postman:
- Copy code
- GET ```http://localhost:5000/abcd1234```
- Response: Redirects to the original URL (e.g., ```https://example.com```).


### 3. GET /stats/:shortId
- Retrieves statistics for a specific short URL.

- Request: 
- Copy code
- GET ```http://localhost:5000/stats/shortId```
  
- Response (200 OK):
- Copy code
``` { "originalUrl": "https://example.com", "clicks": 5, "lastAccessed": "2024-11-26T12:34:56.789Z" }```

 ## Error Handling
### 1. Invalid URL Input
- Request: json
- Copy code
```{ "originalUrl": "invalid-url" }```
- Response (400 Bad Request): json
- Copy code
``` { "error": "Invalid URL" }```
### 2. Nonexistent Short URL
- Request: bash
- Copy code
GET ```http://localhost:5000/nonexistentId```
- Response (404 Not Found): json
- Copy code
``` { "error": "Short URL not found" } ```
### 3. Rate Limit Exceeded
- Response (429 Too Many Requests): json
- Copy code
```{ "error": "Too many requests" } ```


# Deployment
- The application is deployed on Render.
- Access the live API at:
