import Joi from 'joi';
import mongoose from 'mongoose';

const addonSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 255
    },
    price: {
        type: Number
    }
});

export const Addon = mongoose.model('addon', addonSchema);

function validateAddons(user) {
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        price: Joi.number().required()
    };
    return Joi.validate(user, schema);
}

exports.addonSchema = addonSchema;
exports.validate = validateAddons;