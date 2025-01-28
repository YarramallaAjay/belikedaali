import {z} from 'zod';

export const createUserSchema = z.object({
    username:z.string().min(3).max(20),
    password:z.string().min(8),
    email:z.string().email(),
});

export const signInSchema=z.object({
    username:z.string(),
    password:z.string()
})

export const createRoomSchema=z.object({
    name:z.string().min(3).max(20),
    description:z.string().min(10).max(100)});
