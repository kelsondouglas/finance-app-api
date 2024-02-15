import "dotenv/config";
import express from "express";
import { postgresHelper } from "./src/db/helper.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const result = await postgresHelper.query("SELECT * FROM users");

  res.send(JSON.stringify(result));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
