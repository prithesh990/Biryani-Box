import 'babel-polyfill';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import CustomerController from './CustomerController';
import bcrypt from 'bcrypt';
import config from 'config';
import {
    resSuccess,
    resError
} from '../helper/http_handler.helper';

export default class UserController extends CustomerController {
    async createUser(req, res) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const User = new this.Model({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password
        });
        const token = User.generateAuthToken();
        await User.save();
        res.header('x-auth-token', token);
        return resSuccess(res, _.pick(User, ['_id', 'name', 'email', 'phoneNumber']));
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


            if (!user_name) return res.status(400).send('Invalid username or password');

            const validpassword = await bcrypt.compare(req.body.password, user_name.password);
            const err = 'Invalid email or password';
            if (!validpassword) return resError(res, err);
            else {
                const token = user_name.generateAuthToken();
                res.header('x-auth-token', token);
                return resSuccess(res, 'Token generated in header');
            }
        } catch (e) {
            return next(e);
        }
    }

}