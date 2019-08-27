import {
    User
} from '../models/user';
import {
    validate
} from '../models/user';
import express from 'express';
const router = express.Router();

import UserController from '../controllers/UserController';

const AdminControllerClass = new UserController(User);

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let phone = await User.findOne({
        phoneNumber: req.body.phoneNumber
    });
    let email = await User.findOne({
        email: req.body.email
    });
    if (phone) return res.status(400).send('Phone Number already exists');

    if (email) return res.status(400).send('Email address already exist')

    await AdminControllerClass.createUser(req, res);
});

module.exports = router;