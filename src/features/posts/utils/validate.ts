import { object, string  } from 'zod';

export const postContentSchema = object({
    title: string().min(2, "Title can't be empty"),
    content: string().min(30, "Your post must be at least 30 characters long"),
})