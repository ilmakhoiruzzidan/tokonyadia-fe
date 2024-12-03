import {z} from "zod";

export const createSchema = z.object({
    name: z.string({required_error: 'Name is required'}).min(1, 'Name is required'),
    description: z.string({required_error: 'Description is required'}).min(1, 'Description is required'),
})