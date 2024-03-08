import validator from "validator";
import { z } from "zod";

export const createTransactionSchema = z.object({
  user_id: z.string().uuid({ message: "User ID must be a valid UUID." }),
  name: z.string().trim().min(1, { message: `Name is required.` }),
  date: z.string().datetime({ message: "Date must be a valid ISO Date." }),
  type: z.enum(["EXPENSE", "EARNING", "INVESTMENT"], {
    errorMap: () => ({
      message: `Type must be EXPENSE, EARNING or INVESTMENT.`,
    }),
  }),
  amount: z
    .number({ invalid_type_error: "Amount must be a number." })
    .min(1, { message: "Amount must be greater than 0." })
    .refine((value) => {
      return validator.isCurrency(value.toFixed(2), {
        digits_after_decimal: [2],
        decimal_separator: ".",
        allow_negatives: false,
      });
    }),
});
