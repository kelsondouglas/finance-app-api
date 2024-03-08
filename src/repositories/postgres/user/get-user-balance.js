import { postgresHelper } from "../../../db/postgres/helper.js";

export class PostgresGetUserBalanceRepository {
  async execute(userId) {
    const balance = await postgresHelper.query(
      `SELECT * from get_user_balance($1)`,
      [userId],
    );

    return {
      userId,
      ...balance[0],
    };
  }
}
