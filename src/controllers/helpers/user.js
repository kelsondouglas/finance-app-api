import validator from "validator";
import { badRequest, notFound } from "./http.js";

export const invalidPasswordResponse = () =>
  badRequest({
    message: "Password must be at least 6 characters long",
  });

export const emailIsAlreadyInUseResponse = () =>
  badRequest({
    message: "Email is invalid",
  });

export const userNotFoundResponse = () =>
  notFound({ message: "User not found." });

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);
