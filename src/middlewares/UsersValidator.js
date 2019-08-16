import models from '../database/models';
import Validator from './validator';

const { User } = models;

export default class UsersValidator {
    static async inputValidation(req, res, next) {
        req.checkBody('fullname', 'fullname field  is required').trim().notEmpty();
        req.checkBody('username', 'username field is required').trim().notEmpty();
        req.checkBody('email', 'email field is required').trim().notEmpty();
        req.checkBody('role', 'role field is required').trim().notEmpty();
        req.checkBody('password', 'password field is required').trim().notEmpty();
        req.checkBody('confirm_password', 'confirm_password field is required').trim().notEmpty();
        const errors = req.validationErrors();
        Validator.errorHandler(res, errors, next);
    }

    static async validEmail(req, res, next) {
        req.checkBody('email').isEmail()
            .withMessage('Please provide a valid email');
        const errors = req.validationErrors();
        Validator.errorHandler(res, errors, next);
    }

    static async emailExists(req, res, next) {
        const{ email } = req.body;
        let result;
        try {
            result = await User.findOne({
                where: {
                    email
                }
            });
        } catch (error) {
            Validator.errorHandler(res, error.message, next);
        }
        if (result) {
            return res.status(409).send({
                success: false,
                message: 'The email provided is already in use'
            });
        }
        next();
    }
    static async validatePassword(req, res, next) {
        const { password, confirm_password } = req.body;
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
        if (password !== confirm_password) {
            return res.status(400).send({
                success: false,
                message: 'The passwords do not match'
            })
        }
        if (!pattern.test(password)) {
            return res.status(400).send({
                success: false,
                message: 'The password must contain a lowercase, uppercase letter and a number'
            })

        }
        next();
    }

    static async usernameExists(req,res,next) {
        const{ username } = req.body;
        let result;
        try {
            result = await User.findOne({
                where: {
                    username
                }
            });
        } catch (error) {
            Validator.errorHandler(res, error.message, next);
        }
        if (result) {
            return res.status(409).send({
                success: false,
                message: 'The username provided is already in use'
            });
        }
        next();
    }
}