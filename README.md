# Express Middleware for Token Bucket Rate Limiting

This project is a middleware for Express.js applications that implements the Token Bucket algorithm for rate-limiting incoming API requests.
You can check more info about the Token Bucket algorithm [here](https://en.wikipedia.org/wiki/Token_bucket)
and [here](https://blog.logrocket.com/rate-limiting-node-js/).

## Features

- User identification by IP address
- Smooth rate-limiting via the Token Bucket algorithm
- Rate-limit status provided in response headers (`X-RateLimit-*`)

## Getting Started

### Prerequisites

- Node.js installed
- npm or yarn package manager

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/lyon93/express-rate-limit.git
   ```

2. Navigate to the project directory.

   ```bash
   cd express-rate-limit
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Run the TypeScript compiler.

   ```bash
   npm run build
   ```

5. Start the Express server.
   ```bash
   npm start
   ```

## Usage

curl http://localhost:3000/users
