import memoryContainer from "../../memoryContainer.js";

let instance = null;

export default class messagesDaoMemory extends memoryContainer {
  constructor() {
    super();
    this.container = { id: "messages", messages: [] };
  }

  static getInstance() {
    if (!instance) {
      instance = new messagesDaoMemory();
    }
    return instance;
  }

  save(obj) {
    let object = this.getAll();
    let data = object.messages;
    let id = 1;
    if (data.length > 0) {
      let ids = data.map((item) => item.id);
      id = Math.max.apply(null, ids) + 1;
    }
    let newObject = {
      id: id,
      timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      ...obj,
    };
    this.container.messages.push(newObject);
    return id;
  }
}
