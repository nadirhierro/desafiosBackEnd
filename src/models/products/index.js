import Joi from "joi";

export default class ProductsSchema {
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  static validate(product, required) {
    const productSchema = Joi.object({
      title: required ? Joi.string().required() : Joi.string(),
      price: required ? Joi.number().required() : Joi.number(),
      thumbnail: required ? Joi.string().required() : Joi.string(),
    });

    const { error } = productSchema.validate(product);

    if (error) {
      throw error;
    }
  }
}
