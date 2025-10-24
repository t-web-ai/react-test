import Joi from "joi";
export const createItemSchema = Joi.object({
  username: Joi.string().required().label("Username"),
  quantity: Joi.number().min(1).required().label("Quantity"),
  price: Joi.number().min(1).required().label("Price"),
});
