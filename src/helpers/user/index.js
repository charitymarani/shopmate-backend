import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import models from '../../database/models';

const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

class UserHelper {
    static authorizeRequests(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    static decodeToken(token) {
        const userData = jwtDecode(token);
        return userData;
    }

    static async setToken(userInfo) {
        const UserInfo = await {
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
            role: userInfo.role
        };

        const token = jwt.sign({ UserInfo }, process.env.JWT_PUBLIC_KEY, { expiresIn: '30d' });
        return token;
    }

    static async getUserFromDb(query) {
        const user = await models.User.findOne(query);
        return user;
    }

}
module.exports = UserHelper;
