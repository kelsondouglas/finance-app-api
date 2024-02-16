import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

export const postgresHelper = {
  query: async (query, params) => {
    const client = await pool.connect();
    const results = await client.query(query, params);

    await client.release();

    return results.rows;
  },
};
