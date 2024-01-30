import { object, string, number } from 'zod';
const isRGBColor = (value) => /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(value);
export const tagContentSchema = object({
    name: string().min(1, "Name can't be empty"),
    color: string().refine(value => isRGBColor(value), {
        message: "Invalid RGB color format"
    }),
    tagId: number().min(1, "Tag id can't be empty")
});
