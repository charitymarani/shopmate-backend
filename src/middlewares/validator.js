export default class Validator {
    static errorHandler(res, errors, next) {
        if (errors) {
            const errorObj = errors.map(err => ({
                message: err.msg,
                name: err.param
            }));
            return res.status(422).json({
                success: false,
                message: 'Validation failed',
                errors: errorObj
            });
        }
        return next();
    }
}