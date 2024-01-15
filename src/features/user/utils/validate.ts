import { object, string, number  } from 'zod';

export const userSchema = object({
    id: number(),
    firstName: string().min(2, "First name can't be empty"),
    lastName: string().min(2, "Last name can't be empty"),
    phone: string().refine(value => /^\d{9}$/.test(value), {message: 'The telephone number must consist of 9 digits',}),
    city: string().refine((value) => value.length > 0, "City can't be empty"),
    dateOfBirth: string().refine((value) => value.length > 0, "Date of birth can't be empty")
  })