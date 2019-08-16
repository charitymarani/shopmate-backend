import bcrypt from 'bcrypt';
import models from '../database/models';
import Validator from './validator';
import UserHelper from '../helpers/user';

const { User } = models;

export default class LoginValidator {
    static async inputValidation(req, res, next) {
        req.checkBody('username', 'username field is required').trim().notEmpty();
        req.checkBody('password', 'password field is required').trim().notEmpty();
        const errors = req.validationErrors();
        Validator.errorHandler(res, errors, next);
    }

    static async verifyPassword(req, res, next) {
        const { username, password } = req.body;
        const query = {
            where : { username }
        };
        let user;
        try {
            user = await UserHelper.getUserFromDb(query);
        } catch (error) {
            Validator.errorHandler(res, error.message, next);
        }
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Username does not exist in our records'
            });
        }
        bcrypt.compare(password, user.password,  async function (err, result) {
            if (result === true) {
                const token = await UserHelper.setToken(user);
                req.token = token;
                next();
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'The password you entered is incorrect'
                });
            }
        });


    }
}