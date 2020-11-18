import { getRepository } from 'typeorm'

import { compare } from 'bcryptjs';

import User from '../models/User'

import { sign } from 'jsonwebtoken'

interface Request {
    email: string;
    password: string;
}
interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute ({ email, password}: Request): Promise<Response> {
        const usersRepositiry = getRepository(User);

        const user = await usersRepositiry.findOne({ where: { email }});

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error('Incorrect email/password combination.');
        }

        const token = sign({},'be1ebf659fc4d8c1403b6f55e1b8107a',{
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
