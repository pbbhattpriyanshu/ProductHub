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

### Database Migrations

The project uses Drizzle ORM for database schemas and migrations.

- **Fresh Deployment:** You can push the schema directly to your new database using `npm run db:push` or generate migrations with `npm run db:generate`.
- **Existing Deployments (Important):** If you are migrating an existing database (e.g., updating the `comments.product_id` column type from `text` to `uuid`), the schema change alone will fail. You must manually run the following SQL to cast the column type before pushing the schema:
  ```sql
  ALTER TABLE "comments" ALTER COLUMN "product_id" TYPE uuid USING "product_id"::uuid;
  ```

## Project Structure

- `Server/`: Contains the backend Express API source code.
- `Client/`: Contains the frontend source code (to be initialized).

## License

ISC License