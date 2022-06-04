import memoryContainer from "../../memoryContainer.js";

let instance = null;

export default class productsDaoMemory extends memoryContainer {
  constructor() {
    super();
  }

  static getInstance() {
    if (!instance) {
      instance = new productsDaoMemory();
    }
    return instance;
  }

  validate(product) {
    if (product.title && product.price && product.thumbnail) {
      return true;
    } else {
      return false;
    }
  }

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
