import { addUser, getDepartments, getRoles, getUsers, logTime, login, logout } from '@src/controllers/userController';
import { verifyToken } from '@src/util/auth';
import { getUserRole } from '@src/util/middleware';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/login', login);

userRouter.post('/addUser',[verifyToken,getUserRole], addUser);

userRouter.get('/getusers',[verifyToken,getUserRole],getUsers);                                                     //,logRequest in middleware

userRouter.post('/logout',verifyToken,logout);

userRouter.post('/logTime',verifyToken,logTime);

userRouter.get('/getRoles',[verifyToken,getUserRole],getRoles);

userRouter.get('/getDepartments',[verifyToken,getUserRole],getDepartments);



export default userRouter;