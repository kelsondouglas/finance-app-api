import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "password",
  database: "financeapp",
});

export const postgresHelper = {
  query: async (query, params) => {
    const client = await pool.connect();
    const results = await client.query(query, params);

    await client.release();

    return results.rows;
  },
};
