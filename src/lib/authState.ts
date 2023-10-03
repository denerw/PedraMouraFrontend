import { cookies } from "next/headers";
import decode from 'jwt-decode'

interface User {
    sub: string,
    name: string,
    avatarUrl: string
}

export function getUser(): User{
    const token = cookies().get('token')?.value;
    
    if (token === undefined) {
        throw new Error('Token not found in cookies. You need to be authenticated');
    }

    const user: User = decode(token);
    return user;
}