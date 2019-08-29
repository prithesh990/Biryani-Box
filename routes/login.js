import Joi from 'joi';
import express from 'express';
const router = express.Router();
import {
    User
} from '../models/user';
import {
    resError
} from '../helper/http_handler.helper';
import UserController from '../controllers/UserController';

const UserLoginController = new UserController(User);

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);
    UserLoginController.loginUser(req, res);
});

function validate(req) {
    const schema = {
        phoneNumber: Joi.string().max(10),
        email: Joi.string().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;