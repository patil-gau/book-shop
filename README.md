# Book Shop

## Description

Book Shop is a simple CRUD (Create, Read, Update, Delete) application for book management using Node.js, Express, MongoDB, and Redis. This project provides a platform for managing and accessing information about books. It includes features like rate limiting, pagination, Redis caching, and database indexing to optimize book management and access.

## Tech Stack

- **Node.js**: A runtime environment for executing JavaScript on the server-side.
- **Express**: A web application framework for Node.js that simplifies building APIs.
- **MongoDB**: A NoSQL database for storing and retrieving book data.
- **Redis**: An in-memory data store used for caching and rate limiting.

## Features

1. **CRUD Operations**: Perform Create, Read, Update, and Delete operations on books with comprehensive data validation.

2. **Rate Limiting**: Implement rate limiting to control the number of requests per IP address, preventing abuse and ensuring fair access.

3. **Pagination**: Enable paginated results to efficiently display a large number of books, enhancing the user experience.

4. **Redis Caching**: Utilize Redis caching to improve API response times and reduce the load on the MongoDB database.

5. **Indexing**: Apply database indexing to optimize query performance for common fields, making searches faster.

## Installation

### Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/): You'll need Node.js to run the project.

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/patil-gau/book-shop
   .git
   ```

2. **Move into Project Folder**:
   cd book-shop

3. **Install Dependiences**:
   npm install

4. **Setup ENV FILE**:
   create a .env file with the following variables
   PORT=your-port
   DB_URL=your-mongodb-connection-url
   SECRET=your-secret-key
   REDIS_HOST=redis-host
   REDIS_PORT=redis-port
   ENVIRONMENT=staging

5. **Start Application**:
   npm start
   npm run dev to start it in debug mode

## API Documentation

### Authentication

- **`/login` (POST)**: Generates a token for authentication.

### Book Management

- **`/book` (POST)**: Create a new book.
- **`/book/:id` (GET)**: Retrieve a book by ID.
- **`/book/:id` (DELETE)**: Delete a book by ID.
- **`/book/:id` (PUT)**: Update a book by ID.
- **`/books` (GET)**: Get a list of books in a paginated form.
