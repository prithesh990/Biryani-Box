import {
    menu,
    validate
} from '../models/menu.model';
import auth from '../middleware/auth';
import express from 'express';
const router = express.Router();
import BaseController from '../controllers/BaseController';
import {
    resError
} from '../helper/http_handler.helper';
const MenuControllerClass = new BaseController(menu);
router.post('/', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return resError(res, error.details[0].message);
    await MenuControllerClass.create(req, res);

});

router.get('/', async (req, res) => await MenuControllerClass.getAll(req, res));


router.put('/:id', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    const menu_id = await menu.findById(req.params.id);

    if (!menu_id) return resError(res, 'The Item with the given ID was not found.');
    if (error) return resError(res, error.details[0].message);
    MenuControllerClass.update(req, res);
});

router.delete('/:id', auth, async (req, res) => {
    const menu_id = await menu.findById(req.params.id);

    if (!menu_id) return resError(res, 'The Item with the given ID was not found.');
    MenuControllerClass.remove(req, res);
});

router.get('/:id', async (req, res) => {
    const menu_id = await menu.findById(req.params.id);

    if (!menu_id) return resError(res, 'The Item with the given ID was not found.');

    await MenuControllerClass.getOne(req, res);
});

module.exports = router;