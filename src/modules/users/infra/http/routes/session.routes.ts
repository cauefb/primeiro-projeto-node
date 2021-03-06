import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';


import CreateUsersService from '../../../services/CreateUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    console.log('rota appointment')

    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });




    // const userWithoutPassword = {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     created_at: user.created_at,
    //     updated_at: user.updated_at,
    //   };

    return response.json({ user, token })//{ user: userWithoutPassword, token });

});
export default sessionsRouter;
