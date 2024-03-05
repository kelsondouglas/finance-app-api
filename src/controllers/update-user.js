import validator from "validator";
import { badRequest, notFound, ok, serverError } from "./helpers/http.js";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidIdResponse,
  invalidPasswordResponse,
} from "./helpers/user.js";

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params;

      const isIdValid = validator.isUUID(userId);

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

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const existingUser = await getUserByIdUseCase.execute(userId);

      if (!existingUser) {
        return notFound({ message: `User not found!` });
      }

      const updateUserUseCase = new UpdateUserUseCase();

      const updatedUser = await updateUserUseCase.execute(userId, params);

      return ok(updatedUser);
    } catch (error) {
      console.error(error);

      return serverError();
    }
  }
}
