import { object, string } from 'zod';
export const userSchema = object({
    email: string().email().refine((value) => value.length > 0, "Email can't be empty"),
    password: string()
        .min(8, 'The password must be at least 8 characters long')
        .max(50, 'The password cannot be longer than 50 characters')
        .refine((value) => /[a-z]/.test(value), 'The password must contain at least one lowercase letter')
        .refine((value) => /[A-Z]/.test(value), 'The password must contain at least one uppercase letter')
        .refine((value) => /\d/.test(value), 'The password must contain at least one digit')
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), 'The password must contain at least one special character'),
    firstName: string().min(2, "First name can't be empty"),
    lastName: string().min(2, "Last name can't be empty"),
    phone: string().refine(value => /^\d{9}$/.test(value), { message: 'The telephone number must consist of 9 digits', }),
    city: string().refine((value) => value.length > 0, "City can't be empty"),
    dateOfBirth: string().refine((value) => value.length > 0, "Date of birth can't be empty")
});
export const userSchemaLogin = object({
    email: string().email().refine((value) => value.length > 0, "Email can't be empty"),
    password: string().refine((value) => value.length > 0, "Password can't be empty")
});
