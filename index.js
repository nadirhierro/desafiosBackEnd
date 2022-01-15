import Container from "./container.js";

// productos sueltos y container de productos
const product1 = {
  title: "Lapicera",
  price: 12.3,
  thumbnail: "https://www.unsitio.com",
};
const product2 = {
  title: "Lápiz",
  price: 5.5,
  thumbnail: "https://www.unsitio.com",
};
const product3 = {
  title: "Cuaderno",
  price: 12.45,
  thumbnail: "https://www.unsitio.com",
};

const products = new Container(`./products.txt`);

// llamado de prueba para crear el txt con array vacío

// products.write(JSON.stringify([], null, 2));

// llamado de prueba para agregar objeto

// products.save(product1);

// llamado para getById

// products.getById(5);

// llamado para getAll

// products.getAll();

// llamado para deleteById

// products.deleteById(2);

// llamado para deleteAll

// products.deleteAll();
