import express from 'express';
import { 
    createUserController, 
    usersList,
    loginUserController,
    logoutUserController
} from '../controllers/user.controller';

const userRoute = express.Router();

userRoute.post('/', createUserController);
userRoute.get('/', usersList);
userRoute.post('/login', loginUserController);
userRoute.post('/logout', logoutUserController);


export default userRoute;