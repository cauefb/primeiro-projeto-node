import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';


import CreateUsersService from '../services/CreateUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    console.log('rota appointment')
    try {
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
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
});
export default sessionsRouter;
