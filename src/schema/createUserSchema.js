import Joi from "joi";
export const createUserSchema = Joi.object({
  name: Joi.string().required().label("Name").trim(),
  address: Joi.string().required().label("Address").trim(),
});
