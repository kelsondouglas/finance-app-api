import { postgresHelper } from "../../db/postgres/helper.js";

export class PostgresUpdateUserRepository {
  async execute(userId, updateUserParams) {
    const updateField = [];
    const updateValues = [];

    Object.keys(updateUserParams).forEach((key) => {
      updateField.push(`${key} = $${updateValues.length + 1}`);
      updateValues.push(updateUserParams[key]);
    });

    updateValues.push(userId);

    const updateQuery = `
    UPDATE users
    SET ${updateField.join(", ")}
    WHERE id = $${updateValues.length}
    RETURNING *
    `;

    const updatedUser = await postgresHelper.query(updateQuery, updateValues);

    return updatedUser[0];
  }
}
