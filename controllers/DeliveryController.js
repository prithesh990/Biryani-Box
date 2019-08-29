import 'babel-polyfill';
import BaseController from './BaseController';
import {
    resSuccess,
    resError
} from '../helper/http_handler.helper';
import {
    Delivery_user
} from '../models/delivery_boy_model';
import {
    Delivery
} from '../models/delivery';
import {
    Order
} from '../models/order';

export default class DeliveryController extends BaseController {

    async createDelivery(req, res, next) {
        const delivery_boys = await Delivery_user.findById(req.body.delivery_boy_ID);
        if (!delivery_boys) return resError(res, "Delivery boy not exist");

        const orders = await Order.findById(req.body.orderId);
        if (!orders) return resError(res, "Invalid Order Id");

        const delivery = new Delivery({
            delivery_status: req.body.delivery_status,
            delivery_boy: {
                _id: delivery_boys._id,
                phoneNumber: delivery_boys.phoneNumber,
                name: delivery_boys.name
            },
            order: {
                _id: orders._id,
                price: orders.price,
                quantity: orders.quantity,
                delieveryAddress: orders.delieveryAddress,
                paymentStatus: orders.paymentStatus,
                orderTime: orders.orderTime
            }
        });
        await delivery.save()
            .then(savedObject => resSuccess(res, savedObject))
            .catch(e => console.log(e.message));
    }
}