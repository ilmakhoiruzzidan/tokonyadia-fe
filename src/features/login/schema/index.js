import {z} from "zod";

export const loginSchema = z.object({
    username: z.string({required_error: 'Username is required'})
        .min(4, 'Username minimum character is 4 character'),
    password: z.string({required_error: 'Username is required'})
        .min(8, 'Password minimum character is 8 character')
});
