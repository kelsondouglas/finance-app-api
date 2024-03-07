import validator from "validator";
import { badRequest } from "./http.js";

export const invalidAmountResponse = () =>
  badRequest({ message: `The amount must be a valid currency.` });

export const invalidTypeResponse = () =>
  badRequest({
    message: "The type must be EARNING, EXPENSE or INVESTMENT.",
  });
export const checkIfAmountIsValid = (amount) => {
  if (typeof amount !== "number") return false;

  const isValid = validator.isCurrency(amount.toFixed(2), {
    digits_after_decimal: [2],
    decimal_separator: ".",
    allow_negatives: false,
  });

  return isValid;
};

export const checkIfTypeIsValid = (type) => {
  return ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);
};
