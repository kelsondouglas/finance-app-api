import {
  checkIfEmailIsValid,
  checkIfIdIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidIdResponse,
  invalidPasswordResponse,
  badRequest,
  ok,
  serverError,
} from "./helpers/index.js";

export class UpdateUserController {
  constructor(updateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params;

      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const params = httpRequest.body;
      const allowedFields = ["first_name", "last_name", "email", "password"];

      const isSomeFieldNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (isSomeFieldNotAllowed) {
        return badRequest({ message: `Some fields are not allowed` });
      }

      if (params.password) {
        const passwordIsValid = checkIfPasswordIsValid(params.password);

        if (!passwordIsValid) {
          return invalidPasswordResponse();
        }
      }

      if (params.email) {
        const isEmailValid = checkIfEmailIsValid(params.email);

        if (!isEmailValid) {
          return emailIsAlreadyInUseResponse();
        }
      }

      const updatedUser = await this.updateUserUseCase.execute(userId, params);

      return ok(updatedUser);
    } catch (error) {
      console.error(error);

      return serverError();
    }
  }
}
