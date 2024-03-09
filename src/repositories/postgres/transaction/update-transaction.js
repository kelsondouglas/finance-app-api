import { prisma } from "../../../../prisma/prisma.js";

export class PostgresUpdateTransactionRepository {
  async execute(transactionId, updateTransactionParams) {
    const transaction = await prisma.transactions.update({
      data: updateTransactionParams,
      where: {
        id: transactionId,
      },
    });

    return transaction;
  }
}
