import "dotenv/config";
import express from "express";
import { CreateUserController } from "./src/controllers/create-user.js";
import { GetUserByIdController } from "./src/controllers/get-user-by-id.js";

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  const createUserController = new CreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).json(body);
});

app.get("/users/:userId", async (req, res) => {
  const getUserByIdController = new GetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).json(body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
