import {
  CreateTransactionController,
  GetTransactionByUserIdController,
  UpdateTransactionController,
  DeleteTransactionController,
} from "../../controllers/index.js";
import {
  PostgresGetTransactionsByUserIdRepository,
  PostgresGetUserByIdRepository,
  PostgresCreateTransactionRepository,
  PostgresUpdateTransactionRepository,
  PostgresDeleteTransactionRepository,
} from "../../repositories/postgres/index.js";
import {
  CreateTransactionUseCase,
  GetTransactionsByUserIdUseCase,
  UpdateTransactionUseCase,
  DeleteTransactionUseCase,
} from "../../use-cases/index.js";

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository,
  );

  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
  );

  return createTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
  const getTransactionByUserIdReposiory =
    new PostgresGetTransactionsByUserIdRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getTransactionByUserIdUseCase = new GetTransactionsByUserIdUseCase(
    getTransactionByUserIdReposiory,
    getUserByIdRepository,
  );

  const getTransactionByUserIdController = new GetTransactionByUserIdController(
    getTransactionByUserIdUseCase,
  );

  return getTransactionByUserIdController;
};

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new PostgresUpdateTransactionRepository();

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    updateTransactionRepository,
  );

  const updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase,
  );

  return updateTransactionController;
};

export const makeDeleteTransactionController = () => {
  const deleteTransactionRepository = new PostgresDeleteTransactionRepository();

  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    deleteTransactionRepository,
  );

  const deleteTransactionController = new DeleteTransactionController(
    deleteTransactionUseCase,
  );

  return deleteTransactionController;
};
