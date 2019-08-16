import userRouter from './users';
import loginRouter from './login';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
    userRouter,
    loginRouter,
];
export default (app) => {
    routes.forEach(route => app.use(apiPrefix, route));
    return app;
};
