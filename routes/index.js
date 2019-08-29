import express from 'express';
const app = express();
import customers from './customers';
import users from './users';
import login from './login';
import order from './orders';
import delivery_users from './delivery_boy_routes';
import delivery_routes from './delivery_routes';
import menu from './menu.routes';
import addons from './addons.routes';
import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
import 'babel-polyfill';
import {
    resSuccess
} from '../helper/http_handler.helper';
require('../models/connections/mongodb.connection')();

app.get('/', (req, res) =>
    resSuccess(res, {
        info: 'API Server',
        status: 'OK',
    })
);


app.use(express.json());

app.use('/api/customer', customers);
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/orders', order);
app.use('/api/delivery_users', delivery_users);
app.use('/api/delivery_routes', delivery_routes);
app.use('/api/menu', menu);
app.use('/api/addons', addons);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));

export default app;