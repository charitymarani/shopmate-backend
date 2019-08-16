import express from 'express';
import UsersController from './UsersController';
import middlewares from '../../middlewares';

const Router = express.Router();
const {
    authenticate,
    RoleValidator,
    UsersValidator
} = middlewares;

Router.post(
    '/users',
    authenticate,
    RoleValidator.checkUserRole(['Super Administrator', 'Administrator']),
    UsersValidator.inputValidation,
    UsersValidator.validEmail,
    UsersValidator.validatePassword,
    UsersValidator.emailExists,
    UsersValidator.usernameExists,
    UsersController.addUser
);

export default Router;
