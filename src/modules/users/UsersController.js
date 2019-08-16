import bcrypt from 'bcrypt';
import models from '../../database/models';
import Error from '../../helpers/Error';

export default class UsersController {
    static async addUser(req, res) {
        const { fullname, username, email, role, password } = req.body;
        const hash = await bcrypt.hash(password, 10, null);
        try {
            const createUser = await models.User.create({
                fullname,
                username,
                email,
                role,
                password: hash
            });
            return res.status(201).json({
                success: true,
                message: 'User added successfully',
                user: createUser
            });
        } catch (error) {
            /* istanbul ignore next */
            Error.handleError(error, 500, res);
        }
    }
}