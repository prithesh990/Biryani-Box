import Joi from 'joi';
import mongoose from 'mongoose';

const Delivery_user_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    phoneNumber: {
        type: Number,
        // unique: true,
        //  required: true,
        maxlength: 10
    },
    delivery_boy_address: {
        type: String,
        //required: true,
        trim: true,
        minlength: 10,
        maxlength: 500
    }
});

export const Delivery_user = mongoose.model('Delivery_users', Delivery_user_Schema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        phoneNumber: Joi.number().required(),
        delivery_boy_address: Joi.string().min(10).max(500).required()
    };
    return Joi.validate(user, schema);
}

exports.Delivery_user_Schema = Delivery_user_Schema;
exports.validate = validateUser;