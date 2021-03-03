import { getRepository } from 'typeorm'

import { compare } from 'bcryptjs';

import User from '../models/User'

import { sign, verify } from 'jsonwebtoken'
import authConfig from '../config/auth'

interface Request {
    email: string;
    password: string;
}
interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepositiry = getRepository(User);

        //procura email
        const user = await usersRepositiry.findOne({ where: { email } });

        //verifica email
        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        //compara senha criptografada com a não criptografada 
        //user.password = criptografada
        const passwordMatched = await compare(password, user.password);

        //verifica senha
        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        //const {secret, expireIn} = authConfig.jwt;

        //  const token = sign({}, secret,{
        //      subject: user.id,
        //      expiresIn: expireIn,
        //  });

        const token = sign({}, 'be1ebf659fc4d8c1403b6f55e1b8107a', {
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user,
            token

        };
    }
}

export default AuthenticateUserService;
