import { z } from 'zod';

export const checkoutUserForm = z.object({
    name: z.string().min(1, "Name is required"),
    lastname: z.string().min(1, "Last name is required"),
    gender: z.string().min(1, "Gender is required"),
    country: z.string().min(1, "Country is required"),
    birthday: z.string().min(1, "Birthday is required"),
    identity_type: z.object({
        type: z.string().min(1, "ID Type is required"),
        number: z.string().min(1, "ID Number is required"),
        out_date: z.string().min(0, "Expiration Date is required"),
    }),
});

export const checkoutContactForm = z.object({
    prefix: z.string().min(1, "Prefix"),
    name: z.string().min(1, "Name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    country_code: z.string().min(1, ""),
    phone_number: z.string().min(1, ""),
});

export type CheckoutFormData = z.infer<typeof checkoutUserForm>;
export type CheckoutContactData = z.infer<typeof checkoutContactForm>;
