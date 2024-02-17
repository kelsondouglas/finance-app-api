import validator from "validator";
import { CreateUserUseCase } from "../use-cases/create-user.js";
import { badRequest, created, serverError } from "./helpers.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

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

      const passwordIsInvalid = params.password.length < 6;
      if (passwordIsInvalid) {
        return badRequest({
          message: "Password must be at least 6 characters long",
        });
      }

      //validar o email
      const isEmailValid = validator.isEmail(params.email);
      if (!isEmailValid) {
        return badRequest({ message: "Email is invalid." });
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
