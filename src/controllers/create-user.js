import validator from "validator";
import { CreateUserUseCase } from "../use-cases/create-user.js";

export class CreateUserController {
  async execute(httpRequest) {
    try {
      //pegar os dados do corpo da requisição
      const params = httpRequest.body;

      //validar a requisição(campos obrigatórios, etc...)
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || !params[field].trim().length === 0) {
          return {
            statusCode: 400,
            body: {
              errorMessage: `Field ${field} is required`,
            },
          };
        }
      }

      const passwordIsInvalid = params.password.length < 6;
      if (passwordIsInvalid) {
        return {
          statusCode: 400,
          body: {
            errorMessage: "Password must be at least 6 characters long",
          },
        };
      }

      //validar o email
      const isEmailValid = validator.isEmail(params.email);
      if (!isEmailValid) {
        return {
          statusCode: 400,
          body: {
            errorMessage: "Email is invalid",
          },
        };
      }

      //chamar o use case
      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return {
        statusCode: 201,
        body: createdUser,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: {
          errorMessage: "Internal Server Error",
        },
      };
    }
  }
}
