import {
    Addon,
    validate
} from '../models/addons.model';
import express from 'express';
const router = express.Router();
import BaseController from '../controllers/BaseController';
import {
    resError
} from '../helper/http_handler.helper';
const AddonControllerClass = new BaseController(Addon);

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);
    await AddonControllerClass.create(req, res);
});

router.get('/', async (req, res) => {
    await AddonControllerClass.getAll(req, res);
});

router.get('/:id', async (req, res) => {
    const addons = await Addon.findById(req.params.id);
    if (!addons) return resError(res, 'The Addon with the given ID was not found.');
    await AddonControllerClass.getOne(req, res);
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);
    await AddonControllerClass.update(req, res);
});

router.delete('/:id', async (req, res) => {
    const addons = await Addon.findById(req.params.id);
    if (!addons) return resError(res, 'The Addon with the given ID was not found.');
    await AddonControllerClass.remove(req, res);
});

module.exports = router;