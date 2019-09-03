import {
    Delivery_user,
    validate
} from '../models/delivery_boy_model';
import auth from '../middleware/auth';
import express from 'express';
const router = express.Router();
import {
    resError
} from '../helper/http_handler.helper';

import BaseController from '../controllers/BaseController';
const DeliveryBoyClass = new BaseController(Delivery_user);

router.get('/', auth, async (req, res) => await DeliveryBoyClass.getAll(req, res));

router.post('/', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let phone = await Delivery_user.findOne({
        phoneNumber: req.body.phoneNumber
    });

    if (phone) return resError(res, 'Phone Number already exists');

    await DeliveryBoyClass.create(req, res);

});
router.put('/:id', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);
    const delivery_boy = await Delivery_user.findById(req.params.id);

    if (!delivery_boy) return resError(res, 'The Delivery Boy with the given ID was not found.');

    await DeliveryBoyClass.update(req, res);
});

router.delete('/:id', auth, async (req, res) => {
    const delivery_boy = await Delivery_user.findById(req.params.id);

    if (!delivery_boy) return resError(res, 'The Delivery Boy with the given ID was not found.');
    await DeliveryBoyClass.remove(req, res);
});

router.get('/:id', async (req, res) => {
    const delivery_boy = await Delivery_user.findById(req.params.id);
    console.log(delivery_boy);

    if (!delivery_boy) return resError(res, 'The Delivery Boy with the given ID was not found.');

    await DeliveryBoyClass.getOne(req, res);
});


module.exports = router;