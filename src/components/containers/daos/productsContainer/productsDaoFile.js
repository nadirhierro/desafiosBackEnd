import fileContainer from "../../fileContainer.js";

// Instancia empieza en null
let instance = null;

// Clase productsFile extensión de fileContainer
export default class productsDaoFile extends fileContainer {
  constructor() {
    super();
    this.fileName = "./src/data/products.json"; // Defino el archivo
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new productsDaoFile();
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
  async save(obj) {
    try {
      if (this.validate(obj)) {
        let data = await this.getAll();
        let id = 1;
        if (data.length > 0) {
          let ids = data.map((item) => item.id);
          id = Math.max.apply(null, ids) + 1;
        }
        let newObject = {
          _id: id,
          timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
          ...obj,
        };
        data.push(newObject);
        await this.write(data);
        return id;
      } else {
        return { error: "Objeto inválido" };
      }
    } catch (err) {
      return err;
    }
  }

  // Cambiar un producto a través de la validación
  async change(obj) {
    try {
      if (this.validate(obj)) {
        let data = await this.getAll();
        let objInData = data.find((item) => item._id == obj.id);
        if (objInData) {
          let newObject = {
            timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
            ...obj,
          };
          data.splice(data.indexOf(objInData), 1, newObject);
          await this.write(data);
          return true;
        } else {
          return false;
        }
      } else {
        return { error: "Objeto inválido" };
      }
    } catch (err) {
      return err;
    }
  }
}
