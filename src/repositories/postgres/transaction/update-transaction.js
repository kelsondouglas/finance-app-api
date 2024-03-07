import { postgresHelper } from "../../../db/postgres/helper.js";

export class PostgresUpdateTransactionRepository {
  async execute(userId, updateTransactionParams) {
    const updateField = [];
    const updateValues = [];

    Object.keys(updateTransactionParams).forEach((key) => {
      updateField.push(`${key} = $${updateValues.length + 1}`);
      updateValues.push(updateTransactionParams[key]);
    });

    updateValues.push(userId);

    const updateQuery = `
        UPDATE transactions
        SET ${updateField.join(", ")}
        WHERE id = $${updateValues.length}
        RETURNING *
        `;

    const updatedUser = await postgresHelper.query(updateQuery, updateValues);

    return updatedUser[0];
  }
}
