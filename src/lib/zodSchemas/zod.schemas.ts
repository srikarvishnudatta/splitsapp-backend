import z from "zod";

const emailSchema = z.string().min(1).max(50);
const passwordSchema = z.string().min(1).max(20);

export const newUserSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    first_name: z.string().min(1).max(20),
    last_name: z.string().min(1).max(20),
});
export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    userAgent:z.string().optional()
})
export const newGroupSchema = z.object({
    group_name: z.string().min(1).max(10),
    user_id: z.number()
});