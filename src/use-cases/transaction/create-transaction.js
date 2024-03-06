import { v4 as uuidv4 } from "uuid";
import { UserNotFoundError } from "../../errors/user.js";

export class CreateTransactionUseCase {
  constructor(createTransactionRepository, getUserByIdRepository) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(createTransactionParams) {
    const transactionId = uuidv4();
    const userId = createTransactionParams.user_id;

    const existingUser = await this.getUserByIdRepository.execute(userId);

    if (!existingUser) {
      throw new UserNotFoundError(userId);
    }

    const transaction = {
      id: transactionId,
      ...createTransactionParams,
    };

    const createdTransaction =
      await this.createTransactionRepository.execute(transaction);

    return createdTransaction;
  }
}
