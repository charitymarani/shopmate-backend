import authenticate from './authenticate';
import RoleValidator from './RoleValidator';
import Validator from './validator';
import  UsersValidator from './UsersValidator';
import LoginValidator from './LoginValidator';


const middleware = {
    authenticate,
    Validator,
    UsersValidator,
    RoleValidator,
    LoginValidator
};

export default middleware;