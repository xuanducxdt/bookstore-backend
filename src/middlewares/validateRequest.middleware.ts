/* eslint-disable linebreak-style */
/* eslint-disable no-fallthrough */
import Joi from 'joi';
import { isEmptyObject } from '../utils';

export default function validateRequest({
  querySchema = {},
  paramSchema = {},
  bodySchema = {},
  fileSchema = {},
}) {
  return async (req: any, res: any, next: any) => {
    try {
      switch (true) {
        case !isEmptyObject(querySchema): {
          await Joi.object(querySchema).validateAsync(req.query);
        }
        case !isEmptyObject(paramSchema): {
          await Joi.object(paramSchema).validateAsync(req.params);
        }
        case !isEmptyObject(bodySchema): {
          await Joi.object(bodySchema).validateAsync(req.body);
        }
        case !isEmptyObject(fileSchema): {
          const fieldName = req.file && req.file.fieldname;
          const fileData = fieldName ? { filename: fieldName } : {};
          await Joi.object(fileSchema).validateAsync(fileData);
        }
        default: {
          break;
        }
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
