class User {
  constructor(name, lastName, books, pets) {
    this.name = name;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
  }
  getFullName() {
    return `The user name is ${this.name} ${this.lastName}`;
  }
  addPet(petName) {
    this.pets.push(petName);
  }
  countPets() {
    if (this.pets.length == 0) {
      return `${this.name} does not have any pet`;
    } else {
      return `${this.name} ${
        this.pets.length > 1
          ? `has ${this.pets.length} pets`
          : `have ${this.pets.length} pet`
      }`;
    }
  }
  addBook(bookName, author) {
    this.books.push({ name: bookName, author: author });
  }
  getBookNames() {
    let bookNames = this.books.map((book) => book.name);
    return bookNames.join(" - ");
  }
}

let nadir = new User(
  `Nadir`,
  `Hierro`,
  [
    { name: `El señor de las moscas`, author: `William Golding` },
    { name: "Fundacion", author: "Isaac Asimov" },
  ],
  [`Sara`]
);

console.log(nadir.getFullName());
console.log(nadir.countPets());
nadir.addPet(`Luna`);
console.log(nadir.countPets());
console.log(nadir.getBookNames());
nadir.addBook(`En contra del método`, `Paul Feyerabend`);
console.log(nadir.getBookNames());
