import z from "zod";

export const CreateUserSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const CreateAvatarSchenma = z.object({
    name: z.string(),
    image: z.string()
})