import models from '../../database/models';

export default class UsersController {
    static async addUser(req, res) {
        const {name, age} = req.body;
        try {
            const createUser = await models.User.create({
                name,
                age
            });
            return res.status(201).json({
                success: true,
                message: 'User added successfully',
                user: createUser
            });
        } catch (error) {
            /* istanbul ignore next */
           console.log('An error occured')
        }
    }
}