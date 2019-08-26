import 'babel-polyfill';
import BaseController from './BaseController';
// import {
//     resSuccess,
//     resError
// } from '../helpers/http_handler.helper';
import customer from '../models/customer';


export default class CustomerController extends BaseController {
    // constructor() {
    //     super();
    //     // this.Model = customer;

    //     //this.load = this.load.bind(this);
    //     this.get = this.get.bind(this);
    //     // this.login = this.login.bind(this);
    // }

    //   login(req, res, next) {
    //     // Ideally you'll fetch this from the db
    //     // Idea here was to show how jwt works with simplicity
    //     this.Model.getDetail({ username: req.body.username, password: req.body.password })
    //       .then((userData) => {
    //         const token = jwt.sign({
    //           username: userData.username
    //         }, config.jwt_secret);
    //         userData = {
    //           ...userData._doc,
    //           token
    //         };
    //         return resSuccess(res, userData);
    //       })
    //       .catch(err => resError(res, err));
    //   }

    /**
     * Load user and append to req.
     */
    //   async load(req, res, next, id) {
    //     this.Model.getById(id)
    //       .then((user) => {
    //         req.user = user;
    //         return next();
    //       })
    //       .catch(e => next(e));
    //   }

    // /**
    //  * Get user
    //  * @returns {User}
    //  */
    // async get(req, res) {
    //     return res.json(req.body);
    // }
}