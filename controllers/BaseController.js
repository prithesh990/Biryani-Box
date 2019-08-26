import 'babel-polyfill';
import httpStatus from 'http-status';
import {
   resSuccess
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
      console.log("yes", req)

      await this.Model.find()
         .then(rows => resSuccess(res, rows))
         .catch(e => next(e));
   }

   async getOne(req, res, next) {
      try {
         const objData = await this.Model.getOne(req.params.id);
         if (objData) {
            return resSuccess(res, objData);
         }
         const err = new APIError('No such object exists!', httpStatus.NOT_FOUND);
         return next(err);
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
      this.Model.update(req.params.id, req.body)
         .then(objData => resSuccess(res, objData))
         .catch(e => next(e));
   }

   async remove(req, res, next) {
      this.Model.remove(req.params.id)
         .then(objData => resSuccess(res, objData))
         .catch(e => next(e));
   }
}