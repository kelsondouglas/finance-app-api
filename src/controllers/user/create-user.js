import { EmailAlreadyInUseError } from "../../errors/user.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  serverError,
} from "../helpers/index.js";

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest) {
    try {
      //pegar os dados do corpo da requisição
      const params = httpRequest.body;

      console.log(params);

      //validar a requisição(campos obrigatórios, etc...)
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || !params[field].trim().length === 0) {
          return badRequest({ message: `Missing param: ${field}` });
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
      const createdUser = await this.createUserUseCase.execute(params);

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
