import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactionsByUserIdUseCase {
  constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
    this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(params) {
    const { userId } = params;

    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactions =
      await this.getTransactionsByUserIdRepository.execute(userId);

    return transactions;
  }
}
