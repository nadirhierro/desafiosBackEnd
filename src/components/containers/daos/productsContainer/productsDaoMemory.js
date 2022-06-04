import memoryContainer from "../../memoryContainer.js";

// Instancia empieza en null
let instance = null;

// Clase productsMemory extensión del memoryContainer
export default class productsDaoMemory extends memoryContainer {
  constructor() {
    super();
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new productsDaoMemory();
    }
    return instance;
  }

  // Valdiación de la data
  validate(product) {
    if (product.title && product.price && product.thumbnail) {
      return true;
    } else {
      return false;
    }
  }

  // Guardar un producto a través de la validación
  save(obj) {
    if (this.validate(obj)) {
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
      return id;
    } else {
      return { error: "Objeto inválido" };
    }
  }

  // Cambiar un producto a través de la validación
  change(obj) {
    if (this.validate(obj)) {
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
        return true;
      } else {
        return false;
      }
    } else {
      return { error: "Objeto inválido" };
    }
  }
}
