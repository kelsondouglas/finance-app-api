import "dotenv/config";
import express from "express";
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from "./src/controllers/index.js";
import { PostgresGetUserByIdRepository } from "./src/repositories/postgres/get-user-by-id.js";
import { GetUserByIdUseCase } from "./src/use-cases/get-user-by-id.js";
import { PostgresCreateUserRepository } from "./src/repositories/postgres/create-user.js";
import { CreateUserUseCase } from "./src/use-cases/create-user.js";
import { PostgresGetUserByEmailRepository } from "./src/repositories/postgres/get-user-by-email.js";
import { PostgresDeleteUserRepository } from "./src/repositories/postgres/delete-user.js";
import { DeleteUserUseCase } from "./src/use-cases/delete-user.js";

const app = express();

app.use(express.json());

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).json(body);
});

app.post("/api/users", async (req, res) => {
  const createUserRepository = new PostgresCreateUserRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).json(body);
});

app.patch("/api/users/:userId", async (req, res) => {
  const updateUserController = new UpdateUserController();

  const { statusCode, body } = await updateUserController.execute(req);

  res.status(statusCode).json(body);
});

app.delete("/api/users/:userId", async (req, res) => {
  const deleteUserRepository = new PostgresDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  const { statusCode, body } = await deleteUserController.execute(req);

  res.status(statusCode).json(body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
