export default class Messages {
  constructor(author, message) {
    this.author = author;
    this.message = message;
  }
  // Valdiación de la data
  static validate(message) {
    const messageSchema = Joi.object({
      author: Joi.object({
        email: Joi.string().email().required(),
        alias: Joi.string().required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        age: Joi.number().required(),
        avatar: Joi.string().required(),
      }),
      message: Joi.string().required(),
    });
    const { error } = NoticiaSchema.validate(message);
    if (error) {
      throw error;
    }
  }
}
