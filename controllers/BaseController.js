import 'babel-polyfill';
import httpStatus from 'http-status';
import {
   resSuccess,
   resError
} from '../helper/http_handler.helper.js';

export default class BaseController {
   constructor(model) {
      this.Model = model;
      this.getAll = this.getAll.bind(this);
      this.getOne = this.getOne.bind(this);
      this.create = this.create.bind(this);
      this.update = this.update.bind(this);
      this.remove = this.remove.bind(this);
   }

   async getAll(req, res, next) {

      await this.Model.find()
         .then(rows => resSuccess(res, rows))
         .catch(e => next(e));
   }

   async getOne(req, res, next) {
      try {
         const objData = await this.Model.findById(req.params.id);
         if (objData) {
            return resSuccess(res, objData);
         } else {
            const error = `the given id was not found`;
            return resError(res, error);
         }
      } catch (e) {
         return next(e);
      }
   }

   async create(req, res, next) {
      const Customer = new this.Model(req.body);
      await Customer.save()
         .then(savedObject => resSuccess(res, savedObject))
         .catch(e => next(e));
   }

   async update(req, res, next) {
      this.Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true
         })
         .then(objData => resSuccess(res, objData))
         .catch(e => next(e));
   }

   async remove(req, res, next) {
      this.Model.findByIdAndRemove(req.params.id)
         .then(objData => resSuccess(res, objData))
         .catch(e => next(e));
   }
}