import mongodbContainer from "../../mongodbContainer.js";
import { messageModel } from "../../../../models/index.js";
import moment from "moment";

let instance = null;

export default class messagesDaoMongodb extends mongodbContainer {
  constructor() {
    super();
    this.model = messageModel;
  }

  static getInstance() {
    if (!instance) {
      instance = new messagesDaoMongodb();
    }
    return instance;
  }

  async save(obj) {
    try {
      let newObj = {
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      let objModel = new this.model(obj);
      let saveObj = await objModel.save();
      return saveObj;
    } catch (err) {
      console.log(err);
    }
  }
}
