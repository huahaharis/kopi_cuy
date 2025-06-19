import bycript from 'bcrypt';

export async function hashPassword(password:string) {
    return bycript.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return await bycript.compare(password, hashedPassword);
}