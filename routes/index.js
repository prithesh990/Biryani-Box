import express from 'express';
const app = express();
import customers from './customers';
import users from './users';
import login from './login';
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));

export default app;