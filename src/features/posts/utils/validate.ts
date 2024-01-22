import { object, string,number  } from 'zod';

export const postContentSchema = object({
    userId: number().positive("You must be logged in to create a post"),
    title: string().min(2, "Title can't be empty"),
    content: string().min(30, "Your post must be at least 30 characters long"),
})