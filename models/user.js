import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from 'config';

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
    }
});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, config.get('jwtPrivateKey'));
    return token;
}
export const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        phoneNumber: Joi.number().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.userSchema = userSchema;