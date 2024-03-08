import { UserNotFoundError } from "../../errors/user.js";
import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from "../helpers/index.js";

export class GetUserBalanceController {
  constructor(getUserBalanceUseCase) {
    this.getUserBalanceUseCase = getUserBalanceUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;

      const idIsValid = checkIfIdIsValid(userId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const balance = await this.getUserBalanceUseCase.execute({ userId });

      return ok(balance);
    } catch (error) {
      console.error(error);

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      serverError(error);
    }
  }
}
