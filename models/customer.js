import mongoose from 'mongoose';
import Joi from 'joi';

export const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
});

export const Customer = mongoose.model('Customers', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(10).required(),
        email: Joi.string().min(5).max(255).required().email()
    };

    return Joi.validate(customer, schema);
}
exports.validate = validateCustomer;