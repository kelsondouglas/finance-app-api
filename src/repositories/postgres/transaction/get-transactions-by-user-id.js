import { postgresHelper } from "../../../db/postgres/helper.js";

export class PostgresGetTransactionsByUserIdRepository {
  async execute(user_id) {
    const transactions = await postgresHelper.query(
      `SELECT * FROM transactions WHERE user_id = $1`,
      [user_id],
    );

    return transactions;
  }
}
