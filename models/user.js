import Joi from 'joi';
import mongoose from 'mongoose';

export const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true,
        maxlength: 10
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 1024,
        required: true
    }

}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        phoneNumber: Joi.string().max(10).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.validate = validateUser;