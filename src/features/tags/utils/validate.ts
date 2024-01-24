import { object, string  } from 'zod';

const isRGBColor = (value: string) => /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(value);

export const tagContentSchema = object({
    name: string().min(1, "Name can't be empty"),
    color: string().refine(value => isRGBColor(value), {
        message: "Invalid RGB color format"
    })
});
