import {
    Order,
} from '../models/order';
import {
    validate
} from '../models/order';
import express from 'express';
const router = express.Router();
import {
    Customer
} from "../models/customer";
import {
    resError
} from '../helper/http_handler.helper';

import OrderController from '../controllers/OrderController';

const OrderControllerClass = new OrderController(Order);

router.get('/', async (req, res) => await OrderControllerClass.getAll(req, res));

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);
    await OrderControllerClass.createOrder(req, res);
});
router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);
    const order = await Order.findById(req.params.id);

    if (!order) return resError(res, 'The order with the given ID was not found.');

    await OrderControllerClass.update(req, res);
});
router.delete('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) return resError(res, 'The order with the given ID was not found.');
    await OrderControllerClass.remove(req, res);
});

router.get('/:id', async (req, res) => await OrderControllerClass.getOne(req, res));


module.exports = router;