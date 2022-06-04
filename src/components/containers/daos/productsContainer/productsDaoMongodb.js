import mongodbContainer from "../../mongodbContainer.js";
import { productModel } from "../../../../models/index.js";

let instance = null;

export default class productsDaoMongodb extends mongodbContainer {
  constructor() {
    super();
    this.model = productModel;
  }

  static getInstance() {
    if (!instance) {
      instance = new productsDaoMongodb();
    }
    return instance;
  }
}
