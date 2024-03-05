import validator from "validator";
import { badRequest } from "./http.js";

export const invalidPasswordResponse = () =>
  badRequest({
    message: "Password must be at least 6 characters long",
  });

export const emailIsAlreadyInUseResponse = () =>
  badRequest({
    message: "Email is invalid",
  });

export const invalidIdResponse = () =>
  badRequest({
    message: "Id is not valid",
  });

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (id) => validator.isUUID(id);
