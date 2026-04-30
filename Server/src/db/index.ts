import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";


if (!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

//TODO: Explain about pool
//A pool manages multiple database connections and reuses them, which improves performance and scalability.
//Instead of creating a new connection for each query, the pool maintains a set of open connections that can be used by multiple requests.

const pool = new Pool({
    connectionString: ENV.DATABASE_URL,
});

pool.on("connect", () => {
    console.log("DATABASE Connected Successfully");
});

pool.on("error", (err) => {
    console.log("DATABASE Connection Error: ", err);
});

export const db = drizzle(pool, { schema });        