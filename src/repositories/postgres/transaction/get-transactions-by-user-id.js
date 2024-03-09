import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetTransactionsByUserIdRepository {
  async execute(user_id) {
    const transactions = await prisma.transactions.findMany({
      where: { user_id },
    });

    return transactions;
  }
}
