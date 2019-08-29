import Joi from 'joi';
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        minlength: 1,
        maxlength: 255
    },
    price: {
        type: Number
        // maxlength: 10
        // required: true,
    },
    description: {
        type: String,
        // required: true,
        trim: true,
        maxlength: 500
    }
});

export const menu = mongoose.model('menu', menuSchema);

function validateMenu(user) {
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        price: Joi.number().required(),
        description: Joi.string().max(500)
    };
    return Joi.validate(user, schema);
}

exports.menuSchema = menuSchema;
exports.validate = validateMenu;