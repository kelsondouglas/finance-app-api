import { prisma } from "../../../../prisma/prisma.js";

export class PostgresCreateTransactionRepository {
  async execute(createTransactionParams) {
    const transaction = await prisma.transactions.create({
      data: createTransactionParams,
    });

    return transaction;
  }
}
