import models from '../database/models';
import CustomError from '../helpers/Error';
import UserHelper from '../helpers/user';

export default class RoleValidator {
    static checkUserRole(allowedRoles) {
        return async (req, res, next) => {
            const emailAddress = req.user.UserInfo.email;
            try {
                const query = {
                    where: {
                        email: emailAddress
                    }
                };

                const user = await UserHelper.getUserFromDb(query);
                // Check whether user has any of the allowedRoles
                const hasPermission = allowedRoles.includes(user.role);
                if (!hasPermission) {
                    const error = 'You don\'t have access to perform this action';
                    return CustomError.handleError(error, 403, res);
                }
                req.user.role = user.dataValues.role
                next();
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: 'You are not signed in to the application'
                });
            }
        };
    }
}