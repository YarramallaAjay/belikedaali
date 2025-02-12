import {z} from 'zod';

export const createUserSchema = z.object({
    username:z.string().min(3).max(20),
    password:z.string().min(8),
    email:z.string().email(),
});

export const signInSchema=z.object({
    email:z.string().email(),
    password:z.string()
})

export const createRoomSchema=z.object({
    slug:z.string().min(3).max(20)})