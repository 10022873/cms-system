const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('DataPrincipal', 'DataFiduciary', 'Admin').required()
});

const consentSchema = Joi.object({
  purpose: Joi.string().max(200).required(),
  dataTypes: Joi.array().items(
    Joi.string().valid('PII', 'Health', 'Financial', 'Behavioral')
  ).min(1).required(),
  expiryDate: Joi.date().greater('now')
});

module.exports = { registerSchema, consentSchema };