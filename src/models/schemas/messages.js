import Joi from "joi";

let author = Joi.object({
  email: Joi.string().required(),
  alias: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  age: Joi.number().required(),
  avatar: Joi.string().required(),
});
let message = Joi.string().required();

let messageSchema = {
  author,
  message,
};

export default messageSchema;
