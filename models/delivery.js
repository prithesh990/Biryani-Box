import Joi from 'joi';
import mongoose from 'mongoose';
import {
    Delivery_user_Schema
} from './delivery_boy_model';
import {
    orderSchema
} from './order';

const deliverySchema = new mongoose.Schema({
    delivery_status: {
        type: Boolean
    },
    delivery_boy: {
        type: Delivery_user_Schema
    },
    order: {
        type: orderSchema
    }
});
export const Delivery = mongoose.model('Delivery', deliverySchema);

function validateUser(user) {
    const schema = {
        delivery_status: Joi.boolean().required(),
        delivery_boy_ID: Joi.objectId().required(),
        orderId: Joi.objectId().required()
    };
    return Joi.validate(user, schema);
}

exports.deliverySchema = deliverySchema;
exports.validate = validateUser;