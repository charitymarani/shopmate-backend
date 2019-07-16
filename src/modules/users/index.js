import express from 'express';
import UsersController from './UsersController';

const Router = express.Router();

Router.post(
    '/users',
    UsersController.addUser
);

export default Router;