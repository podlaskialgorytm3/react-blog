import { object, string  } from 'zod';

export const tagContentSchema = object({
    name: string().min(1, "Name can't be empty"),
    color: string().min(1, "Color can't be empty"),
})