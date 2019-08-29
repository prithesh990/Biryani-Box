import Joi from 'joi';
import mongoose from 'mongoose';
import {
    menuSchema
} from './menu.model';
import {
    customerSchema
} from './customer';
import {
    orderSchema
} from './order';
import {
    addonSchema
} from './addons.model';
import {
    Delivery_user_Schema
} from './delivery_boy_model';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    phoneNumber: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 1024
    },
    menu: {
        type: menuSchema
    },
    customer: {
        type: customerSchema
    },
    order: {
        type: orderSchema
    },
    addon: {
        type: addonSchema
    },
    delivery_boy: {
        type: Delivery_user_Schema
    }

});
export const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        phoneNumber: Joi.number().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(255).required(),
        menuId: Joi.objectId().required(),
        customerId: Joi.objectId().required(),
        orderId: Joi.objectId().required(),
        addonId: Joi.objectId().required(),
        delivery_boy_id: Joi.objectId().required()
    };

    return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.userSchema = userSchema;