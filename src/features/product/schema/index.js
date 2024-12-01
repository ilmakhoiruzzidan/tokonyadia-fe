import {z} from "zod";

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

export const createSchema = z.object({
    name: z.string({required_error: 'Name is required'}).min(1, 'Name is required'),
    description: z.string({required_error: 'Description is required'}).min(1, 'Description is required'),
    price: z.string({required_error: 'Price is required'})
        .min(1, 'Price is required')
        .regex(/^(Rp\. )?\d{1,3}(\.\d{3})*(,\d{2})?$/, 'Invalid format rupiah'),
    category: z.string({required_error: 'Category is required'}).min(1, 'Category is required'),
    store: z.string({required_error: 'Store is required'}).min(1, 'Store is required'),
    stock: z
        .string({required_error: "Stock is required"})
        .min(1, "Stock must be greater than zero")
        .refine((value) => value > 0, {
            message: "Stock must be a positive number",
        }),
    images: z.array(z.object({
        image: z.any().refine(file => file, 'Image is required')
            .refine(file => file && IMAGE_TYPES.includes(file.type), 'Invalid input, image only!')
    })).min(1, 'Image is required')
});

export const updateSchema = z.object({
    name: z.string({required_error: 'Name is required'}).min(1, 'Name is required'),
    description: z.string({required_error: 'Description is required'}).min(1, 'Description is required'),
    price: z.string({required_error: 'Price is required'})
        .min(1, 'Price is required')
        .regex(/^(Rp\. )?\d{1,3}(\.\d{3})*(,\d{2})?$/, 'Invalid format rupiah'),
    stock: z
        .string({required_error: "Stock is required"})
        .min(1, "Stock must be greater than zero")
        .refine((value) => value > 0, {
            message: "Stock must be a positive number",
        }),
    category: z.string({required_error: 'Category is required'}).min(1, 'Category is required'),
    store: z.string({required_error: 'Store is required'}).min(1, 'Store is required'),
    images: z.array(z.object({
        image: z.any().nullish(),
        id: z.string().nullish(),
        url: z.string().nullish()
    })).refine(images => images.some(image => image.id || image.url || image.image), 'Image is required')

});
