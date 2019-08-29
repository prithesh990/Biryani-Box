import mongoose from 'mongoose';
import Joi from 'joi';
import {
    customerSchema
} from './customer';
import {
    menuSchema
} from './menu.model';
import {
    addonSchema
} from './addons.model';

const orderSchema = new mongoose.Schema({
    price: {
        type: Number,
        min: 10
    },
    quantity: {
        type: Number,
        min: 1
    },
    delieveryAddress: {
        type: String,
        minlength: 5

    },
    paymentStatus: {
        type: Boolean
    },
    orderTime: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: customerSchema
    },
    menu: {
        type: menuSchema
    },
    addon: {
        type: addonSchema
    }
    // offer:{

    // }

});

export const Order = mongoose.model('Orders', orderSchema);

function validateOrder(order) {
    const schema = {
        price: Joi.number().min(10).required(),
        quantity: Joi.number().min(1).required(),
        delieveryAddress: Joi.string().min(5).max(500).required(),
        paymentStatus: Joi.boolean().required(),
        customerId: Joi.objectId().required(),
        menuId: Joi.objectId().required(),
        addonId: Joi.objectId().required()
    };

    return Joi.validate(order, schema);
}
exports.validate = validateOrder;
exports.orderSchema = orderSchema;