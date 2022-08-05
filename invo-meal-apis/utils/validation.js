const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  phone: Joi.number().required(),
  designationId: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  repeatPassword: Joi.ref("password"),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.weeklyMenuSchema = Joi.object({
  title: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  menuImage: Joi.string().required(),
});

exports.subscribeSchema = Joi.object({
  planId: Joi.number().required(),
});

exports.paymentProofSchema = Joi.object({
  invoiceId: Joi.number().required(),
  proofImage: Joi.string().required(),
});

exports.verifyInvoiceSchema = Joi.object({
  invoiceId: Joi.number().required(),
  statusCode: Joi.number().valid(1, 2, 3, 4),
});

exports.cancelMealSchema = Joi.object({
  reason: Joi.optional(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});
