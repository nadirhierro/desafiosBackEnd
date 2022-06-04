// Clase author
class author {
  constructor(email, alias, name, surname, age, avatar) {
    this.email = email;
    this.alias = alias;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.avatar = avatar;
  }
}

// Clase messageSchema, que incluye a la clase author
class messageSchema {
  constructor(
    id,
    timestamp,
    authorEmail,
    authorAlias,
    authorName,
    authorSurname,
    authorAge,
    authorAvatar,
    message
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.author = new author(
      authorEmail,
      authorAlias,
      authorName,
      authorSurname,
      authorAge,
      authorAvatar
    );
    this.message = message;
  }
}

// Clase messageDto, que tiene la estructura {id: "messages", messages:{},{}...,{}} e incorpora la clase messageSchema
export default class messagesDto {
  constructor(messages) {
    (this.id = "messages"),
      (this.messages = messages.map((message) => {
        return new messageSchema(
          message.id,
          message.timestamp,
          message.author.email,
          message.author.alias,
          message.author.name,
          message.author.surname,
          message.author.age,
          message.author.avatar,
          message.message
        );
      }));
  }
}
