# ProductHub

ProductHub is a web application featuring a robust backend API built with modern web technologies. 

## Tech Stack

**Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication:** Clerk Auth

## Features

- RESTful API endpoints for users, products, and comments.
- Secure authentication managed by Clerk.
- Relational database management using PostgreSQL and Drizzle ORM.

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database
- Clerk API keys

### Installation

1. Clone the repository.
2. Navigate to the `Server` directory:
   ```bash
   cd Server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables. Update the `.env` file in the `Server` directory with your configuration requirements (e.g., Database URL, Clerk Secret Keys, Frontend URL).
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `Server/`: Contains the backend Express API source code.
- `Client/`: Contains the frontend source code (to be initialized).

## License

ISC License