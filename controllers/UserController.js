import 'babel-polyfill';
import CustomerController from './CustomerController';
import bcrypt from 'bcrypt';
import {
    resSuccess,
    resError
} from '../helper/http_handler.helper';


export default class UserController extends CustomerController {

    async createUser(req, res, next) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const Customer = new this.Model(req.body);
        await Customer.save()
            .then(savedObject => resSuccess(res, savedObject))
            .catch(e => next(e));
    }

    async loginUser(req, res, next) {
        try {
            const user_name = await this.Model
                .findOne()
                .or([{
                    phoneNumber: req.body.phoneNumber
                }, {
                    email: req.body.email
                }]);

            console.log(user_name);

            if (!user_name) return res.status(400).send('Invalid username or password');

            const validpassword = await bcrypt.compare(req.body.password, user_name.password);
            const err = 'Invalid email or password';
            if (!validpassword) return resError(res, err);
            else {
                const loginObject = 'true';
                return resSuccess(res, loginObject);
            }
        } catch (e) {
            return next(e);
        }
    }

}