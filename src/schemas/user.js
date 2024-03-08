import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z
    .string({ required_error: `First name is required.` })
    .trim()
    .min(1, { message: `First Name is required.` }),
  last_name: z
    .string({ required_error: `Last name is required.` })
    .trim()
    .min(1, { message: `Last Name is required.` }),
  email: z
    .string({
      required_error: `E-mail is required.`,
    })
    .email({ message: `Please provide a valid email.` })
    .trim()
    .min(1),
  password: z
    .string({ required_error: `Password is required.` })
    .trim()
    .min(6, { message: `Password must contain at leats 6 character(s)` }),
});
