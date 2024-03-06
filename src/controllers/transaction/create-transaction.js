import { UserNotFoundError } from "../../errors/user.js";
import { badRequest, created, serverError } from "../helpers/http.js";
import {
  amountInvalidResponse,
  checkIfAmountIsValid,
} from "../helpers/transaction.js";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/user.js";

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest) {
    try {
      const body = httpRequest.body;
      const fields = ["user_id", "name", "date", "amount", "type"];

      for (let field of fields) {
        if (!body[field] || body[field].trim().length === 0) {
          return badRequest({ message: `Missing param: ${field}` });
        }
      }

      const isIdValid = checkIfIdIsValid(body.user_id);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      if (body.amount <= 0) {
        return badRequest({ message: "The amount must be greater than 0." });
      }

      const isAmountValid = checkIfAmountIsValid(body.amount);

      if (!isAmountValid) {
        return amountInvalidResponse();
      }

      const type = body.type.trim().toUpperCase();

      const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);

      if (!typeIsValid) {
        return badRequest({
          message: "The type must be EARNING, EXPENSE or INVESTMENT.",
        });
      }

      const transaction = await this.createTransactionUseCase.execute({
        ...body,
        type,
      });

      return created(transaction);
    } catch (error) {
      console.error(error);

      if (error instanceof UserNotFoundError) {
        return badRequest({ message: error.message });
      }

      return serverError();
    }
  }
}
