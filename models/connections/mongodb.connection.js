import mongoose from 'mongoose';
import 'babel-polyfill';

module.exports = function () {
        mongoose.connect('mongodb://localhost/Biryani_box', {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Could not connect to MongoDB'));
}