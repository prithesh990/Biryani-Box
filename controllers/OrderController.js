import 'babel-polyfill';
import CustomerController from './CustomerController';
import {
    resSuccess,
    resError
} from '../helper/http_handler.helper';
import {
    Customer
} from '../models/customer';
import {
    menu
} from '../models/menu.model';
import {
    Addon
} from '../models/addons.model';


export default class OrderController extends CustomerController {

    async createOrder(req, res, next) {
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return resError(res, 'Invalid CustomerId.');
        const menus = await menu.findById(req.body.menuId);
        if (!menus) return resError(res, "Invalid Menu Id");
        const addons = await Addon.findById(req.body.addonId);
        if (!addons) return resError(res, "Invalid Menu Id");

        const Order = new this.Model({
            price: req.body.price,
            quantity: req.body.quantity,
            addOnQuantity: req.body.addOnQuantity,
            delieveryAddress: req.body.delieveryAddress,
            paymentStatus: req.body.paymentStatus,
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                email: customer.email
            },
            menu: {
                _id: menus._id,
                name: menus.name,
                price: menus.price
            },
            addon: {
                _id: addons._id,
                name: addons.name,
                price: addons.price
            }
        });
        await Order.save()
            .then(savedObject => resSuccess(res, savedObject))
            .catch(e => console.log(e.message));


    }
}