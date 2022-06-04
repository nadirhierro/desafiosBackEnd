import mongodbContainer from "../../mongodbContainer.js";
import { productModel } from "../../../../models/index.js";

// Instancia empieza en null
let instance = null;

// Clase productsDaoMongodb extensión de mongodbContainer
export default class productsDaoMongodb extends mongodbContainer {
  constructor() {
    super();
    this.model = productModel; // defino el model de productos
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new productsDaoMongodb();
    }
    return instance;
  }
}
