class author {
  constructor(email, name, surname, age, alias, avatar) {
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.alias = alias;
    this.avatar = avatar;
  }
}

export default class message {
  constructor(
    id,
    timestamp,
    authorId,
    authorName,
    authorSurname,
    authorAge,
    authorAlias,
    authorAvatar,
    message
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.author = new author(
      authorId,
      authorName,
      authorSurname,
      authorAge,
      authorAlias,
      authorAvatar
    );
    this.message = message;
  }
}
