import Joi from "joi";

let title = Joi.string().required();
let price = Joi.number().required();
let thumbnail = Joi.string().required();

let productSchema = {
  title,
  price,
  thumbnail,
};

export default productSchema;
