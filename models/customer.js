import mongoose from 'mongoose';
import Joi from 'joi';

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: Number,
        // unique: true,
        // sparse: true,
        // required: true
    },
    email: {
        type: String,
        // unique: true,
        // sparse: true,
        // required: true,
        minlength: 5,
        maxlength: 255
    },
    // address:{
    //     type:String,
    //     minlength: 5,
    //     maxlength: 255

    // }
});

export const Customer = mongoose.model('Customers', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.number().min(10).max(10).required(),
        email: Joi.string().min(5).max(255).required().email(),
        // address: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(customer, schema);
}
exports.customerSchema = customerSchema;
exports.validate = validateCustomer;