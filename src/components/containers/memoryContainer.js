import moment from "moment";

// Clase memoryContainer
export default class memoryContainer {
  constructor() {
    this.container = [];
  }

  // Obtener container
  getAll() {
    return this.container;
  }

  // Guardar un elemento
  save(obj) {
    let id = 1;
    if (this.container.length > 0) {
      let ids = this.container.map((item) => item._id);
      id = Math.max.apply(null, ids) + 1;
    }
    let newObject = {
      _id: id,
      timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      ...obj,
    };
    this.container.push(newObject);
    return newObject;
  }

  // Cambiar un elemento
  change(obj) {
    let objInContainer = this.container.find(
      (element) => element._id == obj.id
    );
    if (objInContainer) {
      let newObject = {
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      this.container.splice(
        this.container.indexOf(objInContainer),
        1,
        newObject
      );
      return newObject;
    } else {
      return false;
    }
  }

  // Obtener un elemento por id
  getById(id) {
    let element = this.container.find((obj) => obj._id == id);
    return element;
  }

  // Eliminar un elemento por id
  deleteById(id) {
    let obj = this.getById(id);
    if (obj) {
      this.container.splice(this.container.indexOf(obj), 1);
      return id;
    } else {
      return false;
    }
  }

  // Vaciar container
  deleteAll() {
    this.container = [];
    return this.container;
  }
}
