import {
    validate
} from '../models/customer';
import 'babel-polyfill';
import express from 'express';
const router = express.Router();
import customerControl from '../controllers/CustomerController';
import {
    Customer
} from '../models/customer';

const CustomerControlClass = new customerControl(Customer);
console.log(CustomerControlClass);

router.get('/', async (req, res) => await CustomerControlClass.getAll(req, res));

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const phone = await Customer.findOne({
        phone: req.body.phone
    });
    const email = await Customer.findOne({
        email: req.body.email
    });
    if (phone) return res.status(400).send("Customer with given phone number is already registered..");

    if (email) return res.status(400).send("Customer with giveb email address is already registered..");

    await CustomerControlClass.create(req, res);
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    await CustomerControlClass.update(req, res);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    await CustomerControlClass.remove(req, res);
});

router.get('/:id', async (req, res) => {
    await CustomerControlClass.getOne(req, res);
});

module.exports = router;