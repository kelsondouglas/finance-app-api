import { UserNotFoundError } from "../../errors/user.js";
import {
  invalidAmountResponse,
  checkIfAmountIsValid,
  checkIfIdIsValid,
  invalidIdResponse,
  validateRequiredFields,
  badRequest,
  created,
  serverError,
  checkIfTypeIsValid,
} from "../helpers/index.js";

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest) {
    try {
      const body = httpRequest.body;
      const requiredFields = ["user_id", "name", "date", "amount", "type"];

      const { ok: requiredFieldsWerePassed, missingField } =
        validateRequiredFields(body, requiredFields);

      if (!requiredFieldsWerePassed) {
        return badRequest({
          message: `The field ${missingField} is required.`,
        });
      }

      const isIdValid = checkIfIdIsValid(body.user_id);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const isAmountValid = checkIfAmountIsValid(body.amount);

      if (!isAmountValid) {
        return invalidAmountResponse();
      }

      const type = body.type.trim().toUpperCase();

      const typeIsValid = checkIfTypeIsValid(type);

      if (!typeIsValid) {
        return;
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
