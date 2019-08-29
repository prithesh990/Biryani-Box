import 'babel-polyfill';
import CustomerController from './CustomerController';
import bcrypt from 'bcrypt';
import {
    resSuccess,
    resError
} from '../helper/http_handler.helper';
import {
    menu
} from '../models/menu.model';
import {
    Customer
} from '../models/customer';
import {
    Order
} from '../models/order';
import {
    Addon
} from '../models/addons.model';
import {
    Delivery_user
} from '../models/delivery_boy_model';


export default class UserController extends CustomerController {
    async createUser(req, res, next) {

        const menus = await menu.findById(req.body.menuId);
        if (!menus) return resError(res, "Invalid Menu Id");

        const customers = await Customer.findById(req.body.customerId);
        if (!customers) return resError(res, "Invalid Customer Id");


        const orders = await Order.findById(req.body.orderId);
        if (!orders) return resError(res, "Invalid Order Id");

        const addons = await Addon.findById(req.body.addonId);
        if (!addons) return resError(res, "Invalid Addon Id");

        const delivery_boys = await Delivery_user.findById(req.body.delivery_boy_id);
        if (!delivery_boys) return resError(res, "Invalid Delivery Boy Id");

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const User = new this.Model({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
            menu: {
                _id: menus._id,
                name: menus.name,
                price: menus.price
            },
            customer: {
                _id: customers._id,
                name: customers.name,
                phone: customers.phone,
                // address:customers.address
                email: customers.email
            },
            order: {
                _id: orders._id,
                price: orders.price,
                quantity: orders.quantity,
                paymentStatus: orders.paymentStatus,
                deliveryAddress: orders.deliveryAddress,
                orderTime: orders.orderTime,
                customer: orders.customer,
                menu: orders.menu,
                addon: orders.addon
            },
            addon: {
                _id: addons._id,
                name: addons.name,
                price: addons.price,
                quantity: addons.quantity
            },
            delivery_boy: {
                _id: delivery_boys._id,
                name: delivery_boys.name,
                phoneNumber: delivery_boys.phoneNumber,
                delivery_boy_address: delivery_boys.delivery_boy_address
            }
        });
        await User.save()
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