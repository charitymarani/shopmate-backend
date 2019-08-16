import Error from '../../helpers/Error';

export default class LoginController {
    static async loginUser(req, res) {
        try {
            const token = req.token;
            return res.status(200).json({
                success: true,
                message: 'Login successful!',
                token: token

            });
        } catch (error) {
            /* istanbul ignore next */
            Error.handleError(error, 500, res);
        }
    }
}