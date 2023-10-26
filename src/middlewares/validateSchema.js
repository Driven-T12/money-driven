import { incompleteDataError } from "../errors/errors.js";

export function validateSchema(schema) {
  return (req, res, next) => {

    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map(det => det.message)
      throw incompleteDataError(errors)
    }

    next();
  }
}