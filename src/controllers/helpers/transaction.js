import validator from "validator";
import { badRequest } from "./http.js";

export const amountInvalidResponse = () =>
  badRequest({ message: `The amount must be a valid currency.` });

export const checkIfAmountIsValid = (amount) => {
  const isValid = validator.isCurrency(amount.toString(), {
    digits_after_decimal: [2],
    decimal_separator: ".",
  });

  return isValid;
};
