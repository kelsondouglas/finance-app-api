import { CreateUserUseCase } from "../use-cases/create-user.js";
import { badRequest, created, serverError } from "./helpers/http.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidPasswordResponse,
} from "./helpers/user.js";

export class CreateUserController {
  async execute(httpRequest) {
    try {
      //pegar os dados do corpo da requisição
      const params = httpRequest.body;

      //validar a requisição(campos obrigatórios, etc...)
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || !params[field].trim().length === 0) {
          return badRequest({
            message: `Field ${field} is required`,
          });
        }
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password);
      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      //validar o email
      const isEmailValid = checkIfEmailIsValid(params.email);
      if (!isEmailValid) {
        return emailIsAlreadyInUseResponse();
      }

      //chamar o use case
      const createUserUseCase = new CreateUserUseCase();
      const createdUser = await createUserUseCase.execute(params);

      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }

      console.error(error);
      return serverError();
    }
  }
}
