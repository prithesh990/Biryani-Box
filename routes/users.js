import {
    User
} from '../models/user';
import {
    validate
} from '../models/user';
import express from 'express';
const router = express.Router();

import UserController from '../controllers/UserController';
import {
    resError
} from '../helper/http_handler.helper';

const AdminControllerClass = new UserController(User);

router.get('/', auth, async (req, res) => await AdminControllerClass.getAll(req, res));

router.post('/', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);

    let phone = await User.findOne({
        phoneNumber: req.body.phoneNumber
    });
    let email = await User.findOne({
        email: req.body.email
    });
    if (phone) return resError(res, 'Phone Number already exists');

    if (email) return resError(res, 'Email address already exist')

    await AdminControllerClass.createUser(req, res);
});

router.put('/:id', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);
    const user = await User.findById(req.params.id);

    if (!user) return resError(res, 'The User with the given ID was not found.');

    await AdminControllerClass.update(req, res);
});
router.delete('/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return resError(res, 'The User with the given ID was not found.');
    await AdminControllerClass.remove(req, res);
});
router.get('/:id', auth, async (req, res) => await AdminControllerClass.getOne(req, res));

module.exports = router;