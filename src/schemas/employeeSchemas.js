import joiBase from "joi"
import joiDate from "@joi/date"

const joi = joiBase.extend(joiDate)

export const employeeInsertSchema = joi.object({
  fullName: joi.string().required(),
  birthDate: joi.date().format('DD/MM/YYYY').required(),
  position: joi.string().required().messages({
    'string.base': `Posição deve ser um texto`,
    'any.required': `Posição é um campo obrigatório`
  }),
  grossSalary: joi.number().required()
});

export const employeeUpdateSchema = joi.object({
  fullName: joi.string(),
  birthDate: joi.date(),
  position: joi.string(),
  grossSalary: joi.number(),
});
