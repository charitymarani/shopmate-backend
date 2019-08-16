import express from 'express';
import LoginController from './LoginController';
import middlewares from '../../middlewares';

const Router = express.Router();
const {
    LoginValidator
} = middlewares;

Router.post(
    '/login',
    LoginValidator.inputValidation,
    LoginValidator.verifyPassword,
    LoginController.loginUser
);

export default Router;